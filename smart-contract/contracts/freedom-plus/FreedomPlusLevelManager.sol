// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./libraries/FreedomPlusConfig.sol";
import "./interfaces/IFreedomPlusLevelManager.sol";
import "./interfaces/IFreedomPlusSettlementRouter.sol";
import "./interfaces/IFreedomPlusTokenController.sol";

interface IFreedomPlusManagerGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

contract FreedomPlusLevelManager is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    IFreedomPlusLevelManager
{
    using SafeERC20 for IERC20;

    IERC20 public usdt;
    IFreedomPlusTokenController public tokenController;
    IFreedomPlusSettlementRouter public settlementRouter;
    address public registration;
    address public guardian;
    uint256 public activationNonce;

    mapping(bytes32 => bool) public activationProcessed;

    event RegistrationConfigured(address indexed registration);
    event SettlementRouterConfigured(address indexed router);
    event TokenControllerUpdated(address indexed previousController, address indexed newController);
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);
    event PaidActivationSettled(
        address indexed participant,
        uint8 indexed level,
        bytes32 indexed activationId,
        address sponsor,
        uint256 price
    );

    error OnlyRegistration();
    error InvalidAddress();
    error InvalidContract(address target);
    error RegistrationAlreadyConfigured();
    error SettlementRouterAlreadyConfigured();
    error SettlementRouterNotConfigured();
    error InvalidLevel(uint8 level);
    error IncorrectTransferredAmount(uint256 expected, uint256 received);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    modifier onlyRegistration() {
        if (msg.sender != registration) revert OnlyRegistration();
        _;
    }

    function initialize(
        address usdt_,
        address tokenController_,
        address initialOwner,
        address guardian_
    ) public initializer {
        _requireContract(usdt_);
        _requireContract(tokenController_);
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdt = IERC20(usdt_);
        tokenController = IFreedomPlusTokenController(tokenController_);
        guardian = guardian_;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusManagerGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function activatePaidLevel(address participant, address sponsor, uint8 level)
        external
        onlyRegistration
        whenNotPaused
        nonReentrant
        returns (bytes32 activationId)
    {
        if (participant == address(0) || sponsor == address(0)) revert InvalidAddress();
        if (level < 1 || level > 7) revert InvalidLevel(level);
        address routerAddress = address(settlementRouter);
        if (routerAddress == address(0)) revert SettlementRouterNotConfigured();

        FreedomPlusConfig.LevelConfig memory config = FreedomPlusConfig.levelConfig(level);
        uint256 nonce = activationNonce + 1;
        activationNonce = nonce;
        activationId = keccak256(
            abi.encode(block.chainid, address(this), participant, sponsor, level, nonce)
        );

        uint256 beforeBalance = usdt.balanceOf(routerAddress);
        usdt.safeTransferFrom(participant, routerAddress, config.price);
        uint256 received = usdt.balanceOf(routerAddress) - beforeBalance;
        if (received != config.price) revert IncorrectTransferredAmount(config.price, received);

        settlementRouter.settlePaidActivation(
            participant,
            sponsor,
            level,
            config.price,
            activationId
        );
        tokenController.onFirstActivation(participant, level, config.fptReward);
        activationProcessed[activationId] = true;

        emit PaidActivationSettled(participant, level, activationId, sponsor, config.price);
    }

    function configureRegistration(address registration_) external onlyOwner {
        if (registration != address(0)) revert RegistrationAlreadyConfigured();
        _requireContract(registration_);
        registration = registration_;
        emit RegistrationConfigured(registration_);
    }

    function configureSettlementRouter(address router_) external onlyOwner {
        if (address(settlementRouter) != address(0)) revert SettlementRouterAlreadyConfigured();
        _requireContract(router_);
        settlementRouter = IFreedomPlusSettlementRouter(router_);
        emit SettlementRouterConfigured(router_);
    }

    function setTokenController(address controller_) external onlyOwner {
        _requireContract(controller_);
        address previous = address(tokenController);
        tokenController = IFreedomPlusTokenController(controller_);
        emit TokenControllerUpdated(previous, controller_);
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
