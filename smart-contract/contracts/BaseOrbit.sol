// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "./interfaces/IOrbitState.sol";
import "./interfaces/IRegistration.sol";

interface ILevelManagerReader {
    function id1Wallet() external view returns (address);
    function onOrbitRecycleCompleted(address orbitOwner, uint8 level, uint256 recycleReward) external;
}

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

abstract contract BaseOrbit is Initializable, OwnableUpgradeable, UUPSUpgradeable, PausableUpgradeable, IOrbitState {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    error OnlyLevelManager(address caller);
    error InvalidLevel();
    error InvalidAddress();
    error InvalidContract();
    error GuardianNotSet();
    error UpgradeBlocked();
    error OrbitFull();
    error ReentryTargetNotEmpty();
    error InvalidPosition();
    error HistoricalCycleNotFound();
    error UplineSearchTooDeep(address startUser, uint8 level);
    error DuplicateOrbitPosition(address orbitOwner, uint8 level, address user);

    address public levelManager;
    address public escrow;
    address public registration;
    address public guardian;

    mapping(address => mapping(uint8 => OrbitData)) public userOrbits;
    mapping(uint8 => OrbitConfig) public levelConfig;
    mapping(address => bool) public founderRepActivated;

    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => Position)))) internal historicalCyclePositions;
    mapping(address => mapping(uint8 => mapping(uint256 => bool))) internal historicalCycleStored;

    // linePaymentCounts[user][level][line] => how many qualifying arrivals have landed in that line
    mapping(address => mapping(uint8 => mapping(uint8 => uint8))) internal linePaymentCounts;

    // positionLineArrivalNumber[user][level][position] => qualifying arrival number inside that line
    mapping(address => mapping(uint8 => mapping(uint8 => uint8))) internal positionLineArrivalNumber;

    // historicalPositionLineArrivalNumber[user][level][cycleNumber][position]
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => uint8)))) internal historicalPositionLineArrivalNumber;

    // activation metadata
    mapping(address => mapping(uint8 => mapping(uint8 => uint256))) internal positionActivationId;
    mapping(address => mapping(uint8 => mapping(uint8 => bool))) internal positionIsMirror;

    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => uint256)))) internal historicalPositionActivationId;
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => bool)))) internal historicalPositionIsMirror;

    uint8 internal constant MIN_LEVEL = 1;
    uint8 internal constant MAX_LEVEL = 10;
    uint8 internal constant MAX_UPLINE_SEARCH_DEPTH = 64;

    /**
     * @dev Exact executed payout snapshot for a position.
     * This is the core permanent fix for frontend truthfulness.
     */
    struct StoredRuleSnapshot {
        bool exists;
        uint8 line;
        uint8 linePaymentNumber;
        bool autoUpgradeEnabled;
        bool isFounderNoReferrerPath;
        uint256 toOwner;
        uint256 toSpillover1;
        uint256 toSpillover2;
        uint256 toEscrow;
        uint256 toRecycle;
        address spillover1Recipient;
        address spillover2Recipient;
    }

    /**
     * @dev Struct to hold all parameters for storing a rule snapshot.
     * This solves the stack-too-deep error by reducing function parameters from 14 to 1.
     */
    struct RuleSnapshotData {
        address orbitOwner;
        uint8 level;
        uint8 position;
        uint8 line;
        uint8 linePaymentNumber;
        bool autoUpgradeEnabled;
        bool isFounderNoReferrerPath;
        uint256 toOwner;
        uint256 toSpillover1;
        uint256 toSpillover2;
        uint256 toEscrow;
        uint256 toRecycle;
        address spillover1Recipient;
        address spillover2Recipient;
    }

    /**
     * @dev Struct to hold return values for fillPositionDetailed to solve stack-too-deep error.
     */
    struct FillPositionDetailedResult {
        uint8 sourcePosition;
        uint32 sourceCycle;
        uint256 toOwner;
        uint256 toSpillover1;
        address spillover1Recipient;
        uint256 toSpillover2;
        address spillover2Recipient;
        uint256 toEscrow;
        uint256 toRecycle;
    }

    /**
     * @dev Struct to hold return values for mirrorPositionDetailed to solve stack-too-deep error.
     */
    struct MirrorPositionDetailedResult {
        uint8 position;
        uint32 cycleNumber;
        uint256 mirrorOwnerLiquidAmount;
        uint256 mirrorEscrowLockAmount;
        uint256 mirrorRecycleAmount;
    }

    // live snapshots
    mapping(address => mapping(uint8 => mapping(uint8 => StoredRuleSnapshot))) internal storedRuleSnapshots;

    // historical snapshots
    mapping(address => mapping(uint8 => mapping(uint256 => mapping(uint8 => StoredRuleSnapshot)))) internal historicalStoredRuleSnapshots;

    event LinePaymentTracked(
        address indexed orbitOwner,
        uint8 indexed level,
        uint8 indexed line,
        uint8 position,
        uint8 linePaymentNumber
    );

    event PaymentRuleApplied(
        address indexed orbitOwner,
        uint8 indexed level,
        uint8 indexed position,
        uint8 line,
        uint8 linePaymentNumber,
        uint256 toOwner,
        uint256 toSpillover1,
        uint256 toSpillover2,
        uint256 toEscrow,
        uint256 toRecycle
    );

    event PositionActivationLinked(
        address indexed orbitOwner,
        uint8 indexed level,
        uint8 indexed position,
        uint32 cycleNumber,
        uint256 activationId,
        bool isMirror
    );

    event OrbitDependencyUpdated(
        string indexed dependency,
        address indexed oldAddress,
        address indexed newAddress
    );

    modifier onlyLevelManager() {
        if (msg.sender != levelManager) revert OnlyLevelManager(msg.sender);
        _;
    }

    modifier onlyValidLevel(uint8 level) {
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel();
        _;
    }


    function __BaseOrbit_init(
        address _levelManager,
        address _escrow,
        address _registration,
        address _guardian
    ) internal onlyInitializing {
        if (
            _levelManager == address(0) ||
            _escrow == address(0) ||
            _registration == address(0) ||
            _guardian == address(0)
        ) revert InvalidAddress();

        if (
            _levelManager.code.length == 0 ||
            _escrow.code.length == 0 ||
            _registration.code.length == 0 ||
            _guardian.code.length == 0
        ) revert InvalidContract();

        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __Pausable_init();

        levelManager = _levelManager;
        escrow = _escrow;
        registration = _registration;
        guardian = _guardian;
    }

    function _requireContract(address target, string memory message) internal view {
        message;
        if (target == address(0)) revert InvalidAddress();
        if (target.code.length == 0) revert InvalidContract();
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        _requireContract(newImplementation, "Invalid implementation");

        address currentGuardian = guardian;
        if (currentGuardian == address(0)) revert GuardianNotSet();
        if (!IGuardian(currentGuardian).validateUpgrade(address(this), newImplementation)) revert UpgradeBlocked();
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }


    function getOrbitType() external view virtual returns (string memory);
    function getOrbitConfig(uint8 level) external view virtual returns (OrbitConfig memory);

    

    function _calculatePayoutPercentages(
        uint8 level,
        uint8 position,
        uint8 line,
        uint8 linePaymentNumber,
        bool autoUpgradeEnabled
    ) internal view virtual returns (PayoutPercentages memory);

    function _isEscrowWindowSimple(
    uint8 level,
    uint8 position,
    uint8 line,
    uint8 linePaymentNumber,
    bool autoUpgradeEnabled
) internal view returns (bool) {
    PayoutPercentages memory pct = _calculatePayoutPercentages(
        level,
        position,
        line,
        linePaymentNumber,
        autoUpgradeEnabled
    );

    return pct.toEscrow > 0;
}

    function _resolveRecipients(
        address orbitOwner,
        uint8 level,
        uint8 position
    ) internal view virtual returns (address spillover1Recipient, address spillover2Recipient);

    function _initializeOrbitIfNeeded(address orbitOwner, uint8 level) internal {
        OrbitData storage orbit = userOrbits[orbitOwner][level];

        if (!orbit.isActive) {
            orbit.isActive = true;
            orbit.currentPosition = 1;
            orbit.autoUpgradeCompleted = false;
            orbit.escrowBalance = 0;
            orbit.totalCycles = 0;
            orbit.positionsInLine1 = 0;
            orbit.positionsInLine2 = 0;
            orbit.positionsInLine3 = 0;
        }
    }

    function _getLineFromPosition(uint8 position, OrbitConfig memory config) internal pure returns (uint8) {
        if (config.lines == 1) {
            return 1;
        } else if (config.lines == 2) {
            return position <= config.line1Size ? 1 : 2;
        } else {
            if (position <= config.line1Size) return 1;
            if (position <= config.line1Size + config.line2Size) return 2;
            return 3;
        }
    }

    function _findEligibleUpline(address user, uint8 level) internal view returns (address) {
        address current = IRegistration(registration).getReferrer(user);
        uint8 depth = 0;

        while (current != address(0)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(user, level);

            if (IRegistration(registration).isLevelActivated(current, level)) {
                return current;
            }
            current = IRegistration(registration).getReferrer(current);

            unchecked {
                ++depth;
            }
        }

        return ILevelManagerReader(levelManager).id1Wallet();
    }



        /**
     * @dev NEW: Structural sponsor resolution for forced-matrix behaviour
     * Returns the highest (farthest) upline that has the level activated.
     * This allows I to fill Line 3 under E inside A's orbit even if E already activated Level 3.
     */
    function _findStructuralSponsor(address newUser, uint8 level) internal view returns (address) {
        address current = IRegistration(registration).getReferrer(newUser);
        address sponsor = ILevelManagerReader(levelManager).id1Wallet();
        uint8 depth = 0;

        while (current != address(0)) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(newUser, level);

            if (IRegistration(registration).isLevelActivated(current, level)) {
                sponsor = current;   // keep updating → we want the highest one in the chain
            }
            current = IRegistration(registration).getReferrer(current);

            unchecked {
                ++depth;
            }
        }
        return sponsor;
    }

    /**
     * @dev Determines if auto-upgrade should be active for this orbit.
     * Auto-upgrade is enabled for the FIRST CYCLE ONLY when:
     * 1. The orbit owner has activated this level
     * 2. The orbit owner has NOT activated the next level yet
     * 3. This is the first cycle (autoUpgradeCompleted == false)
     */
    function _isAutoUpgradeEnabled(address orbitOwner, uint8 level) internal view returns (bool) {
        // Level 10 has no auto-upgrade
        if (level >= 10) {
            return false;
        }

        // Check cheapest conditions first
        OrbitData storage orbit = userOrbits[orbitOwner][level];
        if (orbit.autoUpgradeCompleted) {
            return false;
        }

        // Check if orbit owner has activated this level
        if (!IRegistration(registration).isLevelActivated(orbitOwner, level)) {
            return false;
        }

        // Check if next level is already activated (manual override)
        if (IRegistration(registration).isLevelActivated(orbitOwner, level + 1)) {
            return false;
        }

        // Auto-upgrade enabled for first cycle only
        return true;
    }

    function _findUserPosition(
        address orbitOwner,
        uint8 level,
        address targetUser
    ) internal view returns (uint8) {
        if (targetUser == address(0)) return 0;

        OrbitData storage orbit = userOrbits[orbitOwner][level];
        OrbitConfig memory config = levelConfig[level];
        uint8 totalPositions = config.totalPositions;

        for (uint8 i = 1; i <= totalPositions; ) {
            if (orbit.positions[i].user == targetUser) {
                return i;
            }

            unchecked {
                ++i;
            }
        }

        return 0;
    }

    function _findFirstEmptyInRange(
        OrbitData storage orbit,
        uint8 start,
        uint8 end
    ) internal view returns (uint8) {
        for (uint8 i = start; i <= end; ) {
            if (orbit.positions[i].user == address(0)) {
                return i;
            }

            unchecked {
                ++i;
            }
        }
        return 0;
    }

    function _findChildPosition(
        OrbitData storage orbit,
        OrbitConfig memory config,
        uint8 parentPosition
    ) internal view returns (uint8) {
        if (config.lines == 2) {
            if (parentPosition == 1) {
                if (orbit.positions[4].user == address(0)) return 4;
                if (orbit.positions[7].user == address(0)) return 7;
                if (orbit.positions[10].user == address(0)) return 10;
            } else if (parentPosition == 2) {
                if (orbit.positions[5].user == address(0)) return 5;
                if (orbit.positions[8].user == address(0)) return 8;
                if (orbit.positions[11].user == address(0)) return 11;
            } else if (parentPosition == 3) {
                if (orbit.positions[6].user == address(0)) return 6;
                if (orbit.positions[9].user == address(0)) return 9;
                if (orbit.positions[12].user == address(0)) return 12;
            }
        } else if (config.lines == 3) {
            if (parentPosition >= 1 && parentPosition <= 3) {
                if (parentPosition == 1) {
                    if (orbit.positions[4].user == address(0)) return 4;
                    if (orbit.positions[7].user == address(0)) return 7;
                    if (orbit.positions[10].user == address(0)) return 10;
                } else if (parentPosition == 2) {
                    if (orbit.positions[5].user == address(0)) return 5;
                    if (orbit.positions[8].user == address(0)) return 8;
                    if (orbit.positions[11].user == address(0)) return 11;
                } else if (parentPosition == 3) {
                    if (orbit.positions[6].user == address(0)) return 6;
                    if (orbit.positions[9].user == address(0)) return 9;
                    if (orbit.positions[12].user == address(0)) return 12;
                }
            } else if (parentPosition >= 4 && parentPosition <= 12) {
                uint8 firstChild = 13 + (parentPosition - 4);
                if (orbit.positions[firstChild].user == address(0)) return firstChild;
                if (orbit.positions[firstChild + 9].user == address(0)) return firstChild + 9;
                if (orbit.positions[firstChild + 18].user == address(0)) return firstChild + 18;
            }
        }

        return 0;
    }

    function _afterPositionPlaced(
        address orbitOwner,
        uint8 level,
        address user,
        uint8 position
    ) internal virtual {
        orbitOwner;
        level;
        user;
        position;
    }

    function _findPlacementPosition(
        address orbitOwner,
        uint8 level,
        address newUser,
        address placementReferrer
    ) internal view returns (uint8) {
        OrbitData storage orbit = userOrbits[orbitOwner][level];
        OrbitConfig memory config = levelConfig[level];

        if (config.lines == 1) {
            uint8 seq = _findFirstEmptyInRange(orbit, 1, config.totalPositions);
            if (seq == 0) revert OrbitFull();
            return seq;
        }

        address current = placementReferrer;
        uint8 depth = 0;

        while (current != address(0) && current != orbitOwner) {
            if (depth >= MAX_UPLINE_SEARCH_DEPTH) revert UplineSearchTooDeep(newUser, level);

            uint8 ancestorPosition = _findUserPosition(orbitOwner, level, current);

            if (ancestorPosition != 0) {
                uint8 childPosition = _findChildPosition(orbit, config, ancestorPosition);
                if (childPosition != 0) {
                    return childPosition;
                }
            }

            current = IRegistration(registration).getReferrer(current);

            unchecked {
                ++depth;
            }
        }

        uint8 line1Position = _findFirstEmptyInRange(orbit, 1, config.line1Size);
        if (line1Position != 0) {
            return line1Position;
        }

        uint8 fallbackPosition = _findFirstEmptyInRange(orbit, 1, config.totalPositions);
        if (fallbackPosition == 0) revert OrbitFull();
        return fallbackPosition;
    }

    function _placeUserInOrbit(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount
    ) internal returns (uint8 position) {
        return _placeUserInOrbitDetailed(
            orbitOwner,
            level,
            newUser,
            referrer,
            amount,
            0,
            false
        );
    }

    function _placeUserInOrbitDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 activationId,
        bool isMirror
    ) internal returns (uint8 position) {
        _initializeOrbitIfNeeded(orbitOwner, level);

        OrbitData storage orbit = userOrbits[orbitOwner][level];
        OrbitConfig memory config = levelConfig[level];

        uint8 existingPosition = _findUserPosition(orbitOwner, level, newUser);
        if (existingPosition != 0) {
            return existingPosition;
        }

        address placementReferrer = isMirror
            ? referrer
            : IRegistration(registration).getReferrer(newUser);

        position = _findPlacementPosition(orbitOwner, level, newUser, placementReferrer);

        orbit.positions[position] = Position({
            user: newUser,
            amount: amount,
            timestamp: block.timestamp,
            referrer: referrer,
            isActive: true
        });

        _afterPositionPlaced(orbitOwner, level, newUser, position);

        positionActivationId[orbitOwner][level][position] = activationId;
        positionIsMirror[orbitOwner][level][position] = isMirror;

        emit PositionActivationLinked(
            orbitOwner,
            level,
            position,
            uint32(orbit.totalCycles + 1),
            activationId,
            isMirror
        );

        uint8 line = _getLineFromPosition(position, config);
        if (line == 1) {
            unchecked { orbit.positionsInLine1++; }
        } else if (line == 2) {
            unchecked { orbit.positionsInLine2++; }
        } else {
            unchecked { orbit.positionsInLine3++; }
        }

        orbit.currentPosition = _syncCurrentPosition(orbit, config);
    }



    function _placeReentryInOrbitDetailed(
    address orbitOwner,
    uint8 level,
    address newUser,
    address referrer,
    uint256 amount,
    uint256 activationId,
    bool isMirror
) internal returns (uint8 position) {
    _initializeOrbitIfNeeded(orbitOwner, level);

    OrbitData storage orbit = userOrbits[orbitOwner][level];
    OrbitConfig memory config = levelConfig[level];

    // IMPORTANT:
    // Re-entry must NOT reuse old position.
    // It must occupy a fresh available slot in the orbit.
    position = _findPlacementPosition(
        orbitOwner,
        level,
        newUser,
        IRegistration(registration).getReferrer(newUser)
    );

    if (orbit.positions[position].user != address(0)) revert ReentryTargetNotEmpty();

    orbit.positions[position] = Position({
        user: newUser,
        amount: amount,
        timestamp: block.timestamp,
        referrer: referrer,
        isActive: true
    });

    _afterPositionPlaced(orbitOwner, level, newUser, position);

    positionActivationId[orbitOwner][level][position] = activationId;
    positionIsMirror[orbitOwner][level][position] = isMirror;

    emit PositionActivationLinked(
        orbitOwner,
        level,
        position,
        uint32(orbit.totalCycles + 1),
        activationId,
        isMirror
    );

    uint8 line = _getLineFromPosition(position, config);
    if (line == 1) {
        unchecked { orbit.positionsInLine1++; }
    } else if (line == 2) {
        unchecked { orbit.positionsInLine2++; }
    } else {
        unchecked { orbit.positionsInLine3++; }
    }

    orbit.currentPosition = _syncCurrentPosition(orbit, config);
}

    function _syncCurrentPosition(
        OrbitData storage orbit,
        OrbitConfig memory config
    ) internal view returns (uint8) {
        uint8 totalPositions = config.totalPositions;
        for (uint8 i = 1; i <= totalPositions; ) {
            if (orbit.positions[i].user == address(0)) {
                return i;
            }

            unchecked {
                ++i;
            }
        }
        return totalPositions + 1;
    }

    function _trackQualifyingArrival(
        address orbitOwner,
        uint8 level,
        uint8 position,
        uint8 line,
        bool qualifies
    ) internal returns (uint8 linePaymentNumber) {
        if (!qualifies) {
            return 0;
        }

        unchecked {
            linePaymentCounts[orbitOwner][level][line] += 1;
            linePaymentNumber = linePaymentCounts[orbitOwner][level][line];
            positionLineArrivalNumber[orbitOwner][level][position] = linePaymentNumber;
        }

        emit LinePaymentTracked(
            orbitOwner,
            level,
            line,
            position,
            linePaymentNumber
        );
    }

    function _calculateActualAmounts(
        uint256 amount,
        PayoutPercentages memory pct,
        address spillover1Recipient,
        address spillover2Recipient
    )
        internal
        pure
        returns (
            uint256 toOwner,
            uint256 toSpillover1,
            uint256 toSpillover2,
            uint256 toEscrow,
            uint256 toRecycle
        )
    {
        toOwner = (amount * pct.toOwner) / 100;
        toSpillover1 = spillover1Recipient == address(0) ? 0 : (amount * pct.toSpillover1) / 100;
        toSpillover2 = spillover2Recipient == address(0) ? 0 : (amount * pct.toSpillover2) / 100;
        toEscrow = (amount * pct.toEscrow) / 100;
        toRecycle = (amount * pct.toRecycle) / 100;
    }

    function _isHistoricalEscrowWindow(
        uint8 level,
        uint8 position,
        uint8 line,
        uint8 linePaymentNumber
    ) internal view returns (bool) {
        PayoutPercentages memory pct = _calculatePayoutPercentages(
            level,
            position,
            line,
            linePaymentNumber,
            true
        );
        return pct.toEscrow > 0;
    }


    /**
     * @dev Stores a rule snapshot using a struct to avoid stack-too-deep error.
     */
    function _storeRuleSnapshot(RuleSnapshotData memory data) internal {
        storedRuleSnapshots[data.orbitOwner][data.level][data.position] = StoredRuleSnapshot({
            exists: true,
            line: data.line,
            linePaymentNumber: data.linePaymentNumber,
            autoUpgradeEnabled: data.autoUpgradeEnabled,
            isFounderNoReferrerPath: data.isFounderNoReferrerPath,
            toOwner: data.toOwner,
            toSpillover1: data.toSpillover1,
            toSpillover2: data.toSpillover2,
            toEscrow: data.toEscrow,
            toRecycle: data.toRecycle,
            spillover1Recipient: data.spillover1Recipient,
            spillover2Recipient: data.spillover2Recipient
        });
    }

    function _deleteRuleSnapshot(
        address orbitOwner,
        uint8 level,
        uint8 position
    ) internal {
        delete storedRuleSnapshots[orbitOwner][level][position];
    }

    function _snapshotToPositionRuleView(
        uint8 position,
        StoredRuleSnapshot memory snap
    ) internal pure returns (PositionRuleView memory viewData) {
        viewData = PositionRuleView({
            position: position,
            line: snap.line,
            linePaymentNumber: snap.linePaymentNumber,
            autoUpgradeEnabled: snap.autoUpgradeEnabled,
            isFounderNoReferrerPath: snap.isFounderNoReferrerPath,
            toOwner: snap.toOwner,
            toSpillover1: snap.toSpillover1,
            toSpillover2: snap.toSpillover2,
            toEscrow: snap.toEscrow,
            toRecycle: snap.toRecycle,
            spillover1Recipient: snap.spillover1Recipient,
            spillover2Recipient: snap.spillover2Recipient
        });
    }

    function _snapshotToHistoricalPositionRuleView(
        uint256 cycleNumber,
        uint8 position,
        StoredRuleSnapshot memory snap
    ) internal pure returns (HistoricalPositionRuleView memory viewData) {
        viewData = HistoricalPositionRuleView({
            cycleNumber: cycleNumber,
            position: position,
            line: snap.line,
            linePaymentNumber: snap.linePaymentNumber,
            autoUpgradeEnabled: snap.autoUpgradeEnabled,
            hasStoredRuleData: snap.exists,
            toOwner: snap.toOwner,
            toSpillover1: snap.toSpillover1,
            toSpillover2: snap.toSpillover2,
            toEscrow: snap.toEscrow,
            toRecycle: snap.toRecycle,
            spillover1Recipient: snap.spillover1Recipient,
            spillover2Recipient: snap.spillover2Recipient
        });
    }

    /**
     * @dev Records earnings that arrive through routed payout paths
     * (spillover, recycle, founder-path net payout).
     */
    function recordExternalEarning(
        address orbitOwner,
        uint8 level,
        uint256 amount
    ) external whenNotPaused onlyLevelManager onlyValidLevel(level) {
        if (orbitOwner == address(0) || amount == 0) return;

        _initializeOrbitIfNeeded(orbitOwner, level);
        userOrbits[orbitOwner][level].totalEarned += amount;
    }

    function _handleOrbitFull(address orbitOwner, uint8 level) internal {
        OrbitData storage orbit = userOrbits[orbitOwner][level];
        OrbitConfig memory config = levelConfig[level];

        unchecked { orbit.totalCycles++; }
        emit OrbitReset(orbitOwner, level, orbit.totalCycles);

        if (!historicalCycleStored[orbitOwner][level][orbit.totalCycles]) {
            uint8 historicalTotalPositions = config.totalPositions;
            for (uint8 i = 1; i <= historicalTotalPositions; ) {
                historicalCyclePositions[orbitOwner][level][orbit.totalCycles][i] = orbit.positions[i];
                historicalPositionLineArrivalNumber[orbitOwner][level][orbit.totalCycles][i] =
                    positionLineArrivalNumber[orbitOwner][level][i];

                historicalPositionActivationId[orbitOwner][level][orbit.totalCycles][i] =
                    positionActivationId[orbitOwner][level][i];
                historicalPositionIsMirror[orbitOwner][level][orbit.totalCycles][i] =
                    positionIsMirror[orbitOwner][level][i];

                historicalStoredRuleSnapshots[orbitOwner][level][orbit.totalCycles][i] =
                    storedRuleSnapshots[orbitOwner][level][i];

                unchecked {
                    ++i;
                }
            }
            historicalCycleStored[orbitOwner][level][orbit.totalCycles] = true;
        }

        uint8 totalPositions = config.totalPositions;
        for (uint8 i = 1; i <= totalPositions; ) {
            delete orbit.positions[i];
            delete orbit.positionAbove[i];
            delete positionLineArrivalNumber[orbitOwner][level][i];
            delete positionActivationId[orbitOwner][level][i];
            delete positionIsMirror[orbitOwner][level][i];
            _deleteRuleSnapshot(orbitOwner, level, i);

            unchecked {
                ++i;
            }
        }

        orbit.currentPosition = 1;
        orbit.positionsInLine1 = 0;
        orbit.positionsInLine2 = 0;
        orbit.positionsInLine3 = 0;

        delete linePaymentCounts[orbitOwner][level][1];
        delete linePaymentCounts[orbitOwner][level][2];
        delete linePaymentCounts[orbitOwner][level][3];

        uint256 recycleReward = config.levelPrice / 2;
        if (recycleReward > 0) {
            ILevelManagerReader(levelManager).onOrbitRecycleCompleted(
                orbitOwner,
                level,
                recycleReward
            );
        }
    }

    function settleEscrowState(
        address orbitOwner,
        uint8 level
    ) external onlyLevelManager {
        OrbitData storage orbit = userOrbits[orbitOwner][level];
        orbit.escrowBalance = 0;
        orbit.autoUpgradeCompleted = true;
        emit EscrowUpdated(orbitOwner, level, 0);
    }

    function getUserOrbit(address user, uint8 level)
        external
        view
        returns (
            uint8 currentPosition,
            uint256 escrowBalance,
            bool autoUpgradeCompleted,
            uint8 positionsInLine1,
            uint8 positionsInLine2,
            uint8 positionsInLine3,
            uint256 totalCycles,
            uint256 totalEarned
        )
    {
        OrbitData storage orbit = userOrbits[user][level];
        return (
            orbit.currentPosition,
            orbit.escrowBalance,
            orbit.autoUpgradeCompleted,
            orbit.positionsInLine1,
            orbit.positionsInLine2,
            orbit.positionsInLine3,
            orbit.totalCycles,
            orbit.totalEarned
        );
    }

    function getLinePaymentCounts(address user, uint8 level)
        external
        view
        returns (
            uint8 line1Count,
            uint8 line2Count,
            uint8 line3Count
        )
    {
        return (
            linePaymentCounts[user][level][1],
            linePaymentCounts[user][level][2],
            linePaymentCounts[user][level][3]
        );
    }

    function getPositionLineArrivalNumber(address user, uint8 level, uint8 position)
        external
        view
        returns (uint8)
    {
        return positionLineArrivalNumber[user][level][position];
    }

    function getHistoricalPositionLineArrivalNumber(
        address user,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) external view returns (uint8) {
        return historicalPositionLineArrivalNumber[user][level][cycleNumber][position];
    }

    /**
     * @dev Exact live rule data for a current position.
     * Returns the executed snapshot first.
     * Falls back to recomputation only if snapshot is missing.
     */
    function getPositionRuleView(
        address orbitOwner,
        uint8 level,
        uint8 position
    ) external view onlyValidLevel(level) returns (PositionRuleView memory viewData) {
        OrbitConfig memory config = levelConfig[level];
        if (position < 1 || position > config.totalPositions) revert InvalidPosition();

        StoredRuleSnapshot memory snap = storedRuleSnapshots[orbitOwner][level][position];
        if (snap.exists) {
            return _snapshotToPositionRuleView(position, snap);
        }

        // fallback path for old data only
        uint8 line = _getLineFromPosition(position, config);
        uint8 linePaymentNumber = positionLineArrivalNumber[orbitOwner][level][position];
        bool autoUpgradeEnabled = _isAutoUpgradeEnabled(orbitOwner, level);

        Position storage pos = userOrbits[orbitOwner][level].positions[position];
        address id1Wallet = ILevelManagerReader(levelManager).id1Wallet();

        bool isFounderNoReferrerPath = (
            orbitOwner == id1Wallet &&
            pos.user != address(0) &&
            IRegistration(registration).hadNoReferrer(pos.user)
        );

        address spillover1Recipient = address(0);
        address spillover2Recipient = address(0);
        uint256 toOwner = 0;
        uint256 toSpillover1 = 0;
        uint256 toSpillover2 = 0;
        uint256 toEscrow = 0;
        uint256 toRecycle = 0;

        if (isFounderNoReferrerPath) {
            toOwner = pos.amount;
        } else if (linePaymentNumber > 0 && pos.user != address(0)) {
            PayoutPercentages memory pct = _calculatePayoutPercentages(
                level,
                position,
                line,
                linePaymentNumber,
                autoUpgradeEnabled
            );

            (spillover1Recipient, spillover2Recipient) = _resolveRecipients(orbitOwner, level, position);

            (toOwner, toSpillover1, toSpillover2, toEscrow, toRecycle) = _calculateActualAmounts(
                pos.amount,
                pct,
                spillover1Recipient,
                spillover2Recipient
            );
        }

        viewData = PositionRuleView({
            position: position,
            line: line,
            linePaymentNumber: linePaymentNumber,
            autoUpgradeEnabled: autoUpgradeEnabled,
            isFounderNoReferrerPath: isFounderNoReferrerPath,
            toOwner: toOwner,
            toSpillover1: toSpillover1,
            toSpillover2: toSpillover2,
            toEscrow: toEscrow,
            toRecycle: toRecycle,
            spillover1Recipient: spillover1Recipient,
            spillover2Recipient: spillover2Recipient
        });
    }

    /**
     * @dev Exact historical rule data for a stored cycle position.
     * Returns the stored historical snapshot first.
     * Falls back to recomputation only if snapshot is missing.
     */
    function getHistoricalPositionRuleView(
        address orbitOwner,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) external view onlyValidLevel(level) returns (HistoricalPositionRuleView memory viewData) {
        OrbitConfig memory config = levelConfig[level];
        if (position < 1 || position > config.totalPositions) revert InvalidPosition();
        if (!historicalCycleStored[orbitOwner][level][cycleNumber]) revert HistoricalCycleNotFound();

        StoredRuleSnapshot memory snap = historicalStoredRuleSnapshots[orbitOwner][level][cycleNumber][position];
        if (snap.exists) {
            return _snapshotToHistoricalPositionRuleView(cycleNumber, position, snap);
        }

        // fallback path for old historical data only
        uint8 line = _getLineFromPosition(position, config);
        uint8 linePaymentNumber = historicalPositionLineArrivalNumber[orbitOwner][level][cycleNumber][position];
        bool hasStoredRuleData = linePaymentNumber > 0;

        Position storage pos = historicalCyclePositions[orbitOwner][level][cycleNumber][position];

        bool autoUpgradeEnabled = hasStoredRuleData
            ? _isHistoricalEscrowWindow(level, position, line, linePaymentNumber)
            : false;

        address spillover1Recipient = address(0);
        address spillover2Recipient = address(0);
        uint256 toOwner = 0;
        uint256 toSpillover1 = 0;
        uint256 toSpillover2 = 0;
        uint256 toEscrow = 0;
        uint256 toRecycle = 0;

        if (hasStoredRuleData && pos.user != address(0)) {
            PayoutPercentages memory pct = _calculatePayoutPercentages(
                level,
                position,
                line,
                linePaymentNumber,
                autoUpgradeEnabled
            );

            (spillover1Recipient, spillover2Recipient) = _resolveHistoricalRecipients(
                orbitOwner,
                level,
                cycleNumber,
                position
            );

            (toOwner, toSpillover1, toSpillover2, toEscrow, toRecycle) = _calculateActualAmounts(
                pos.amount,
                pct,
                spillover1Recipient,
                spillover2Recipient
            );
        }

        viewData = HistoricalPositionRuleView({
            cycleNumber: cycleNumber,
            position: position,
            line: line,
            linePaymentNumber: linePaymentNumber,
            autoUpgradeEnabled: autoUpgradeEnabled,
            hasStoredRuleData: hasStoredRuleData,
            toOwner: toOwner,
            toSpillover1: toSpillover1,
            toSpillover2: toSpillover2,
            toEscrow: toEscrow,
            toRecycle: toRecycle,
            spillover1Recipient: spillover1Recipient,
            spillover2Recipient: spillover2Recipient
        });
    }

    function getPosition(address user, uint8 level, uint8 position)
        external
        view
        returns (
            address occupant,
            uint256 amount,
            uint256 timestamp,
            address referrer,
            bool isActive
        )
    {
        Position storage pos = userOrbits[user][level].positions[position];
        return (pos.user, pos.amount, pos.timestamp, pos.referrer, pos.isActive);
    }

    function getHistoricalPosition(
        address user,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    )
        external
        view
        returns (
            address occupant,
            uint256 amount,
            uint256 timestamp,
            address referrer,
            bool isActive
        )
    {
        Position storage pos = historicalCyclePositions[user][level][cycleNumber][position];
        return (pos.user, pos.amount, pos.timestamp, pos.referrer, pos.isActive);
    }

    function hasHistoricalCycle(
        address user,
        uint8 level,
        uint256 cycleNumber
    ) external view returns (bool) {
        return historicalCycleStored[user][level][cycleNumber];
    }

    function getPositionActivationData(
        address user,
        uint8 level,
        uint8 position
    ) external view returns (uint256 activationId, uint32 cycleNumber, bool isMirror) {
        OrbitData storage orbit = userOrbits[user][level];
        activationId = positionActivationId[user][level][position];
        cycleNumber = uint32(orbit.totalCycles + 1);
        isMirror = positionIsMirror[user][level][position];
    }

    function getHistoricalPositionActivationData(
        address user,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) external view returns (uint256 activationId, bool isMirror) {
        activationId = historicalPositionActivationId[user][level][cycleNumber][position];
        isMirror = historicalPositionIsMirror[user][level][cycleNumber][position];
    }

    function fillPositionDetailed(
        address orbitOwner,
        uint8 level,
        address newUser,
        address referrer,
        uint256 amount,
        uint256 activationId
    )
        external
        whenNotPaused
        onlyLevelManager
        onlyValidLevel(level)
        returns (FillPositionDetailedResult memory result)
    {
        if (orbitOwner == address(0) || newUser == address(0)) revert InvalidAddress();

        OrbitConfig memory config = levelConfig[level];
        address id1Wallet = ILevelManagerReader(levelManager).id1Wallet();
        bool isFounderRepFreePlacement = founderRepActivated[newUser] && amount == 0;
        bool isTrueNoReferrer = (
            orbitOwner == id1Wallet &&
            IRegistration(registration).hadNoReferrer(newUser) &&
            !isFounderRepFreePlacement
        );

        if (_findUserPosition(orbitOwner, level, newUser) != 0) {
            revert DuplicateOrbitPosition(orbitOwner, level, newUser);
        }

        result.sourcePosition = _placeUserInOrbitDetailed(
            orbitOwner,
            level,
            newUser,
            referrer,
            amount,
            activationId,
            false
        );

        OrbitData storage orbit = userOrbits[orbitOwner][level];
        result.sourceCycle = uint32(orbit.totalCycles + 1);

        uint8 line = _getLineFromPosition(result.sourcePosition, config);
        uint8 linePaymentNumber = _trackQualifyingArrival(
            orbitOwner,
            level,
            result.sourcePosition,
            line,
            !isTrueNoReferrer && (amount > 0 || isFounderRepFreePlacement)
        );

        if (isTrueNoReferrer) {
            result.toOwner = amount - ((amount * 10) / 100);
            result.toSpillover1 = 0;
            result.spillover1Recipient = address(0);
            result.toSpillover2 = 0;
            result.spillover2Recipient = address(0);
            result.toEscrow = 0;
            result.toRecycle = 0;

            _storeRuleSnapshot(RuleSnapshotData({
                orbitOwner: orbitOwner,
                level: level,
                position: result.sourcePosition,
                line: line,
                linePaymentNumber: linePaymentNumber,
                autoUpgradeEnabled: false,
                isFounderNoReferrerPath: true,
                toOwner: result.toOwner,
                toSpillover1: result.toSpillover1,
                toSpillover2: result.toSpillover2,
                toEscrow: result.toEscrow,
                toRecycle: result.toRecycle,
                spillover1Recipient: result.spillover1Recipient,
                spillover2Recipient: result.spillover2Recipient
            }));
        } else {
            bool autoUpgradeEnabled = _isAutoUpgradeEnabled(orbitOwner, level);

            PayoutPercentages memory pct = _calculatePayoutPercentages(
                level,
                result.sourcePosition,
                line,
                linePaymentNumber,
                autoUpgradeEnabled
            );

            (result.spillover1Recipient, result.spillover2Recipient) = _resolveRecipients(orbitOwner, level, result.sourcePosition);

            (result.toOwner, result.toSpillover1, result.toSpillover2, result.toEscrow, result.toRecycle) = _calculateActualAmounts(
                amount,
                pct,
                result.spillover1Recipient,
                result.spillover2Recipient
            );

            _storeRuleSnapshot(RuleSnapshotData({
                orbitOwner: orbitOwner,
                level: level,
                position: result.sourcePosition,
                line: line,
                linePaymentNumber: linePaymentNumber,
                autoUpgradeEnabled: autoUpgradeEnabled,
                isFounderNoReferrerPath: false,
                toOwner: result.toOwner,
                toSpillover1: result.toSpillover1,
                toSpillover2: result.toSpillover2,
                toEscrow: result.toEscrow,
                toRecycle: result.toRecycle,
                spillover1Recipient: result.spillover1Recipient,
                spillover2Recipient: result.spillover2Recipient
            }));

            orbit.totalEarned += (result.toOwner + result.toEscrow);

            if (result.toEscrow > 0) {
                uint256 newEscrowBalance = orbit.escrowBalance + result.toEscrow;
                orbit.escrowBalance = newEscrowBalance;
                emit EscrowUpdated(orbitOwner, level, newEscrowBalance);

                if (newEscrowBalance >= config.upgradeRequirement && !orbit.autoUpgradeCompleted) {
                    orbit.autoUpgradeCompleted = true;
                    emit AutoUpgradeTriggered(orbitOwner, level, level + 1, newEscrowBalance);
                }
            }

            emit PaymentRuleApplied(
                orbitOwner,
                level,
                result.sourcePosition,
                line,
                linePaymentNumber,
                result.toOwner,
                result.toSpillover1,
                result.toSpillover2,
                result.toEscrow,
                result.toRecycle
            );
        }

        emit PositionFilled(orbitOwner, newUser, level, result.sourcePosition, amount, block.timestamp);

        if (result.toSpillover1 > 0 && result.spillover1Recipient != address(0)) {
            emit SpilloverPaid(newUser, result.spillover1Recipient, level, result.toSpillover1);
        }

        if (result.toSpillover2 > 0 && result.spillover2Recipient != address(0)) {
            emit SpilloverPaid(newUser, result.spillover2Recipient, level, result.toSpillover2);
        }

        if (orbit.currentPosition > config.totalPositions) {
            _handleOrbitFull(orbitOwner, level);
        }
    }

  


function mirrorPositionDetailed(
    address orbitOwner,
    uint8 level,
    address newUser,
    address referrer,
    uint256 amount,
    uint256 ruleBaseAmount,
    uint256 activationId
) external whenNotPaused onlyLevelManager onlyValidLevel(level)
returns (MirrorPositionDetailedResult memory result)
{
    if (orbitOwner == address(0) || newUser == address(0)) revert InvalidAddress();

    OrbitConfig memory config = levelConfig[level];
    address id1Wallet = ILevelManagerReader(levelManager).id1Wallet();

    bool isRecycleReentry = (referrer == newUser);
    bool isTrueNoReferrer = (
        !isRecycleReentry &&
        orbitOwner == id1Wallet &&
        IRegistration(registration).hadNoReferrer(newUser)
    );

    bool placedFreshPosition;

    if (isRecycleReentry) {
        // Force a fresh slot even if the user already exists in this orbit
        result.position = _placeReentryInOrbitDetailed(
            orbitOwner,
            level,
            newUser,
            referrer,
            amount,
            activationId,
            true
        );
        placedFreshPosition = true;
    } else {
        // Normal mirror behaviour: reuse existing position if already present
        uint8 existingPosition = _findUserPosition(orbitOwner, level, newUser);

        if (existingPosition != 0) {
            result.position = existingPosition;
        } else {
            result.position = _placeUserInOrbitDetailed(
                orbitOwner,
                level,
                newUser,
                referrer,
                amount,
                activationId,
                true
            );
            placedFreshPosition = true;
        }
    }

    OrbitData storage orbit = userOrbits[orbitOwner][level];
    result.cycleNumber = uint32(orbit.totalCycles + 1);

    if (!placedFreshPosition) {
        return result;
    }

    uint8 line = _getLineFromPosition(result.position, config);

    uint8 linePaymentNumber = _trackQualifyingArrival(
        orbitOwner,
        level,
        result.position,
        line,
        !isTrueNoReferrer && amount > 0
    );

    bool autoUpgradeEnabled = _isAutoUpgradeEnabled(orbitOwner, level);

    PayoutPercentages memory pct = _calculatePayoutPercentages(
        level,
        result.position,
        line,
        linePaymentNumber,
        autoUpgradeEnabled
    );

    uint256 mirrorOwnerLiquidAmount;
    uint256 mirrorEscrowAmount;
    uint256 mirrorRecycleAmount;

    mirrorOwnerLiquidAmount = (ruleBaseAmount * pct.toOwner) / 100;
    mirrorEscrowAmount = (ruleBaseAmount * pct.toEscrow) / 100;
    mirrorRecycleAmount = (ruleBaseAmount * pct.toRecycle) / 100;

    uint256 mirrorGrossAmount = mirrorOwnerLiquidAmount + mirrorEscrowAmount + mirrorRecycleAmount;
    if (amount > mirrorGrossAmount) {
        if (pct.toEscrow > 0) {
            mirrorOwnerLiquidAmount = 0;
            mirrorEscrowAmount = amount;
            mirrorRecycleAmount = 0;
        } else if (pct.toRecycle > 0) {
            mirrorOwnerLiquidAmount = 0;
            mirrorEscrowAmount = 0;
            mirrorRecycleAmount = amount;
        } else {
            mirrorOwnerLiquidAmount = amount;
            mirrorEscrowAmount = 0;
            mirrorRecycleAmount = 0;
        }
        mirrorGrossAmount = amount;
    }

    orbit.positions[result.position].amount = mirrorGrossAmount;

    _storeRuleSnapshot(RuleSnapshotData({
        orbitOwner: orbitOwner,
        level: level,
        position: result.position,
        line: line,
        linePaymentNumber: linePaymentNumber,
        autoUpgradeEnabled: autoUpgradeEnabled,
        isFounderNoReferrerPath: isTrueNoReferrer,
        toOwner: mirrorOwnerLiquidAmount,
        toSpillover1: 0,
        toSpillover2: 0,
        toEscrow: mirrorEscrowAmount,
        toRecycle: mirrorRecycleAmount,
        spillover1Recipient: address(0),
        spillover2Recipient: address(0)
    }));

    result.mirrorOwnerLiquidAmount = mirrorOwnerLiquidAmount;
    result.mirrorEscrowLockAmount = mirrorEscrowAmount;
    result.mirrorRecycleAmount = mirrorRecycleAmount;

    emit PositionFilled(
        orbitOwner,
        newUser,
        level,
        result.position,
        mirrorGrossAmount,
        block.timestamp
    );

    emit PaymentRuleApplied(
        orbitOwner,
        level,
        result.position,
        line,
        linePaymentNumber,
        result.mirrorOwnerLiquidAmount,
        0,
        0,
        result.mirrorEscrowLockAmount,
        result.mirrorRecycleAmount
    );

    if (orbit.currentPosition > config.totalPositions) {
        _handleOrbitFull(orbitOwner, level);
    }
}

function recyclePositionDetailed(
    address orbitOwner,
    uint8 level,
    address newUser,
    uint256 amount,
    uint256 ruleBaseAmount,
    uint256 activationId
) external whenNotPaused onlyLevelManager onlyValidLevel(level)
returns (FillPositionDetailedResult memory result)
{
    if (orbitOwner == address(0) || newUser == address(0)) revert InvalidAddress();

    OrbitConfig memory config = levelConfig[level];
    result.sourcePosition = _placeReentryInOrbitDetailed(
        orbitOwner,
        level,
        newUser,
        newUser,
        amount,
        activationId,
        true
    );

    OrbitData storage orbit = userOrbits[orbitOwner][level];
    result.sourceCycle = uint32(orbit.totalCycles + 1);

    uint8 line = _getLineFromPosition(result.sourcePosition, config);
    uint8 linePaymentNumber = _trackQualifyingArrival(
        orbitOwner,
        level,
        result.sourcePosition,
        line,
        amount > 0
    );

    bool autoUpgradeEnabled = _isAutoUpgradeEnabled(orbitOwner, level);
    PayoutPercentages memory pct = _calculatePayoutPercentages(
        level,
        result.sourcePosition,
        line,
        linePaymentNumber,
        autoUpgradeEnabled
    );

    (result.spillover1Recipient, result.spillover2Recipient) = _resolveRecipients(
        orbitOwner,
        level,
        result.sourcePosition
    );

    (
        result.toOwner,
        result.toSpillover1,
        result.toSpillover2,
        result.toEscrow,
        result.toRecycle
    ) = _calculateActualAmounts(
        ruleBaseAmount,
        pct,
        result.spillover1Recipient,
        result.spillover2Recipient
    );

    _storeRuleSnapshot(RuleSnapshotData({
        orbitOwner: orbitOwner,
        level: level,
        position: result.sourcePosition,
        line: line,
        linePaymentNumber: linePaymentNumber,
        autoUpgradeEnabled: autoUpgradeEnabled,
        isFounderNoReferrerPath: false,
        toOwner: result.toOwner,
        toSpillover1: result.toSpillover1,
        toSpillover2: result.toSpillover2,
        toEscrow: result.toEscrow,
        toRecycle: result.toRecycle,
        spillover1Recipient: result.spillover1Recipient,
        spillover2Recipient: result.spillover2Recipient
    }));

    orbit.totalEarned += (result.toOwner + result.toEscrow);

    if (result.toEscrow > 0) {
        uint256 newEscrowBalance = orbit.escrowBalance + result.toEscrow;
        orbit.escrowBalance = newEscrowBalance;
        emit EscrowUpdated(orbitOwner, level, newEscrowBalance);

        if (newEscrowBalance >= config.upgradeRequirement && !orbit.autoUpgradeCompleted) {
            orbit.autoUpgradeCompleted = true;
            emit AutoUpgradeTriggered(orbitOwner, level, level + 1, newEscrowBalance);
        }
    }

    emit PaymentRuleApplied(
        orbitOwner,
        level,
        result.sourcePosition,
        line,
        linePaymentNumber,
        result.toOwner,
        result.toSpillover1,
        result.toSpillover2,
        result.toEscrow,
        result.toRecycle
    );

    emit PositionFilled(orbitOwner, newUser, level, result.sourcePosition, amount, block.timestamp);

    if (result.toSpillover1 > 0 && result.spillover1Recipient != address(0)) {
        emit SpilloverPaid(newUser, result.spillover1Recipient, level, result.toSpillover1);
    }

    if (result.toSpillover2 > 0 && result.spillover2Recipient != address(0)) {
        emit SpilloverPaid(newUser, result.spillover2Recipient, level, result.toSpillover2);
    }

    if (orbit.currentPosition > config.totalPositions) {
        _handleOrbitFull(orbitOwner, level);
    }
}



    function setFounderRepActivated(address user, bool status) external onlyLevelManager {
        founderRepActivated[user] = status;
    }

    function updateLevelManager(address _newManager) external onlyOwner {
        _requireContract(_newManager, "Invalid LevelManager");

        address oldManager = levelManager;
        levelManager = _newManager;

        emit OrbitDependencyUpdated("LEVEL_MANAGER", oldManager, _newManager);
    }

    function updateEscrow(address _newEscrow) external onlyOwner {
        _requireContract(_newEscrow, "Invalid Escrow");

        address oldEscrow = escrow;
        escrow = _newEscrow;

        emit OrbitDependencyUpdated("ESCROW", oldEscrow, _newEscrow);
    }

    function updateRegistration(address _newRegistration) external onlyOwner {
        _requireContract(_newRegistration, "Invalid Registration");

        address oldRegistration = registration;
        registration = _newRegistration;

        emit OrbitDependencyUpdated("REGISTRATION", oldRegistration, _newRegistration);
    }

    function updateGuardian(address _newGuardian) external onlyOwner {
        _requireContract(_newGuardian, "Invalid Guardian");

        address oldGuardian = guardian;
        guardian = _newGuardian;

        emit OrbitDependencyUpdated("GUARDIAN", oldGuardian, _newGuardian);
    }

    function _resolveHistoricalRecipients(
        address orbitOwner,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) internal view virtual returns (address spillover1Recipient, address spillover2Recipient) {
        OrbitConfig memory config = levelConfig[level];

        if (config.lines == 1) {
            return (address(0), address(0));
        }

        if (config.lines == 2) {
            if (position <= 3) {
                Position storage orbitOwnerPos = historicalCyclePositions[orbitOwner][level][cycleNumber][position];
                if (orbitOwnerPos.user == address(0)) {
                    return (address(0), address(0));
                }

                spillover1Recipient = _findEligibleUpline(orbitOwner, level);
                spillover2Recipient = address(0);
                return (spillover1Recipient, spillover2Recipient);
            }

            uint8 parentPos;
            if (position == 4 || position == 7 || position == 10) parentPos = 1;
            else if (position == 5 || position == 8 || position == 11) parentPos = 2;
            else parentPos = 3;

            spillover1Recipient = historicalCyclePositions[orbitOwner][level][cycleNumber][parentPos].user;
            spillover2Recipient = address(0);
            return (spillover1Recipient, spillover2Recipient);
        }

        // Default implementation for 3-line orbits (P39)
        // This will be overridden by P39Orbit
        return (address(0), address(0));
    }


    uint256[49] private __gap;
}
