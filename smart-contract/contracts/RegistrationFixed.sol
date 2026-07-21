// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILevelManager {
    function activateLevel(address user, uint8 level) external;
    function markID1Downline(address user) external;
    function setID1Wallet(address _id1Wallet) external;
    function levelPrices(uint8 level) external pure returns (uint256);
    function founderRepresentative(address user) external view returns (bool);
    function founderRepLevelsActivated(address user) external view returns (uint8);
}

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

/**
 * @title RegistrationFixed
 * @notice Handles user registration, referrer assignment, manual level activation,
 *         and LevelManager-authorized auto-upgrade marking.
 *
 * @dev Upgradeable UUPS entry contract for the F-Freedom Program.
 *
 * Security model:
 * - Users register once and activate Level 1 through LevelManager.
 * - Level activation order is enforced: users cannot skip levels.
 * - Auto-upgrades can only be marked by the configured LevelManager.
 * - UUPS upgrades are owner-authorized and guardian-validated.
 * - The ID1 wallet is treated as a protocol/root wallet and is considered active on all levels.
 *
 * Important:
 * - This contract does not custody USDT directly.
 * - Payment transfer logic is delegated to LevelManager.
 * - Users approve USDT allowance to LevelManager, not to this registration contract.
 * - Level prices are sourced from LevelManager. The legacy storage array remains
 *   only for upgrade-safe storage layout compatibility.
 */
contract RegistrationFixed is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    uint8 private constant MIN_LEVEL = 1;
    uint8 private constant MAX_LEVEL = 10;
    uint8 private constant LEVEL_ONE = 1;
    uint8 private constant MAX_UPLINE_SEARCH_DEPTH = 64;

    IERC20 public usdt;
    ILevelManager public levelManager;

    address public id1Wallet;
    address public guardian;

    mapping(address => bool) public isRegistered;
    mapping(address => address) public referrerOf;
    mapping(address => mapping(uint8 => bool)) public levelActivated;
    mapping(address => bool) private _noReferrer;

    uint256 public registeredCount;

    event Registered(address indexed user, address indexed referrer);
    event LevelActivated(address indexed user, uint8 level, uint256 price);
    event AutoUpgradeTriggered(address indexed user, uint8 fromLevel, uint8 toLevel);
    event ID1WalletSet(address indexed id1Wallet);
    event LevelManagerSet(address indexed levelManager);
    event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);
    event CurrentMatrixParentRecorded(address indexed user, uint8 indexed level, address indexed parent);
    event MatrixParentMigrationFinalized();

    error MatrixParentMigrationClosed();
    error MatrixParentSeedLengthMismatch();
    error MatrixParentSeedConflict(address user, uint8 level, address existingParent, address requestedParent);
    error UplineSearchTooDeep(address startCandidate, uint8 level);

    uint256[] public levelPrices;
    mapping(address => mapping(uint8 => address)) public currentMatrixParentOf;

    function _validateLevel(uint8 level) internal pure {
        require(level >= MIN_LEVEL && level <= MAX_LEVEL, "Invalid level");
    }

    function _requireContract(address target, string memory message) internal view {
        require(target != address(0), message);
        require(target.code.length > 0, message);
    }

    function initialize(
        address _usdt,
        address _levelManager,
        address initialOwner,
        address _guardian
    ) public initializer {
        _requireContract(_usdt, "Invalid USDT");
        require(initialOwner != address(0), "Invalid owner");
        _requireContract(_guardian, "Invalid guardian");

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdt = IERC20(_usdt);
        guardian = _guardian;

        if (_levelManager != address(0)) {
            _requireContract(_levelManager, "Invalid LevelManager");
            levelManager = ILevelManager(_levelManager);
            emit LevelManagerSet(_levelManager);
        }

        levelPrices.push(10 * 10**6);
        levelPrices.push(20 * 10**6);
        levelPrices.push(40 * 10**6);
        levelPrices.push(80 * 10**6);
        levelPrices.push(160 * 10**6);
        levelPrices.push(320 * 10**6);
        levelPrices.push(640 * 10**6);
        levelPrices.push(1280 * 10**6);
        levelPrices.push(2560 * 10**6);
        levelPrices.push(5120 * 10**6);
    }

    /**
     * @dev UUPS upgrade authorization.
     *
     * Upgrade security:
     * - Only owner may request upgrade.
     * - New implementation must be a deployed contract.
     * - Guardian must approve the implementation for this proxy.
     */
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
     * @notice Registers the caller and activates Level 1 through LevelManager.
     *
     * @dev The caller must approve USDT to LevelManager before calling this function.
     *      Registration records the referrer and then delegates Level 1 activation/payment
     *      execution to LevelManager.
     *
     * Referrer rules:
     * - Referrer cannot be the caller.
     * - Referrer must already be registered or must be the configured ID1 wallet.
     * - A zero referrer is allowed and recorded through `_noReferrer`.
     */
    function register(address _referrer) external whenNotPaused nonReentrant {
        address user = msg.sender;
        ILevelManager manager = levelManager;
        address currentId1Wallet = id1Wallet;

        require(address(manager) != address(0), "LevelManager not set");
        require(currentId1Wallet != address(0), "ID1 wallet not set");
        require(!isRegistered[user], "Already registered");
        require(_referrer != user, "Self-referral not allowed");

        if (_referrer != address(0)) {
            require(
                isRegistered[_referrer] || _referrer == currentId1Wallet,
                "Referrer not registered or not ID1"
            );
            _noReferrer[user] = false;
        } else {
            _noReferrer[user] = true;
        }

        uint256 level1Price = _levelPrice(LEVEL_ONE);
        bool isFounderRepFreeActivation =
            manager.founderRepresentative(user) &&
            manager.founderRepLevelsActivated(user) < 10;

        if (!isFounderRepFreeActivation) {
            IERC20 paymentToken = usdt;

            require(
                paymentToken.balanceOf(user) >= level1Price,
                "Insufficient USDT balance for Level 1"
            );
            require(
                paymentToken.allowance(user, address(manager)) >= level1Price,
                "Insufficient USDT allowance for LevelManager"
            );
        }

        isRegistered[user] = true;
        referrerOf[user] = _referrer;

        unchecked {
            registeredCount += 1;
        }

        emit Registered(user, _referrer);

        manager.markID1Downline(user);
        manager.activateLevel(user, LEVEL_ONE);

        levelActivated[user][LEVEL_ONE] = true;

        emit LevelActivated(user, LEVEL_ONE, isFounderRepFreeActivation ? 0 : level1Price);
    }

    function setID1Wallet(address _id1Wallet) external onlyOwner {
        require(_id1Wallet != address(0), "Invalid address");
        require(id1Wallet == address(0) || id1Wallet == _id1Wallet, "ID1 wallet already set");

        id1Wallet = _id1Wallet;

        ILevelManager manager = levelManager;
        if (address(manager) != address(0)) {
            manager.setID1Wallet(_id1Wallet);
        }

        emit ID1WalletSet(_id1Wallet);
    }

    /**
     * @notice Activates a user-selected level after registration.
     *
     * @dev Enforces sequential activation. A user cannot activate Level N unless
     *      Level N-1 is already active. Payment execution is delegated to LevelManager.
     */
    function activateLevel(uint8 level) external whenNotPaused nonReentrant {
        _validateLevel(level);

        address user = msg.sender;
        ILevelManager manager = levelManager;

        require(address(manager) != address(0), "LevelManager not set");
        require(isRegistered[user], "Not registered");
        require(!levelActivated[user][level], "Level already activated");

        if (level > LEVEL_ONE) {
            require(levelActivated[user][level - 1], "Previous level not activated");
        }

        uint256 price = _levelPrice(level);

        manager.activateLevel(user, level);

        levelActivated[user][level] = true;

        emit LevelActivated(user, level, price);
    }

    /**
     * @notice Marks the next level as activated after an auto-upgrade.
     *
     * @dev Callable only by LevelManager. This function does not transfer funds;
     *      it only records activation state after LevelManager has executed the
     *      auto-upgrade rules.
     */
    function triggerAutoUpgrade(address user, uint8 fromLevel) external {
        require(msg.sender == address(levelManager), "Only LevelManager");
        require(user != address(0), "Invalid user");
        require(fromLevel >= MIN_LEVEL && fromLevel < MAX_LEVEL, "Invalid level");

        uint8 nextLevel;

        unchecked {
            nextLevel = fromLevel + 1;
        }

        if (!levelActivated[user][nextLevel]) {
            levelActivated[user][nextLevel] = true;

            emit LevelActivated(user, nextLevel, _levelPrice(nextLevel));
            emit AutoUpgradeTriggered(user, fromLevel, nextLevel);
        }
    }

    function hadNoReferrer(address user) external view returns (bool) {
        return _noReferrer[user];
    }

    function isLevelActivated(address user, uint8 level) external view returns (bool) {
        _validateLevel(level);

        if (user == id1Wallet) {
            return true;
        }

        return levelActivated[user][level];
    }

    function resolveEligibleRecipient(
        address candidate,
        uint8 level,
        address fallbackRecipient
    ) external view returns (address) {
        if (candidate == address(0)) return address(0);

        address current = candidate;
        for (uint8 depth = 0; depth < MAX_UPLINE_SEARCH_DEPTH; ++depth) {
            if (current == fallbackRecipient || levelActivated[current][level]) return current;
            current = referrerOf[current];
            if (current == address(0)) return fallbackRecipient;
        }

        revert UplineSearchTooDeep(candidate, level);
    }

    function getReferrer(address user) external view returns (address) {
        return referrerOf[user];
    }

    function highestActiveLevel(address user) external view returns (uint8) {
        if (user == id1Wallet) {
            return MAX_LEVEL;
        }

        uint8 level = MAX_LEVEL;

        while (level >= MIN_LEVEL) {
            if (levelActivated[user][level]) {
                return level;
            }

            if (level == MIN_LEVEL) {
                break;
            }

            unchecked {
                --level;
            }
        }

        return 0;
    }

    /**
     * @notice Retained only for ABI compatibility.
     * @dev Production level prices are immutable and sourced from LevelManager.
     */
    function updateLevelPrice(uint8, uint256) external view onlyOwner {
        revert("Level prices immutable");
    }

    /**
     * @notice Sets the LevelManager contract once.
     *
     * @dev This function is intentionally one-time only. Replacing LevelManager
     *      requires a contract upgrade, which is protected by owner + guardian validation.
     */
    function setLevelManager(address _levelManager) external onlyOwner {
        _requireContract(_levelManager, "Invalid LevelManager");
        require(address(levelManager) == address(0), "LevelManager already set");

        ILevelManager manager = ILevelManager(_levelManager);
        levelManager = manager;

        emit LevelManagerSet(_levelManager);

        address currentId1Wallet = id1Wallet;
        if (currentId1Wallet != address(0)) {
            manager.setID1Wallet(currentId1Wallet);
        }
    }

    function getLevelPrice(uint8 level) public view returns (uint256) {
        _validateLevel(level);
        return _levelPrice(level);
    }

    function _levelPrice(uint8 level) internal view returns (uint256) {
        _validateLevel(level);

        ILevelManager manager = levelManager;
        if (address(manager) != address(0)) {
            return manager.levelPrices(level);
        }

        return (10 * 10**6) << (level - 1);
    }

    function isParticipant(address user) external view returns (bool) {
        return isRegistered[user];
    }

    function totalParticipants() external view returns (uint256) {
        address currentId1Wallet = id1Wallet;
        uint256 count = registeredCount;

        if (currentId1Wallet != address(0) && !isRegistered[currentId1Wallet]) {
            unchecked {
                return count + 1;
            }
        }

        return count;
    }

    function recordCurrentMatrixParent(address user, uint8 level, address parent) external {
        bool managerWrite = msg.sender == address(levelManager);
        bool migrationWrite = msg.sender == owner() && !matrixParentMigrationFinalized;
        require(managerWrite || migrationWrite, "Unauthorized parent writer");
        require(user != address(0) && parent != address(0) && user != parent, "Invalid matrix parent");
        _validateLevel(level);
        currentMatrixParentOf[user][level] = parent;
        emit CurrentMatrixParentRecorded(user, level, parent);
    }

    function seedCurrentMatrixParents(
        address[] calldata users,
        uint8[] calldata levels,
        address[] calldata parents
    ) external onlyOwner {
        if (matrixParentMigrationFinalized) revert MatrixParentMigrationClosed();
        if (users.length != levels.length || users.length != parents.length) {
            revert MatrixParentSeedLengthMismatch();
        }

        for (uint256 index = 0; index < users.length; ++index) {
            address user = users[index];
            address parent = parents[index];
            uint8 level = levels[index];
            require(user != address(0) && parent != address(0) && user != parent, "Invalid matrix parent");
            _validateLevel(level);

            address existing = currentMatrixParentOf[user][level];
            if (existing != address(0) && existing != parent) {
                revert MatrixParentSeedConflict(user, level, existing, parent);
            }
            if (existing == address(0)) {
                currentMatrixParentOf[user][level] = parent;
                emit CurrentMatrixParentRecorded(user, level, parent);
            }
        }
    }

    function finalizeMatrixParentMigration() external onlyOwner {
        if (matrixParentMigrationFinalized) revert MatrixParentMigrationClosed();
        matrixParentMigrationFinalized = true;
        emit MatrixParentMigrationFinalized();
    }

    bool public matrixParentMigrationFinalized;
    uint256[48] private __gap;
}











// // Revert back to this version and add the license
// pragma solidity ^0.8.24;

// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// interface ILevelManager {
//     function activateLevel(address user, uint8 level) external;
//     function markID1Downline(address user) external;
//     function setID1Wallet(address _id1Wallet) external;
// }

// interface IGuardian {
//     function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
// }

// /**
//  * @title RegistrationFixed
//  * @dev Registration and activation entry contract.
//  */
// contract RegistrationFixed is
//     Initializable,
//     OwnableUpgradeable,
//     UUPSUpgradeable,
//     PausableUpgradeable,
//     ReentrancyGuardUpgradeable
// {
//     IERC20 public usdt;
//     ILevelManager public levelManager;

//     address public id1Wallet;
//     address public guardian;

//     mapping(address => bool) public isRegistered;
//     mapping(address => address) public referrerOf;
//     mapping(address => mapping(uint8 => bool)) public levelActivated;
//     mapping(address => bool) private _noReferrer;

//     uint256 public registeredCount;

//     event Registered(address indexed user, address indexed referrer);
//     event LevelActivated(address indexed user, uint8 level, uint256 price);
//     event AutoUpgradeTriggered(address indexed user, uint8 fromLevel, uint8 toLevel);
//     event ID1WalletSet(address indexed id1Wallet);
//     event LevelManagerSet(address indexed levelManager);
//     event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);

//     uint256[] public levelPrices;

//     function initialize(
//         address _usdt,
//         address _levelManager,
//         address initialOwner,
//         address _guardian
//     ) public initializer {
//         require(_usdt != address(0), "Invalid USDT");
//         require(initialOwner != address(0), "Invalid owner");

//         __Ownable_init(initialOwner);
//         __UUPSUpgradeable_init();
//         __Pausable_init();
//         __ReentrancyGuard_init();

//         usdt = IERC20(_usdt);
//         guardian = _guardian;

//         if (_levelManager != address(0)) {
//             levelManager = ILevelManager(_levelManager);
//             emit LevelManagerSet(_levelManager);
//         }

//         levelPrices.push(10 * 10**6);
//         levelPrices.push(20 * 10**6);
//         levelPrices.push(40 * 10**6);
//         levelPrices.push(80 * 10**6);
//         levelPrices.push(160 * 10**6);
//         levelPrices.push(320 * 10**6);
//         levelPrices.push(640 * 10**6);
//         levelPrices.push(1280 * 10**6);
//         levelPrices.push(2560 * 10**6);
//         levelPrices.push(5120 * 10**6);
//     }

//     function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
//         require(guardian != address(0), "Guardian not set");
//         require(
//             IGuardian(guardian).validateUpgrade(address(this), newImplementation),
//             "Upgrade blocked"
//         );
//     }

//     function pause() external onlyOwner {
//         _pause();
//     }

//     function unpause() external onlyOwner {
//         _unpause();
//     }

//     function setGuardian(address _guardian) external onlyOwner {
//         address oldGuardian = guardian;
//         guardian = _guardian;
//         emit GuardianUpdated(oldGuardian, _guardian);
//     }

//     /**
//      * @dev Register and activate level 1 in one transaction.
//      */
//     function register(address _referrer) external whenNotPaused nonReentrant {
//         require(address(levelManager) != address(0), "LevelManager not set");
//         require(id1Wallet != address(0), "ID1 wallet not set");
//         require(!isRegistered[msg.sender], "Already registered");
//         require(_referrer != msg.sender, "Self-referral not allowed");

//         if (_referrer != address(0)) {
//             require(
//                 isRegistered[_referrer] || _referrer == id1Wallet,
//                 "Referrer not registered or not ID1"
//             );
//             _noReferrer[msg.sender] = false;
//         } else {
//             _noReferrer[msg.sender] = true;
//         }

//         uint256 level1Price = levelPrices[0];
//         require(usdt.balanceOf(msg.sender) >= level1Price, "Insufficient USDT balance for Level 1");
//         require(
//             usdt.allowance(msg.sender, address(levelManager)) >= level1Price,
//             "Insufficient USDT allowance for LevelManager"
//         );

//         isRegistered[msg.sender] = true;
//         referrerOf[msg.sender] = _referrer;
//         registeredCount += 1;

//         emit Registered(msg.sender, _referrer);

//         levelManager.markID1Downline(msg.sender);
//         levelManager.activateLevel(msg.sender, 1);

//         levelActivated[msg.sender][1] = true;
//         emit LevelActivated(msg.sender, 1, level1Price);
//     }

//     function setID1Wallet(address _id1Wallet) external onlyOwner {
//         require(_id1Wallet != address(0), "Invalid address");
//         id1Wallet = _id1Wallet;

//         if (address(levelManager) != address(0)) {
//             levelManager.setID1Wallet(_id1Wallet);
//         }

//         emit ID1WalletSet(_id1Wallet);
//     }

//     function activateLevel(uint8 level) external whenNotPaused nonReentrant {
//         require(address(levelManager) != address(0), "LevelManager not set");
//         require(isRegistered[msg.sender], "Not registered");
//         require(level >= 1 && level <= 10, "Invalid level");
//         require(!levelActivated[msg.sender][level], "Level already activated");

//         if (level > 1) {
//             require(levelActivated[msg.sender][level - 1], "Previous level not activated");
//         }

//         uint256 price = levelPrices[level - 1];
//         levelManager.activateLevel(msg.sender, level);

//         levelActivated[msg.sender][level] = true;
//         emit LevelActivated(msg.sender, level, price);
//     }

//     function triggerAutoUpgrade(address user, uint8 fromLevel) external {
//         require(msg.sender == address(levelManager), "Only LevelManager");
//         require(user != address(0), "Invalid user");

//         uint8 nextLevel = fromLevel + 1;
//         require(nextLevel <= 10, "Max level reached");

//         if (!levelActivated[user][nextLevel]) {
//             levelActivated[user][nextLevel] = true;
//             emit LevelActivated(user, nextLevel, levelPrices[nextLevel - 1]);
//             emit AutoUpgradeTriggered(user, fromLevel, nextLevel);
//         }
//     }

//     function hadNoReferrer(address user) external view returns (bool) {
//         return _noReferrer[user];
//     }

//     function isLevelActivated(address user, uint8 level) external view returns (bool) {
//         require(level >= 1 && level <= 10, "Invalid level");

//         if (user == id1Wallet) {
//             return true;
//         }

//         return levelActivated[user][level];
//     }

//     function getReferrer(address user) external view returns (address) {
//         return referrerOf[user];
//     }

//     function highestActiveLevel(address user) external view returns (uint8) {
//         if (user == id1Wallet) {
//             return 10;
//         }

//         for (uint8 i = 10; i >= 1; i--) {
//             if (levelActivated[user][i]) {
//                 return i;
//             }
//             if (i == 1) {
//                 break;
//             }
//         }

//         return 0;
//     }

//     function updateLevelPrice(uint8 level, uint256 newPrice) external onlyOwner {
//         require(level >= 1 && level <= 10, "Invalid level");
//         require(newPrice > 0, "Invalid price");
//         levelPrices[level - 1] = newPrice;
//     }

//     function setLevelManager(address _levelManager) external onlyOwner {
//         require(_levelManager != address(0), "Invalid LevelManager");
//         require(address(levelManager) == address(0), "LevelManager already set");

//         levelManager = ILevelManager(_levelManager);
//         emit LevelManagerSet(_levelManager);

//         if (id1Wallet != address(0)) {
//             levelManager.setID1Wallet(id1Wallet);
//         }
//     }

//     function getLevelPrice(uint8 level) public view returns (uint256) {
//         require(level >= 1 && level <= 10, "Invalid level");
//         return levelPrices[level - 1];
//     }

//     function isParticipant(address user) external view returns (bool) {
//         return isRegistered[user];
//     }

//     function totalParticipants() external view returns (uint256) {
//         if (id1Wallet != address(0) && !isRegistered[id1Wallet]) {
//             return registeredCount + 1;
//         }
//         return registeredCount;
//     }

//     uint256[50] private __gap;
// }
