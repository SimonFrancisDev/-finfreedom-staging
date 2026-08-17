// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/IFreedomPlusTokenController.sol";

interface IFreedomPlusUtilityToken {
    function mint(address to, uint256 amount, string calldata reason) external;
}

interface IFreedomPlusTokenGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomPlusTokenController is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    IFreedomPlusTokenController
{
    IFreedomPlusUtilityToken public fpt;
    IFreedomPlusUtilityToken public fptr;
    address public levelManager;
    address public guardian;

    mapping(address => mapping(uint8 => bool)) public firstActivationRewardMinted;
    mapping(bytes32 => bool) public recycleRewardMinted;
    mapping(address => uint256) public totalFPTMinted;
    mapping(address => uint256) public totalFPTrMinted;

    event LevelManagerUpdated(address indexed previousManager, address indexed newManager);
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);
    event FPTIssued(address indexed participant, uint8 indexed level, uint256 amount, bool genesis);
    event FPTrIssued(address indexed participant, uint8 indexed level, uint256 amount, bytes32 rewardId);

    error OnlyLevelManager();
    error InvalidAddress();
    error InvalidContract(address target);
    error InvalidAmount();
    error InvalidLevel(uint8 level);
    error FirstActivationRewardAlreadyMinted(address participant, uint8 level);
    error RecycleRewardAlreadyMinted(bytes32 rewardId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    modifier onlyLevelManager() {
        if (msg.sender != levelManager) revert OnlyLevelManager();
        _;
    }

    function initialize(
        address fpt_,
        address fptr_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(fpt_);
        _requireContract(fptr_);
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        fpt = IFreedomPlusUtilityToken(fpt_);
        fptr = IFreedomPlusUtilityToken(fptr_);
        guardian = guardian_;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusTokenGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function onFirstActivation(address participant, uint8 level, uint256 amount)
        external onlyLevelManager whenNotPaused nonReentrant
    {
        _issueFPT(participant, level, amount, false);
    }

    function onGenesisActivation(address participant, uint8 level, uint256 amount)
        external onlyLevelManager whenNotPaused nonReentrant
    {
        _issueFPT(participant, level, amount, true);
    }

    function onFundedRecycle(
        address participant,
        uint8 level,
        uint256 amount,
        bytes32 recycleActivationId
    )
        external onlyLevelManager whenNotPaused nonReentrant
    {
        _validate(participant, level, amount);
        if (recycleActivationId == bytes32(0)) revert InvalidAddress();
        if (recycleRewardMinted[recycleActivationId]) {
            revert RecycleRewardAlreadyMinted(recycleActivationId);
        }
        recycleRewardMinted[recycleActivationId] = true;
        totalFPTrMinted[participant] += amount;
        fptr.mint(participant, amount, "freedomPlusRecycle");
        emit FPTrIssued(participant, level, amount, recycleActivationId);
    }

    function setLevelManager(address manager_) external onlyOwner {
        _requireContract(manager_);
        address previous = levelManager;
        levelManager = manager_;
        emit LevelManagerUpdated(previous, manager_);
    }

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _issueFPT(address participant, uint8 level, uint256 amount, bool genesis) internal {
        _validate(participant, level, amount);
        if (firstActivationRewardMinted[participant][level]) {
            revert FirstActivationRewardAlreadyMinted(participant, level);
        }
        firstActivationRewardMinted[participant][level] = true;
        totalFPTMinted[participant] += amount;
        fpt.mint(participant, amount, genesis ? "freedomPlusGenesis" : "freedomPlusActivation");
        emit FPTIssued(participant, level, amount, genesis);
    }

    function _validate(address participant, uint8 level, uint256 amount) internal pure {
        if (participant == address(0)) revert InvalidAddress();
        if (level < 1 || level > 7) revert InvalidLevel(level);
        if (amount == 0) revert InvalidAmount();
    }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[43] private __gap;
}
