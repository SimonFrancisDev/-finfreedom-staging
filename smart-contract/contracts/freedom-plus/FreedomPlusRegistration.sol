// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/IFreedomPlusLevelManager.sol";

interface IFreedomPlusRegistrationGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomPlusRegistration is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    uint8 public constant MIN_LEVEL = 1;
    uint8 public constant MAX_LEVEL = 7;

    IFreedomPlusLevelManager public levelManager;
    address public guardian;
    address public id1Wallet;

    uint256 public registeredCount;
    mapping(address => bool) public isRegistered;
    mapping(address => address) public sponsorOf;
    mapping(address => uint256) public participantNumber;
    mapping(address => mapping(uint8 => bool)) private _levelActive;

    event ParticipantRegistered(
        address indexed participant,
        address indexed sponsor,
        uint256 indexed participantNumber,
        bytes32 activationId
    );
    event LevelActivated(
        address indexed participant,
        uint8 indexed level,
        bytes32 indexed activationId
    );
    event LevelManagerUpdated(address indexed previousManager, address indexed newManager);
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);

    error InvalidAddress();
    error InvalidContract(address target);
    error AlreadyRegistered(address participant);
    error SponsorNotRegistered(address sponsor);
    error SelfSponsorship();
    error NotRegistered(address participant);
    error InvalidLevel(uint8 level);
    error LevelAlreadyActive(address participant, uint8 level);
    error PreviousLevelInactive(address participant, uint8 requiredLevel);
    error LevelOneRequiresRegistration();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address manager_,
        address id1Wallet_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(manager_);
        if (id1Wallet_ == address(0) || initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        levelManager = IFreedomPlusLevelManager(manager_);
        id1Wallet = id1Wallet_;
        guardian = guardian_;

        isRegistered[id1Wallet_] = true;
        participantNumber[id1Wallet_] = 1;
        registeredCount = 1;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusRegistrationGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function register(address sponsor) external whenNotPaused nonReentrant {
        address participant = msg.sender;
        if (isRegistered[participant]) revert AlreadyRegistered(participant);
        if (sponsor == participant) revert SelfSponsorship();
        if (sponsor == address(0) || !isRegistered[sponsor]) revert SponsorNotRegistered(sponsor);

        uint256 number = registeredCount + 1;
        isRegistered[participant] = true;
        sponsorOf[participant] = sponsor;
        participantNumber[participant] = number;
        registeredCount = number;

        bytes32 activationId = levelManager.activatePaidLevel(participant, sponsor, MIN_LEVEL);
        _levelActive[participant][MIN_LEVEL] = true;

        emit ParticipantRegistered(participant, sponsor, number, activationId);
        emit LevelActivated(participant, MIN_LEVEL, activationId);
    }

    function activateLevel(uint8 level) external whenNotPaused nonReentrant {
        address participant = msg.sender;
        if (!isRegistered[participant]) revert NotRegistered(participant);
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel(level);
        if (level == MIN_LEVEL) revert LevelOneRequiresRegistration();
        if (_levelActive[participant][level]) revert LevelAlreadyActive(participant, level);
        if (!_levelActive[participant][level - 1]) {
            revert PreviousLevelInactive(participant, level - 1);
        }

        bytes32 activationId = levelManager.activatePaidLevel(
            participant,
            sponsorOf[participant],
            level
        );
        _levelActive[participant][level] = true;

        emit LevelActivated(participant, level, activationId);
    }

    function isLevelActive(address participant, uint8 level) external view returns (bool) {
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel(level);
        return _levelActive[participant][level];
    }

    function setLevelManager(address manager_) external onlyOwner {
        _requireContract(manager_);
        address previous = address(levelManager);
        levelManager = IFreedomPlusLevelManager(manager_);
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

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[43] private __gap;
}
