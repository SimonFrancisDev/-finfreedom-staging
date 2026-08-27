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

interface IFFreedomGatewayRegistration {
    function isRegistered(address participant) external view returns (bool);
    function isLevelActivated(address participant, uint8 level) external view returns (bool);
    function getReferrer(address participant) external view returns (address);
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
    bool public genesisInitialized;
    mapping(address => bool) public isRegistered;
    mapping(address => address) public sponsorOf;
    mapping(address => uint256) public participantNumber;
    mapping(address => mapping(uint8 => bool)) private _levelActive;
    address public fFreedomRegistration;

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
    event GenesisInitialized(address indexed id1Wallet, address[4] representatives);
    event FFreedomRegistrationUpdated(address indexed previousRegistration, address indexed newRegistration);

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
    error GenesisAlreadyInitialized();
    error InvalidRepresentativeCount();
    error FFreedomGatewayNotConfigured();
    error FFreedomLevelOneInactive(address participant);
    error PermanentSponsorMismatch(address expectedSponsor, address suppliedSponsor);

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
        address gateway = fFreedomRegistration;
        if (gateway == address(0)) revert FFreedomGatewayNotConfigured();
        IFFreedomGatewayRegistration fFreedom = IFFreedomGatewayRegistration(gateway);
        if (!fFreedom.isRegistered(participant) || !fFreedom.isLevelActivated(participant, MIN_LEVEL)) {
            revert FFreedomLevelOneInactive(participant);
        }
        address permanentSponsor = fFreedom.getReferrer(participant);
        if (sponsor != permanentSponsor) revert PermanentSponsorMismatch(permanentSponsor, sponsor);
        if (sponsor == address(0)) revert SponsorNotRegistered(sponsor);

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

    function initializeGenesis(address[4] calldata representatives)
        external onlyOwner whenNotPaused nonReentrant
    {
        if (genesisInitialized) revert GenesisAlreadyInitialized();
        if (registeredCount != 1) revert InvalidRepresentativeCount();
        genesisInitialized = true;

        for (uint8 level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
            _levelActive[id1Wallet][level] = true;
            bytes32 activationId = levelManager.activateGenesisLevel(
                id1Wallet,
                id1Wallet,
                level,
                false
            );
            emit LevelActivated(id1Wallet, level, activationId);
        }

        for (uint8 index = 0; index < representatives.length; index++) {
            address representative = representatives[index];
            if (representative == address(0) || representative == id1Wallet) revert InvalidAddress();
            if (isRegistered[representative]) revert AlreadyRegistered(representative);
            for (uint8 prior = 0; prior < index; prior++) {
                if (representatives[prior] == representative) {
                    revert AlreadyRegistered(representative);
                }
            }

            uint256 number = registeredCount + 1;
            isRegistered[representative] = true;
            sponsorOf[representative] = id1Wallet;
            participantNumber[representative] = number;
            registeredCount = number;

            for (uint8 level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
                _levelActive[representative][level] = true;
                bytes32 activationId = levelManager.activateGenesisLevel(
                    representative,
                    id1Wallet,
                    level,
                    true
                );
                emit LevelActivated(representative, level, activationId);
            }
            emit ParticipantRegistered(representative, id1Wallet, number, bytes32(0));
        }

        emit GenesisInitialized(id1Wallet, representatives);
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

    function setFFreedomRegistration(address registration_) external onlyOwner {
        _requireContract(registration_);
        address previous = fFreedomRegistration;
        fFreedomRegistration = registration_;
        emit FFreedomRegistrationUpdated(previous, registration_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[42] private __gap;
}
