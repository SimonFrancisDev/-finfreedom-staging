// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "./interfaces/IRegistration.sol";
import "./interfaces/IFreedomTokenController.sol";
import "./interfaces/ILevelSettlementRouter.sol";

interface IAutoUpgradeEscrow {
    function lockFunds(address user, uint8 fromLevel, uint8 toLevel, uint256 amount) external;
    function releaseForUpgrade(address user, uint8 fromLevel, uint8 toLevel, address recipient) external;
    function releaseAmountForUpgrade(address user, uint8 fromLevel, uint8 toLevel, address recipient, uint256 amount) external;
    function getLockedAmount(address user, uint8 fromLevel, uint8 toLevel) external view returns (uint256);
    function releaseToUser(address user, uint8 fromLevel, uint8 toLevel) external;
}

interface IOrbitDetailed {
    function fillPositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 activationId
    )
        external
        returns (
            uint8 sourcePosition,
            uint32 sourceCycle,
            uint256 toOwner,
            uint256 toSpillover1,
            address spillover1Recipient,
            uint256 toSpillover2,
            address spillover2Recipient,
            uint256 toEscrow,
            uint256 toRecycle
        );

    function mirrorPositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 ruleBaseAmount,
        uint256 activationId
    )
        external
        returns (
            uint8 position,
            uint32 cycleNumber,
            uint256 mirrorOwnerLiquidAmount,
            uint256 mirrorEscrowLockAmount,
            uint256 mirrorRecycleAmount
        );
}

interface IManagedOrbit is IOrbitDetailed {
    function recordExternalEarning(address user, uint8 level, uint256 amount) external;
    function setFounderRepActivated(address user, bool activated) external;
    function settleEscrowState(address user, uint8 level) external;
}

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

contract LevelManager is Initializable, OwnableUpgradeable, UUPSUpgradeable, PausableUpgradeable, ReentrancyGuardUpgradeable {
    using SafeERC20 for IERC20;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    error InvalidAddress();
    error InvalidContract();
    error InvalidLevel();
    error InvalidOrbitType();
    error InvalidFounderConfig();
    error OnlyRegistration();
    error OnlyOrbitContracts();
    error LevelAlreadyActivated();
    error PreviousLevelInactive();
    error UserNotRegistered();
    error TokenRewardFailed();
    error SettlementRouterCallFailed();
    error UplineSearchTooDeep(address startUser, uint8 level);

    IERC20 public usdt;
    IRegistration public registration;
    address public escrow;

    IManagedOrbit public p4Orbit;
    IManagedOrbit public p12Orbit;
    IManagedOrbit public p39Orbit;

    address public tokenController;
    address public guardian;
    ILevelSettlementRouter public settlementRouter;

    mapping(uint8 => string) private __deprecatedLevelToOrbitType;
    mapping(uint8 => uint256) private __deprecatedLevelPrices;

    address public nftPool;
    address public operationsWallet;

    address[] public founderWallets;
    uint256[] public founderRatios;

    mapping(address => bool) public founderRepresentative;
    mapping(address => bool) public founderRepUsed;
    mapping(address => uint8) public founderRepLevelsActivated;
    mapping(address => bool) public founderRepAllLevelsCompleted;

    address public id1Wallet;
    mapping(address => bool) public isID1Downline;

    mapping(address => mapping(uint8 => bool)) public userLevelActivated;

    uint8 public constant RECEIPT_FOUNDER_PATH = 1;
    uint8 public constant RECEIPT_DIRECT_OWNER = 2;
    uint8 public constant RECEIPT_ROUTED_SPILLOVER = 3;
    uint8 public constant RECEIPT_RECYCLE = 4;

    uint8 public constant ROUTED_ROLE_OWNER = 1;
    uint8 public constant ROUTED_ROLE_SPILLOVER1 = 2;
    uint8 public constant ROUTED_ROLE_SPILLOVER2 = 3;
    uint8 public constant ROUTED_ROLE_RECYCLE = 4;
    uint8 public constant ROUTED_ROLE_FOUNDER_PATH = 5;

    bytes32 internal constant ROLE_OWNER_CODE = "OWNER";
    bytes32 internal constant ROLE_SPILLOVER1_CODE = "SPILLOVER1";
    bytes32 internal constant ROLE_SPILLOVER2_CODE = "SPILLOVER2";
    bytes32 internal constant ROLE_RECYCLE_CODE = "RECYCLE";
    bytes32 internal constant ROLE_FOUNDER_PATH_CODE = "FOUNDER_PATH";

    bytes32 internal constant REASON_ZERO_RECEIVER = "ZERO_RECEIVER";
    bytes32 internal constant REASON_ZERO_AMOUNT = "ZERO_AMOUNT";
    bytes32 internal constant REASON_ID1_FALLBACK = "ID1_FALLBACK";
    bytes32 internal constant REASON_ESCROW_INSTEAD_OF_LIQUID = "ESCROW_INSTEAD_OF_LIQUID";
    bytes32 internal constant REASON_RECYCLE_FALLBACK = "RECYCLE_FALLBACK_ID1";
    bytes32 internal constant REASON_FOUNDER_ROUTE = "FOUNDER_ROUTE";
    bytes32 internal constant REASON_FOUNDER_DUST = "FOUNDER_DUST_ASSIGNED";

    bytes32 internal constant ACTION_ACTIVATE_LEVEL = "ACTIVATE_LEVEL";
    bytes32 internal constant ACTION_NO_ACTION = "NO_ACTION";
    bytes32 internal constant ACTION_SUPPORT_REVIEW = "SUPPORT_REVIEW";

    uint8 public constant MAX_LEVEL = 10;
    uint8 public constant MIN_LEVEL = 1;
    uint8 public constant MAX_FOUNDER_REPS = 4;
    uint8 public constant FOUNDER_REP_FREE_LEVEL_LIMIT = 10;
    uint8 internal constant MAX_UPLINE_SEARCH_DEPTH = 64;

    uint256 public nextActivationId;

    struct ActivationFlowData {
        uint256 activationId;
        uint256 systemCharge;
        address sponsor;
        uint8 orbitType;
        address orbitAddress;
        uint8 sourcePosition;
        uint32 sourceCycle;
        uint256 toOwner;
        uint256 toSpillover1;
        address spillover1Recipient;
        uint256 toSpillover2;
        address spillover2Recipient;
        uint256 toEscrow;
        uint256 toRecycle;
        address recycleRecipient;
        bool isTrueNoReferrer;
        bool isId1Fallback;
    }

    struct MirrorSplitResult {
        uint8 mirroredPosition;
        uint32 mirroredCycle;
        uint256 liquidAmount;
        uint256 escrowLocked;
        uint256 recycleAmount;
    }

    struct SpilloverSettlementResult {
        uint256 liquidPaid;
        uint256 escrowLocked;
    }

    struct PendingAutoUpgradeCheck {
        address user;
        uint8 level;
    }

    struct RecycleResult {
        uint256 recycleGross;
        uint256 recycleLiquidPaid;
        uint256 recycleEscrowLocked;
        address actualRecycleReceiver;
        uint8 mirrorPosition;
        uint32 mirrorCycle;
    }

    event DetailedPayoutReceiptRecorded(
        address indexed receiver,
        uint256 indexed activationId,
        uint8 indexed level,
        uint8 receiptType,
        address fromUser,
        address orbitOwner,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint8 mirroredPosition,
        uint32 mirroredCycle,
        uint8 routedRole,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    );

    event PayoutReceiptRecorded(
        address indexed receiver,
        uint8 indexed level,
        uint8 indexed receiptType,
        address fromUser,
        address orbitOwner,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    );


    event LevelActivated(address indexed user, uint8 level, uint256 amount);
    event LevelActivatedInOrbit(address indexed user, uint8 level, address orbit, uint256 netAmount);
    event SystemChargeDistributed(uint256 nftPoolAmount, uint256 operationsAmount);
    event FounderIncomeDistributed(uint256 totalAmount);
    event FounderRepActivated(address indexed user, uint8 level, uint8 totalActivated);
    event FounderWalletsUpdated(address[] wallets, uint256[] ratios);
    event FounderRepsUpdated(address[] reps);
    event ID1WalletSet(address indexed id1Wallet);
    event AutoUpgradeTriggered(address indexed user, uint8 fromLevel, uint8 toLevel);
    event TokenControllerUpdated(address indexed oldController, address indexed newController);
    event PayoutNotDelivered(
        address indexed affectedUser,
        address indexed sourceUser,
        uint8 indexed level,
        uint8 orbitType,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 expectedAmount,
        address actualReceiver,
        uint256 actualAmount,
        uint8 receiptType,
        bytes32 routedRole,
        bytes32 reasonCode,
        bytes32 actionCode,
        uint256 activationId
    );

    event SystemChargeDistributedDetailed(
        uint256 indexed activationId,
        address indexed user,
        uint8 indexed level,
        uint256 systemChargeTotal,
        uint256 nftPoolAmount,
        uint256 operationsAmount,
        address nftPool,
        address operationsWallet
    );

    event FounderDistributionDetailed(
        uint256 indexed activationId,
        address indexed sourceUser,
        uint8 indexed level,
        address founderWallet,
        uint256 amount,
        uint256 ratioBps,
        bytes32 reasonCode
    );

    event RecycleCompletedDetailed(
        uint256 indexed activationId,
        address indexed orbitOwner,
        uint8 indexed level,
        address sourceUser,
        uint8 sourcePosition,
        uint32 sourceCycle,
        address recycleReceiver,
        uint256 recycleGross,
        uint256 recycleLiquidPaid,
        uint256 recycleEscrowLocked,
        uint8 mirrorPosition,
        uint32 mirrorCycle,
        bool triggeredOrbitReset
    );

    event AutoUpgradeCompleted(
        uint256 indexed activationId,
        address indexed user,
        uint8 indexed fromLevel,
        uint8 toLevel,
        uint256 requiredAmount,
        uint256 usedAmount,
        uint256 escrowBefore,
        uint256 escrowAfter
    );

    event OrbitContractsUpdated(
        address indexed oldP4Orbit,
        address indexed newP4Orbit,
        address oldP12Orbit,
        address newP12Orbit,
        address oldP39Orbit,
        address newP39Orbit
    );
    event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);
    event SettlementRouterUpdated(address indexed oldRouter, address indexed newRouter);
    event ChargeRecipientsUpdated(
        address indexed oldNftPool,
        address indexed newNftPool,
        address oldOperationsWallet,
        address newOperationsWallet
    );

    event ActivationFinancialSummaryRecorded(
        uint256 indexed activationId,
        address indexed user,
        uint8 indexed level,
        uint256 activationAmount,
        uint256 systemCharge,
        uint256 nftPoolAmount,
        uint256 operationsAmount,
        uint256 totalLiquidPaid,
        uint256 totalEscrowLocked,
        uint256 totalRecycleAllocated,
        bool isAutoUpgrade,
        bool isFounderRepFreeActivation
    );

    function initialize(
        address _usdt,
        address _nftPool,
        address _operationsWallet,
        address _registration,
        address _escrow,
        address _guardian
    ) public initializer {
        if (
            _usdt == address(0) ||
            _nftPool == address(0) ||
            _operationsWallet == address(0) ||
            _registration == address(0) ||
            _escrow == address(0)
        ) revert InvalidAddress();
        _requireContract(_guardian);

        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        usdt = IERC20(_usdt);
        nftPool = _nftPool;
        operationsWallet = _operationsWallet;
        registration = IRegistration(_registration);
        escrow = _escrow;
        guardian = _guardian;

        nextActivationId = 1;
    }

    function _validateLevel(uint8 level) internal pure {
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel();
    }

    function levelPrices(uint8 level) public pure returns (uint256) {
        if (level < MIN_LEVEL || level > MAX_LEVEL) return 0;
        return (10 * 10**6) << (level - 1);
    }

    function levelToOrbitType(uint8 level) public pure returns (string memory) {
        uint8 orbitType = _orbitCodeForLevel(level);
        if (orbitType == 4) return "P4";
        if (orbitType == 12) return "P12";
        return "P39";
    }

    function _requireContract(address target) internal view {
        if (target == address(0)) revert InvalidAddress();
        if (target.code.length == 0) revert InvalidContract();
    }

    function _requireSettlementRouter() internal view {
        if (address(settlementRouter) == address(0)) revert InvalidContract();
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        _requireContract(newImplementation);

        address currentGuardian = guardian;
        if (currentGuardian == address(0)) revert InvalidAddress();
        if (!IGuardian(currentGuardian).validateUpgrade(address(this), newImplementation)) revert InvalidContract();
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setOrbitContracts(
        address _p4Orbit,
        address _p12Orbit,
        address _p39Orbit
    ) external onlyOwner {
        _requireContract(_p4Orbit);
        _requireContract(_p12Orbit);
        _requireContract(_p39Orbit);

        address oldP4 = address(p4Orbit);
        address oldP12 = address(p12Orbit);
        address oldP39 = address(p39Orbit);

        p4Orbit = IManagedOrbit(_p4Orbit);
        p12Orbit = IManagedOrbit(_p12Orbit);
        p39Orbit = IManagedOrbit(_p39Orbit);

        emit OrbitContractsUpdated(oldP4, _p4Orbit, oldP12, _p12Orbit, oldP39, _p39Orbit);
    }

    function setGuardian(address _guardian) external onlyOwner {
        _requireContract(_guardian);
        address oldGuardian = guardian;
        guardian = _guardian;
        emit GuardianUpdated(oldGuardian, _guardian);
    }

    function setSettlementRouter(address _settlementRouter) external onlyOwner {
        _requireContract(_settlementRouter);
        if (!ILevelSettlementRouter(_settlementRouter).validatesConfig(address(this), address(usdt))) revert InvalidContract();
        address oldRouter = address(settlementRouter);
        settlementRouter = ILevelSettlementRouter(_settlementRouter);
        emit SettlementRouterUpdated(oldRouter, _settlementRouter);
    }

    function setTokenController(address _tokenController) external onlyOwner {
        if (_tokenController != address(0)) {
            if (_tokenController.code.length == 0) revert InvalidContract();
        }

        address oldController = tokenController;
        tokenController = _tokenController;

        emit TokenControllerUpdated(oldController, _tokenController);
    }

    function setFounderWallets(address[] memory wallets, uint256[] memory ratios) external onlyOwner {
        if (wallets.length != ratios.length || wallets.length != 8) revert InvalidFounderConfig();

        uint256 totalRatio = 0;
        uint256 ratiosLength = ratios.length;
        for (uint256 i = 0; i < ratiosLength; ) {
            if (wallets[i] == address(0)) revert InvalidFounderConfig();
            totalRatio += ratios[i];

            unchecked {
                ++i;
            }
        }
        if (totalRatio != 10000) revert InvalidFounderConfig();

        founderWallets = wallets;
        founderRatios = ratios;

        emit FounderWalletsUpdated(wallets, ratios);
    }

    function getFounderWallets() external view returns (address[] memory wallets, uint256[] memory ratios) {
        return (founderWallets, founderRatios);
    }

    function setFounderRepresentatives(address[] memory reps) external onlyOwner {
        uint256 repsLength = reps.length;

        if (repsLength == 0 || founderRepWallets.length + repsLength > MAX_FOUNDER_REPS) revert InvalidFounderConfig();

        for (uint256 i = 0; i < repsLength; ) {
            address rep = reps[i];

            if (rep == address(0) || founderRepresentative[rep]) revert InvalidFounderConfig();

            founderRepresentative[rep] = true;
            founderRepWallets.push(rep);

            unchecked {
                ++i;
            }
        }

        emit FounderRepsUpdated(reps);
    }

    function approveEscrow(uint256 amount) external onlyOwner {
        usdt.forceApprove(escrow, amount);
    }

    function setID1Wallet(address _id1Wallet) external {
        if (msg.sender != address(registration)) revert OnlyRegistration();
        if (_id1Wallet == address(0)) revert InvalidAddress();
        if (id1Wallet != address(0) && id1Wallet != _id1Wallet) revert InvalidAddress();
        id1Wallet = _id1Wallet;
        emit ID1WalletSet(_id1Wallet);
    }

    function markID1Downline(address user) external {
        if (msg.sender != address(registration)) revert OnlyRegistration();
        if (id1Wallet == address(0)) revert InvalidAddress();

        address referrer = registration.getReferrer(user);
        if (referrer == id1Wallet) {
            isID1Downline[user] = true;
        }
    }

    function updateChargeRecipients(address _nftPool, address _operations) external onlyOwner {
        if (_nftPool == address(0) || _operations == address(0)) revert InvalidAddress();
        address oldNftPool = nftPool;
        address oldOperations = operationsWallet;
        nftPool = _nftPool;
        operationsWallet = _operations;
        emit ChargeRecipientsUpdated(oldNftPool, _nftPool, oldOperations, _operations);
    }

    function resolveSponsor(address user, uint8 level) public view returns (address) {
        if (user == address(0)) return id1Wallet;

        _orbitCodeForLevel(level);
        address current = registration.getReferrer(user);
        uint8 depth = 0;

        while (current != address(0)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(user, level);

            if (registration.isLevelActivated(current, level)) {
                return current;
            }
            current = registration.getReferrer(current);

            unchecked {
                ++depth;
            }
        }

        return id1Wallet;
    }

    function activateLevel(address user, uint8 level) external whenNotPaused nonReentrant {
        if (msg.sender != address(registration)) revert OnlyRegistration();
        _validateLevel(level);
        if (userLevelActivated[user][level]) revert LevelAlreadyActivated();

        if (
            !registration.isParticipant(user) &&
            !(level == 1 && msg.sender == address(registration) && !userLevelActivated[user][1])
        ) revert UserNotRegistered();

        if (id1Wallet == address(0)) revert InvalidAddress();
        if (address(p4Orbit) == address(0) || address(p12Orbit) == address(0) || address(p39Orbit) == address(0)) {
            revert InvalidContract();
        }

        if (level > 1) {
            if (!userLevelActivated[user][level - 1]) revert PreviousLevelInactive();

            uint256 existingLock = IAutoUpgradeEscrow(escrow).getLockedAmount(user, level - 1, level);
            if (existingLock > 0) {
                IAutoUpgradeEscrow(escrow).releaseToUser(user, level - 1, level);
                _settleOrbitEscrow(user, level - 1);
            }
        }

        if (
            founderRepresentative[user] &&
            founderRepLevelsActivated[user] < FOUNDER_REP_FREE_LEVEL_LIMIT
        ) {
            _handleFounderRepActivation(user, level);
            return;
        }

        uint256 amount = levelPrices(level);
        usdt.safeTransferFrom(user, address(this), amount);

        _processLevelActivation(user, level, amount, false);

        if (tokenController != address(0)) {
            IFreedomTokenController(tokenController).onManualActivation(user, level, amount);
        }
    }

    function _processLevelActivation(
        address user,
        uint8 level,
        uint256 amount,
        bool isAutoUpgrade
    ) internal {
        ActivationFlowData memory a;

        a.activationId = nextActivationId++;
        a.systemCharge = (amount * 10) / 100;

        a.sponsor = resolveSponsor(user, level);
        a.orbitType = _orbitCodeForLevel(level);
        a.orbitAddress = _getOrbitAddress(a.orbitType);
        a.isTrueNoReferrer = registration.hadNoReferrer(user);
        a.isId1Fallback = (
            a.sponsor == id1Wallet &&
            !a.isTrueNoReferrer &&
            registration.getReferrer(user) != id1Wallet
        );
        if (a.isId1Fallback) {
            _emitPayoutNotDelivered(
                user,
                user,
                level,
                a.orbitType,
                0,
                0,
                amount,
                id1Wallet,
                amount,
                RECEIPT_DIRECT_OWNER,
                ROLE_OWNER_CODE,
                REASON_ID1_FALLBACK,
                ACTION_ACTIVATE_LEVEL,
                a.activationId
            );
        }

        if (!a.isId1Fallback) {
            (
                a.sourcePosition,
                a.sourceCycle,
                a.toOwner,
                a.toSpillover1,
                a.spillover1Recipient,
                a.toSpillover2,
                a.spillover2Recipient,
                a.toEscrow,
                a.toRecycle
            ) = _fillOrbitPosition(
                a.orbitType,
                a.sponsor,
                level,
                user,
                a.sponsor,
                amount,
                a.activationId
            );

            _consumeLegacyRecycleTransition(a, level, amount);
        }

        uint256 summaryLiquidPaid;
        uint256 summaryEscrowLocked;
        uint256 summaryRecycleAllocated;

        if (a.isTrueNoReferrer || a.isId1Fallback) {
            uint256 founderPathNetAmount = amount - a.systemCharge;

            _sendPayoutWithContext(
                a.sponsor,
                founderPathNetAmount,
                a.activationId,
                user,
                level,
                REASON_FOUNDER_ROUTE
            );
            _recordRoutedEarning(a.orbitType, a.sponsor, level, founderPathNetAmount);

            _recordPayoutReceipt(
                a.sponsor,
                RECEIPT_FOUNDER_PATH,
                level,
                user,
                a.sponsor,
                founderPathNetAmount,
                0,
                founderPathNetAmount
            );

            _recordDetailedPayoutReceipt(
                a.sponsor,
                a.activationId,
                RECEIPT_FOUNDER_PATH,
                level,
                user,
                a.sponsor,
                a.sourcePosition,
                a.sourceCycle,
                0,
                0,
                ROUTED_ROLE_FOUNDER_PATH,
                founderPathNetAmount,
                0,
                founderPathNetAmount
            );

            summaryLiquidPaid = founderPathNetAmount;
            summaryEscrowLocked = 0;
            summaryRecycleAllocated = 0;
        } else {
            uint256 directOwnerGross = a.toOwner + a.toEscrow;
            _sendPayoutWithContext(a.sponsor, a.toOwner, a.activationId, user, level, REASON_FOUNDER_ROUTE);

            _recordPayoutReceipt(
                a.sponsor,
                RECEIPT_DIRECT_OWNER,
                level,
                user,
                a.sponsor,
                directOwnerGross,
                a.toEscrow,
                a.toOwner
            );

            _recordDetailedPayoutReceipt(
                a.sponsor,
                a.activationId,
                RECEIPT_DIRECT_OWNER,
                level,
                user,
                a.sponsor,
                a.sourcePosition,
                a.sourceCycle,
                0,
                0,
                ROUTED_ROLE_OWNER,
                directOwnerGross,
                a.toEscrow,
                a.toOwner
            );

            if (a.toEscrow > 0) {
                _emitPayoutNotDelivered(
                    a.sponsor,
                    user,
                    level,
                    a.orbitType,
                    a.sourcePosition,
                    a.sourceCycle,
                    directOwnerGross,
                    a.sponsor,
                    a.toOwner,
                    RECEIPT_DIRECT_OWNER,
                    ROLE_OWNER_CODE,
                    REASON_ESCROW_INSTEAD_OF_LIQUID,
                    ACTION_NO_ACTION,
                    a.activationId
                );
                _handleLock(a.sponsor, level, a.toEscrow);
            }

            SpilloverSettlementResult memory spilloverResult = _settleRoutedSpillovers(
                a.orbitType,
                level,
                user,
                a.sponsor,
                amount,
                a.sourcePosition,
                a.sourceCycle,
                a.activationId,
                a.spillover1Recipient,
                a.toSpillover1,
                a.spillover2Recipient,
                a.toSpillover2
            );

            RecycleResult memory recycleResult;
            if (a.toRecycle > 0) {
                recycleResult = _handleRecycle(
                    a.sponsor,
                    level,
                    a.toRecycle,
                    a.activationId,
                    user,
                    a.sourcePosition,
                    a.sourceCycle
                );
                a.recycleRecipient = recycleResult.actualRecycleReceiver;
            }

            summaryLiquidPaid = a.toOwner + spilloverResult.liquidPaid + recycleResult.recycleLiquidPaid;
            summaryEscrowLocked = a.toEscrow + spilloverResult.escrowLocked + recycleResult.recycleEscrowLocked;
            summaryRecycleAllocated = a.toRecycle;
        }

        uint256 nftPoolAmount = (a.systemCharge * 80) / 100;
        uint256 operationsAmount = a.systemCharge - nftPoolAmount;

        usdt.safeTransfer(nftPool, nftPoolAmount);
        usdt.safeTransfer(operationsWallet, operationsAmount);

        emit SystemChargeDistributed(nftPoolAmount, operationsAmount);
        emit SystemChargeDistributedDetailed(
            a.activationId,
            user,
            level,
            a.systemCharge,
            nftPoolAmount,
            operationsAmount,
            nftPool,
            operationsWallet
        );

        userLevelActivated[user][level] = true;

        emit ActivationFinancialSummaryRecorded(
            a.activationId,
            user,
            level,
            amount,
            a.systemCharge,
            nftPoolAmount,
            operationsAmount,
            summaryLiquidPaid,
            summaryEscrowLocked,
            summaryRecycleAllocated,
            isAutoUpgrade,
            false
        );

        emit LevelActivated(user, level, amount);
        emit LevelActivatedInOrbit(user, level, a.orbitAddress, amount);

        _maybeTriggerAutoUpgrade(a.sponsor, level);
        _maybeTriggerAutoUpgrade(a.spillover1Recipient, level);
        _maybeTriggerAutoUpgrade(a.spillover2Recipient, level);
        _maybeTriggerAutoUpgrade(a.recycleRecipient, level);
    }

    function _settleRoutedSpillovers(
        uint8 orbitType,
        uint8 level,
        address user,
        address sponsor,
        uint256 activationAmount,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 activationId,
        address spillover1Recipient,
        uint256 toSpillover1,
        address spillover2Recipient,
        uint256 toSpillover2
    ) internal returns (SpilloverSettlementResult memory result) {
        address routedRecipientA = spillover1Recipient;
        uint256 routedAmountA = toSpillover1;

        address routedRecipientB = spillover2Recipient;
        uint256 routedAmountB = toSpillover2;

        if (toSpillover1 > 0 && spillover1Recipient == address(0)) {
            _emitPayoutNotDelivered(
                sponsor,
                user,
                level,
                orbitType,
                sourcePosition,
                sourceCycle,
                toSpillover1,
                address(0),
                0,
                RECEIPT_ROUTED_SPILLOVER,
                ROLE_SPILLOVER1_CODE,
                REASON_ZERO_RECEIVER,
                ACTION_SUPPORT_REVIEW,
                activationId
            );
        }

        if (toSpillover2 > 0 && spillover2Recipient == address(0)) {
            _emitPayoutNotDelivered(
                sponsor,
                user,
                level,
                orbitType,
                sourcePosition,
                sourceCycle,
                toSpillover2,
                address(0),
                0,
                RECEIPT_ROUTED_SPILLOVER,
                ROLE_SPILLOVER2_CODE,
                REASON_ZERO_RECEIVER,
                ACTION_SUPPORT_REVIEW,
                activationId
            );
        }

        uint256 mirrorRuleBaseAmount = (orbitType == 12 || orbitType == 39)
            ? activationAmount
            : routedAmountA;

        address routedParent = (orbitType != 4 && sourcePosition > 3 && routedRecipientA != address(0))
            ? routedRecipientA
            : sponsor;

        MirrorSplitResult memory splitA = _applyMirrorEscrowSplit(
            orbitType,
            level,
            user,
            routedParent,
            sponsor,
            routedRecipientA,
            routedAmountA,
            mirrorRuleBaseAmount,
            activationId
        );

        uint256 mirrorRuleBaseAmountB = (orbitType == 12 || orbitType == 39)
            ? activationAmount
            : routedAmountB;

        MirrorSplitResult memory splitB = _applyMirrorEscrowSplit(
            orbitType,
            level,
            user,
            routedParent,
            sponsor,
            routedRecipientB,
            routedAmountB,
            mirrorRuleBaseAmountB,
            activationId
        );

        _sendPayoutWithContext(
            routedRecipientA,
            splitA.liquidAmount,
            activationId,
            user,
            level,
            REASON_FOUNDER_ROUTE
        );
        _sendPayoutWithContext(
            routedRecipientB,
            splitB.liquidAmount,
            activationId,
            user,
            level,
            REASON_FOUNDER_ROUTE
        );

        uint256 splitAGross = splitA.liquidAmount + splitA.escrowLocked + splitA.recycleAmount;
        uint256 splitBGross = splitB.liquidAmount + splitB.escrowLocked + splitB.recycleAmount;

        _recordRoutedEarning(orbitType, routedRecipientA, level, splitAGross);
        _recordRoutedEarning(orbitType, routedRecipientB, level, splitBGross);

        if (splitA.recycleAmount > 0 && splitA.mirroredPosition > 0) {
            _handleRecycle(
                routedRecipientA,
                level,
                splitA.recycleAmount,
                activationId,
                user,
                splitA.mirroredPosition,
                splitA.mirroredCycle
            );
        }

        if (splitB.recycleAmount > 0 && splitB.mirroredPosition > 0) {
            _handleRecycle(
                routedRecipientB,
                level,
                splitB.recycleAmount,
                activationId,
                user,
                splitB.mirroredPosition,
                splitB.mirroredCycle
            );
        }

        result.liquidPaid = splitA.liquidAmount + splitB.liquidAmount;
        result.escrowLocked = splitA.escrowLocked + splitB.escrowLocked;

        if (routedRecipientA != address(0) && routedAmountA > 0) {
            _recordPayoutReceipt(
                routedRecipientA,
                RECEIPT_ROUTED_SPILLOVER,
                level,
                user,
                sponsor,
                splitAGross,
                splitA.escrowLocked,
                splitA.liquidAmount
            );

            _recordDetailedPayoutReceipt(
                routedRecipientA,
                activationId,
                RECEIPT_ROUTED_SPILLOVER,
                level,
                user,
                sponsor,
                sourcePosition,
                sourceCycle,
                splitA.mirroredPosition,
                splitA.mirroredCycle,
                ROUTED_ROLE_SPILLOVER1,
                splitAGross,
                splitA.escrowLocked,
                splitA.liquidAmount
            );
        }

        if (routedRecipientB != address(0) && routedAmountB > 0) {
            _recordPayoutReceipt(
                routedRecipientB,
                RECEIPT_ROUTED_SPILLOVER,
                level,
                user,
                sponsor,
                splitBGross,
                splitB.escrowLocked,
                splitB.liquidAmount
            );

            _recordDetailedPayoutReceipt(
                routedRecipientB,
                activationId,
                RECEIPT_ROUTED_SPILLOVER,
                level,
                user,
                sponsor,
                sourcePosition,
                sourceCycle,
                splitB.mirroredPosition,
                splitB.mirroredCycle,
                ROUTED_ROLE_SPILLOVER2,
                splitBGross,
                splitB.escrowLocked,
                splitB.liquidAmount
            );
        }
    }

    function _applyMirrorEscrowSplit(
        uint8 orbitType,
        uint8 level,
        address activatingUser,
        address referrer,
        address sponsor,
        address recipient,
        uint256 routedAmount,
        uint256 ruleBaseAmount,
        uint256 activationId
    ) internal returns (MirrorSplitResult memory result) {
        if (recipient == address(0) || routedAmount == 0) {
            return result;
        }

        if (recipient == sponsor) {
            result.liquidAmount = routedAmount;
            return result;
        }

        (
            result.mirroredPosition,
            result.mirroredCycle,
            result.liquidAmount,
            result.escrowLocked,
            result.recycleAmount
        ) = abi.decode(_delegateToSettlementRouterWithResult(abi.encodeCall(
            ILevelSettlementRouter.applyMirrorEscrowSplit,
            (
                orbitType,
                address(p4Orbit),
                address(p12Orbit),
                address(p39Orbit),
                recipient,
                sponsor,
                level,
                activatingUser,
                referrer,
                routedAmount,
                ruleBaseAmount,
                activationId
            )
        )), (uint8, uint32, uint256, uint256, uint256));

        if (result.escrowLocked > 0) {
            _handleLock(recipient, level, result.escrowLocked);
        }
    }

    function _fillOrbitPosition(
        uint8 orbitType,
        address orbitOwner,
        uint8 level,
        address user,
        address referrer,
        uint256 amount,
        uint256 activationId
    )
        internal
        returns (
            uint8 sourcePosition,
            uint32 sourceCycle,
            uint256 toOwner,
            uint256 toSpillover1,
            address spillover1Recipient,
            uint256 toSpillover2,
            address spillover2Recipient,
            uint256 toEscrow,
            uint256 toRecycle
        )
    {
        (
            sourcePosition,
            sourceCycle,
            toOwner,
            toSpillover1,
            spillover1Recipient,
            toSpillover2,
            spillover2Recipient,
            toEscrow,
            toRecycle
        ) = abi.decode(_delegateToSettlementRouterWithResult(abi.encodeCall(
            ILevelSettlementRouter.fillAndRecordStructuralPosition,
            (
                address(registration),
                _getOrbitAddress(orbitType),
                orbitType,
                orbitOwner,
                user,
                referrer,
                level,
                amount,
                activationId
            )
        )), (uint8, uint32, uint256, uint256, address, uint256, address, uint256, uint256));
    }

    function _consumeLegacyRecycleTransition(
        ActivationFlowData memory a,
        uint8 level,
        uint256 activationAmount
    ) internal {
        if (a.toRecycle == 0 || (a.orbitType != 12 && a.orbitType != 39)) return;

        uint256 legacyRecycleAmount = activationAmount - a.systemCharge;
        bool consumed = abi.decode(_delegateToSettlementRouterWithResult(abi.encodeCall(
            ILevelSettlementRouter.consumeLegacyRecycleTransition,
            (a.orbitType, a.sponsor, level, a.sourceCycle)
        )), (bool));
        if (!consumed) return;

        a.toSpillover1 = 0;
        a.toSpillover2 = 0;
        a.toRecycle = legacyRecycleAmount;
    }

    function _recordRoutedEarning(
        uint8 orbitType,
        address recipient,
        uint8 level,
        uint256 amount
    ) internal {
        if (recipient == address(0) || amount == 0) return;

        IManagedOrbit(_getOrbitAddress(orbitType)).recordExternalEarning(recipient, level, amount);
    }

    function _recordPayoutReceipt(
        address receiver,
        uint8 receiptType,
        uint8 level,
        address fromUser,
        address orbitOwner,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    ) internal {
        if (receiver == address(0) || grossAmount == 0) {
            _emitPayoutNotDelivered(
                receiver,
                fromUser,
                level,
                _orbitCodeForLevel(level),
                0,
                0,
                grossAmount,
                receiver,
                liquidPaid,
                receiptType,
                bytes32(0),
                receiver == address(0) ? REASON_ZERO_RECEIVER : REASON_ZERO_AMOUNT,
                ACTION_SUPPORT_REVIEW,
                0
            );
            return;
        }

        emit PayoutReceiptRecorded(
            receiver,
            level,
            receiptType,
            fromUser,
            orbitOwner,
            grossAmount,
            escrowLocked,
            liquidPaid
        );
    }

    function _handleFounderRepActivation(address user, uint8 level) internal {
        founderRepUsed[user] = true;
        founderRepLevelsActivated[user]++;

        if (address(p4Orbit) != address(0)) {
            p4Orbit.setFounderRepActivated(user, true);
        }
        if (address(p12Orbit) != address(0)) {
            p12Orbit.setFounderRepActivated(user, true);
        }
        if (address(p39Orbit) != address(0)) {
            p39Orbit.setFounderRepActivated(user, true);
        }

        uint8 orbitType = _orbitCodeForLevel(level);
        address sponsor = resolveSponsor(user, level);
        _fillOrbitPosition(orbitType, sponsor, level, user, sponsor, 0, 0);

        userLevelActivated[user][level] = true;

        if (tokenController != address(0)) {
            IFreedomTokenController(tokenController).onFounderFreeActivation(user, level, levelPrices(level));
        }

        emit FounderRepActivated(user, level, founderRepLevelsActivated[user]);

        emit ActivationFinancialSummaryRecorded(
            0,
            user,
            level,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            false,
            true
        );

        emit LevelActivated(user, level, 0);

        if (founderRepLevelsActivated[user] == FOUNDER_REP_FREE_LEVEL_LIMIT) {
            founderRepAllLevelsCompleted[user] = true;
        }
    }

    function _splitAmongFounders(
        uint256 amount,
        uint256 activationId,
        address sourceUser,
        uint8 level,
        bytes32 reasonCode
    ) internal {
        if (founderWallets.length != 8 || founderRatios.length != 8) revert InvalidFounderConfig();
        if (amount == 0) return;
        _delegateToSettlementRouter(abi.encodeCall(
            ILevelSettlementRouter.distributeFounders,
            (amount, activationId, sourceUser, level, founderWallets, founderRatios, reasonCode)
        ));
    }

    function _delegateToSettlementRouter(bytes memory data) internal {
        _requireSettlementRouter();
        (bool ok, bytes memory reason) = address(settlementRouter).delegatecall(data);
        if (!ok) _revertWithReason(reason);
    }

    function _delegateToSettlementRouterWithResult(bytes memory data) internal returns (bytes memory result) {
        _requireSettlementRouter();
        bool ok;
        (ok, result) = address(settlementRouter).delegatecall(data);
        if (!ok) _revertWithReason(result);
    }

    function _revertWithReason(bytes memory reason) internal pure {
        if (reason.length == 0) revert SettlementRouterCallFailed();
        assembly ("memory-safe") {
            revert(add(reason, 32), mload(reason))
        }
    }

    function _sendPayoutWithContext(
        address recipient,
        uint256 amount,
        uint256 activationId,
        address sourceUser,
        uint8 level,
        bytes32 reasonCode
    ) internal {
        if (recipient == address(0) || amount == 0) return;

        if (recipient == id1Wallet) {
            _splitAmongFounders(amount, activationId, sourceUser, level, reasonCode);
        } else {
            usdt.safeTransfer(recipient, amount);
        }
    }

    function _handleRecycle(
        address orbitOwner,
        uint8 level,
        uint256 amount,
        uint256 activationId,
        address fromUser,
        uint8 sourcePosition,
        uint32 sourceCycle
    ) internal returns (RecycleResult memory result) {
        uint8 orbitType = _orbitCodeForLevel(level);
        _requireSettlementRouter();

        (
            result.actualRecycleReceiver,
            result.recycleLiquidPaid,
            result.recycleEscrowLocked,
            result.mirrorPosition,
            result.mirrorCycle
        ) = abi.decode(_delegateToSettlementRouterWithResult(abi.encodeCall(
            ILevelSettlementRouter.settleRecycle,
            (
                orbitType,
                address(registration),
                address(p4Orbit),
                address(p12Orbit),
                address(p39Orbit),
                id1Wallet,
                orbitOwner,
                level,
                amount,
                activationId,
                fromUser,
                sourcePosition,
                sourceCycle,
                founderWallets,
                founderRatios
            )
        )), (address, uint256, uint256, uint8, uint32));

        if (result.mirrorPosition != 0 && result.actualRecycleReceiver != id1Wallet) {
            _delegateToSettlementRouter(abi.encodeCall(
                ILevelSettlementRouter.recordStructuralPlacement,
                (
                    address(registration),
                    _getOrbitAddress(orbitType),
                    orbitType,
                    result.actualRecycleReceiver,
                    orbitOwner,
                    level,
                    result.mirrorPosition,
                    result.mirrorCycle
                )
            ));
        }

        result.recycleGross = amount;
        if (result.recycleEscrowLocked > 0 && result.actualRecycleReceiver != id1Wallet) {
            _handleLock(result.actualRecycleReceiver, level, result.recycleEscrowLocked);
        }
    }
    function _handleLock(address beneficiary, uint8 fromLevel, uint256 lockAmount) internal {
        if (fromLevel >= 10 || lockAmount == 0) return;

        uint256 currentAllowance = usdt.allowance(address(this), escrow);
        if (currentAllowance < lockAmount) {
            usdt.forceApprove(escrow, 0);
            usdt.forceApprove(escrow, type(uint256).max);
        }

        IAutoUpgradeEscrow(escrow).lockFunds(
            beneficiary,
            fromLevel,
            fromLevel + 1,
            lockAmount
        );
    }

    function _maybeTriggerAutoUpgrade(address user, uint8 currentLevel) internal {
        if (user == address(0)) return;
        if (user == id1Wallet) return;
        if (currentLevel == MAX_LEVEL) return;
        if (userLevelActivated[user][currentLevel + 1]) return;
        if (autoUpgradeExecutionDepth != 0) {
            pendingAutoUpgradeChecks.push(PendingAutoUpgradeCheck(user, currentLevel));
            return;
        }

        uint256 requiredAmount = _getUpgradeRequirement(currentLevel);
        uint256 lockedAmount = IAutoUpgradeEscrow(escrow).getLockedAmount(user, currentLevel, currentLevel + 1);

        if (lockedAmount >= requiredAmount) {
            autoUpgradeExecutionDepth = 1;
            IAutoUpgradeEscrow(escrow).releaseAmountForUpgrade(
                user,
                currentLevel,
                currentLevel + 1,
                address(this),
                requiredAmount
            );
            _settleOrbitEscrow(user, currentLevel);

            uint256 upgradeActivationId = nextActivationId;
            _processLevelActivation(user, currentLevel + 1, requiredAmount, true);

            registration.triggerAutoUpgrade(user, currentLevel);

            if (tokenController != address(0)) {
                IFreedomTokenController(tokenController).onAutoUpgradeActivation(
                    user,
                    currentLevel + 1,
                    requiredAmount
                );
            }

            emit AutoUpgradeTriggered(user, currentLevel, currentLevel + 1);
            uint256 escrowAfter = IAutoUpgradeEscrow(escrow).getLockedAmount(user, currentLevel, currentLevel + 1);
            emit AutoUpgradeCompleted(
                upgradeActivationId,
                user,
                currentLevel,
                currentLevel + 1,
                requiredAmount,
                requiredAmount,
                lockedAmount,
                escrowAfter
            );
            autoUpgradeExecutionDepth = 0;
            _drainPendingAutoUpgradeChecks();
        }
    }

    function _drainPendingAutoUpgradeChecks() internal {
        if (drainingAutoUpgradeChecks) return;
        drainingAutoUpgradeChecks = true;

        while (pendingAutoUpgradeChecks.length > 0) {
            PendingAutoUpgradeCheck memory pending = pendingAutoUpgradeChecks[
                pendingAutoUpgradeChecks.length - 1
            ];
            pendingAutoUpgradeChecks.pop();
            _maybeTriggerAutoUpgrade(pending.user, pending.level);
        }

        drainingAutoUpgradeChecks = false;
    }

    function _settleOrbitEscrow(address user, uint8 level) internal {
        uint8 orbitType = _orbitCodeForLevel(level);
        IManagedOrbit(_getOrbitAddress(orbitType)).settleEscrowState(user, level);
    }

    function _getOrbitAddress(uint8 orbitType) internal view returns (address) {
        if (orbitType == 4) {
            return address(p4Orbit);
        } else if (orbitType == 12) {
            return address(p12Orbit);
        } else if (orbitType == 39) {
            return address(p39Orbit);
        }
        revert InvalidOrbitType();
    }

    function _orbitCodeForLevel(uint8 level) internal pure returns (uint8) {
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel();
        uint8 remainder = level % 3;
        if (remainder == 1) return 4;
        if (remainder == 2) return 12;
        return 39;
    }

    function _getUpgradeRequirement(uint8 level) internal pure returns (uint256) {
        return uint256(20 * 10**6) << (level - 1);
    }

    function onOrbitRecycleCompleted(
        address orbitOwner,
        uint8 level,
        uint256 recycleReward
    ) external {
        if (
            msg.sender != address(p4Orbit) &&
            msg.sender != address(p12Orbit) &&
            msg.sender != address(p39Orbit)
        ) revert OnlyOrbitContracts();

        if (tokenController != address(0)) {
            try IFreedomTokenController(tokenController).onRecycleCompleted(orbitOwner, level, recycleReward) {
            } catch Error(string memory reason) {
                reason;
                revert TokenRewardFailed();
            } catch {
                revert TokenRewardFailed();
            }
        }
    }

    function getAutoUpgradeStatus(address user, uint8 fromLevel)
        external
        view
        returns (
            uint256 requiredAmount,
            uint256 currentLocked,
            uint256 remainingAmount,
            bool nextLevelActivated
        )
    {
        if (user == address(0)) revert InvalidAddress();
        if (fromLevel < MIN_LEVEL || fromLevel >= MAX_LEVEL) revert InvalidLevel();

        uint8 toLevel;

        unchecked {
            toLevel = fromLevel + 1;
        }

        requiredAmount = _getUpgradeRequirement(fromLevel);
        currentLocked = IAutoUpgradeEscrow(escrow).getLockedAmount(user, fromLevel, toLevel);
        nextLevelActivated = userLevelActivated[user][toLevel];

        if (nextLevelActivated || currentLocked >= requiredAmount) {
            remainingAmount = 0;
        } else {
            remainingAmount = requiredAmount - currentLocked;
        }
    }

    function setFounderRepInOrbits(address user, bool status) external onlyOwner {
        if (address(p4Orbit) != address(0)) {
            p4Orbit.setFounderRepActivated(user, status);
        }
        if (address(p12Orbit) != address(0)) {
            p12Orbit.setFounderRepActivated(user, status);
        }
        if (address(p39Orbit) != address(0)) {
            p39Orbit.setFounderRepActivated(user, status);
        }
    }

    function _recordDetailedPayoutReceipt(
        address receiver,
        uint256 activationId,
        uint8 receiptType,
        uint8 level,
        address fromUser,
        address orbitOwner,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint8 mirroredPosition,
        uint32 mirroredCycle,
        uint8 routedRole,
        uint256 grossAmount,
        uint256 escrowLocked,
        uint256 liquidPaid
    ) internal {
        if (receiver == address(0) || grossAmount == 0) {
            _emitPayoutNotDelivered(
                receiver,
                fromUser,
                level,
                _orbitCodeForLevel(level),
                sourcePosition,
                sourceCycle,
                grossAmount,
                receiver,
                liquidPaid,
                receiptType,
                bytes32(0),
                receiver == address(0) ? REASON_ZERO_RECEIVER : REASON_ZERO_AMOUNT,
                ACTION_SUPPORT_REVIEW,
                activationId
            );
            return;
        }

        emit DetailedPayoutReceiptRecorded(
            receiver,
            activationId,
            level,
            receiptType,
            fromUser,
            orbitOwner,
            sourcePosition,
            sourceCycle,
            mirroredPosition,
            mirroredCycle,
            routedRole,
            grossAmount,
            escrowLocked,
            liquidPaid
        );
    }

    function _emitPayoutNotDelivered(
        address affectedUser,
        address sourceUser,
        uint8 level,
        uint8 orbitType,
        uint8 sourcePosition,
        uint32 sourceCycle,
        uint256 expectedAmount,
        address actualReceiver,
        uint256 actualAmount,
        uint8 receiptType,
        bytes32 routedRole,
        bytes32 reasonCode,
        bytes32 actionCode,
        uint256 activationId
    ) internal {
        emit PayoutNotDelivered(
            affectedUser,
            sourceUser,
            level,
            orbitType,
            sourcePosition,
            sourceCycle,
            expectedAmount,
            actualReceiver,
            actualAmount,
            receiptType,
            routedRole,
            reasonCode,
            actionCode,
            activationId
        );
    }

    address[] public founderRepWallets;
    uint256 private autoUpgradeExecutionDepth;
    PendingAutoUpgradeCheck[] private pendingAutoUpgradeChecks;
    bool private drainingAutoUpgradeChecks;

    uint256[45] private __gap;
}
