// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title AutoUpgradeEscrow
 * @dev Dedicated escrow that holds upgrade funds on behalf of users.
 *
 * KEY DESIGN RULES:
 * - Funds are tagged by (user, fromLevel, toLevel).
 * - Only LevelManager can lock or release funds.
 * - The contract is intentionally non-custodial for USDT:
 *   - No owner drain of USDT
 *   - No arbitrary admin withdrawal of USDT
 * - USDT can only leave through the approved release flows.
 */
interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

contract AutoUpgradeEscrow is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeERC20 for IERC20;

    error TokenAmountMismatch();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    IERC20 public usdt;
    address public levelManager;
    bool public levelManagerConfigured;
    address public guardian;

    mapping(address => mapping(uint8 => mapping(uint8 => uint256))) public lockedFunds;

    uint8 public constant MIN_LEVEL = 1;
    uint8 public constant MAX_LEVEL = 10;

    uint256 public totalEscrowLockedLifetime;
    uint256 public totalEscrowUsedForUpgrade;
    uint256 public totalEscrowReleasedToUsers;
    uint256 public currentEscrowLockedGlobal;

    event FundsLocked(address indexed user, uint8 fromLevel, uint8 toLevel, uint256 amount);
    event FundsReleased(address indexed user, uint8 fromLevel, uint8 toLevel, uint256 amount, string reason);

    event EscrowLocked(
        address indexed user,
        uint8 indexed fromLevel,
        uint8 indexed toLevel,
        uint256 amount,
        uint256 newLockedTotal,
        uint256 currentEscrowLockedGlobal
    );

    event EscrowUsedForUpgrade(
        address indexed user,
        uint8 indexed fromLevel,
        uint8 indexed toLevel,
        uint256 amount,
        address recipient,
        uint256 currentEscrowLockedGlobal
    );

    event EscrowReleasedToUser(
        address indexed user,
        uint8 indexed fromLevel,
        uint8 indexed toLevel,
        uint256 amount,
        uint256 currentEscrowLockedGlobal
    );

    event LevelManagerUpdated(address indexed oldManager, address indexed newManager);
    event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);

    modifier onlyLevelManager() {
        require(msg.sender == levelManager, "Only LevelManager");
        _;
    }

    function initialize(address _usdt, address _guardian) public initializer {
        require(_usdt != address(0), "Invalid USDT");
        require(_usdt.code.length > 0, "Invalid USDT");
        require(_guardian != address(0), "Invalid guardian");
        require(_guardian.code.length > 0, "Invalid guardian");

        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdt = IERC20(_usdt);
        guardian = _guardian;

        // temporary bootstrap value for deployment/setup
        levelManager = msg.sender;
        levelManagerConfigured = false;
    }

    function _validateUpgradePath(uint8 fromLevel, uint8 toLevel) internal pure {
        require(fromLevel >= MIN_LEVEL && fromLevel < MAX_LEVEL, "Invalid fromLevel");
        require(toLevel >= MIN_LEVEL && toLevel <= MAX_LEVEL, "Invalid toLevel");
        require(toLevel == fromLevel + 1, "Invalid upgrade path");
    }

    function _requireContract(address target, string memory message) internal view {
        require(target != address(0), message);
        require(target.code.length > 0, message);
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        _requireContract(newImplementation, "Invalid implementation");

        address currentGuardian = guardian;
        require(currentGuardian != address(0), "Guardian not set");

        require(
            IGuardian(currentGuardian).validateUpgrade(address(this), newImplementation),
            "Upgrade blocked"
        );
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setGuardian(address _guardian) external onlyOwner {
        _requireContract(_guardian, "Invalid guardian");

        address oldGuardian = guardian;
        guardian = _guardian;

        emit GuardianUpdated(oldGuardian, _guardian);
    }

    /**
     * @dev One-time configuration of the real LevelManager.
     */
    function setLevelManager(address _levelManager) external onlyOwner {
        _requireContract(_levelManager, "Invalid LevelManager");
        require(!levelManagerConfigured, "LevelManager already set");

        address oldManager = levelManager;
        levelManager = _levelManager;
        levelManagerConfigured = true;

        emit LevelManagerUpdated(oldManager, _levelManager);
    }

    function lockFunds(
        address user,
        uint8 fromLevel,
        uint8 toLevel,
        uint256 amount
    ) external onlyLevelManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");
        _validateUpgradePath(fromLevel, toLevel);

        uint256 balanceBefore = usdt.balanceOf(address(this));
        usdt.safeTransferFrom(levelManager, address(this), amount);
        uint256 receivedAmount = usdt.balanceOf(address(this)) - balanceBefore;
        if (receivedAmount != amount) revert TokenAmountMismatch();

        lockedFunds[user][fromLevel][toLevel] += amount;
        totalEscrowLockedLifetime += amount;
        currentEscrowLockedGlobal += amount;

        uint256 newLockedTotal = lockedFunds[user][fromLevel][toLevel];

        emit FundsLocked(user, fromLevel, toLevel, amount);

        emit EscrowLocked(
            user,
            fromLevel,
            toLevel,
            amount,
            newLockedTotal,
            currentEscrowLockedGlobal
        );
    }

    function releaseForUpgrade(
        address user,
        uint8 fromLevel,
        uint8 toLevel,
        address recipient
    ) external onlyLevelManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(recipient != address(0), "Invalid recipient");
        _validateUpgradePath(fromLevel, toLevel);

        uint256 amount = lockedFunds[user][fromLevel][toLevel];
        require(amount > 0, "No funds locked");

        lockedFunds[user][fromLevel][toLevel] = 0;
        totalEscrowUsedForUpgrade += amount;
        currentEscrowLockedGlobal -= amount;

        usdt.safeTransfer(recipient, amount);

        emit FundsReleased(user, fromLevel, toLevel, amount, "auto-upgrade");

        emit EscrowUsedForUpgrade(
            user,
            fromLevel,
            toLevel,
            amount,
            recipient,
            currentEscrowLockedGlobal
        );
    }

    function releaseAmountForUpgrade(
        address user,
        uint8 fromLevel,
        uint8 toLevel,
        address recipient,
        uint256 amount
    ) external onlyLevelManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");
        _validateUpgradePath(fromLevel, toLevel);

        uint256 lockedAmount = lockedFunds[user][fromLevel][toLevel];
        require(lockedAmount >= amount, "Insufficient locked funds");

        lockedFunds[user][fromLevel][toLevel] = lockedAmount - amount;
        totalEscrowUsedForUpgrade += amount;
        currentEscrowLockedGlobal -= amount;

        usdt.safeTransfer(recipient, amount);

        emit FundsReleased(user, fromLevel, toLevel, amount, "auto-upgrade-partial");

        emit EscrowUsedForUpgrade(
            user,
            fromLevel,
            toLevel,
            amount,
            recipient,
            currentEscrowLockedGlobal
        );
    }

    function releaseToUser(
        address user,
        uint8 fromLevel,
        uint8 toLevel
    ) external onlyLevelManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        _validateUpgradePath(fromLevel, toLevel);

        uint256 amount = lockedFunds[user][fromLevel][toLevel];
        require(amount > 0, "No funds locked");

        lockedFunds[user][fromLevel][toLevel] = 0;
        totalEscrowReleasedToUsers += amount;
        currentEscrowLockedGlobal -= amount;

        usdt.safeTransfer(user, amount);

        emit FundsReleased(user, fromLevel, toLevel, amount, "manual-override");

        emit EscrowReleasedToUser(
            user,
            fromLevel,
            toLevel,
            amount,
            currentEscrowLockedGlobal
        );
    }

    function getLockedAmount(
        address user,
        uint8 fromLevel,
        uint8 toLevel
    ) external view returns (uint256) {
        return lockedFunds[user][fromLevel][toLevel];
    }

    function getGlobalEscrowStats()
        external
        view
        returns (
            uint256 lockedLifetime,
            uint256 usedForUpgrade,
            uint256 releasedToUsers,
            uint256 currentlyLocked
        )
    {
        return (
            totalEscrowLockedLifetime,
            totalEscrowUsedForUpgrade,
            totalEscrowReleasedToUsers,
            currentEscrowLockedGlobal
        );
    }

    function recoverTokens(address token, uint256 amount) external onlyOwner whenNotPaused nonReentrant {
        require(token != address(usdt), "Cannot recover USDT - use release functions");
        IERC20(token).safeTransfer(owner(), amount);
    }

    uint256[46] private __gap;
}
