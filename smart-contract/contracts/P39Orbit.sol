// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseOrbit.sol";

/**
 * @title P39Orbit
 * @dev Sequential placement:
 * positions 1..39 are filled in order.
 *
 * Structure:
 * line1 => 1,2,3
 * line2 => 4..12
 * line3 => 13..39
 *
 * line2 parent mapping:
 * 4,7,10 => 1
 * 5,8,11 => 2
 * 6,9,12 => 3
 *
 * line3 parent mapping:
 * 13,22,31 => 4
 * 14,23,32 => 5
 * 15,24,33 => 6
 * 16,25,34 => 7
 * 17,26,35 => 8
 * 18,27,36 => 9
 * 19,28,37 => 10
 * 20,29,38 => 11
 * 21,30,39 => 12
 */
contract P39Orbit is BaseOrbit {
    error UnsupportedP39Level();
    error InvalidLinePayment();
    error InvalidP39Position();

    uint8 public constant POSITIONS = 39;
    uint8 public constant LINES = 3;
    uint8 public constant LINE1_SIZE = 3;
    uint8 public constant LINE2_SIZE = 9;
    uint8 public constant LINE3_SIZE = 27;

    uint256 public constant LEVEL3_PRICE = 40 * 10**6;
    uint256 public constant LEVEL6_PRICE = 320 * 10**6;
    uint256 public constant LEVEL9_PRICE = 2560 * 10**6;

    uint256 public constant UPGRADE3_REQ = 80 * 10**6;
    uint256 public constant UPGRADE6_REQ = 640 * 10**6;
    uint256 public constant UPGRADE9_REQ = 5120 * 10**6;

    mapping(address => mapping(uint8 => address)) internal matrixPlacementParent;

    function initialize(
        address _levelManager,
        address _escrow,
        address _registration,
        address _guardian
    ) public initializer {
        __BaseOrbit_init(_levelManager, _escrow, _registration, _guardian);

        levelConfig[3] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, LINE3_SIZE, LEVEL3_PRICE, UPGRADE3_REQ);
        levelConfig[6] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, LINE3_SIZE, LEVEL6_PRICE, UPGRADE6_REQ);
        levelConfig[9] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, LINE3_SIZE, LEVEL9_PRICE, UPGRADE9_REQ);
    }

    function _isSupportedP39Level(uint8 level) internal pure returns (bool) {
        return level == 3 || level == 6 || level == 9;
    }

    function getOrbitType() external pure override returns (string memory) {
        return "P39";
    }

    function getOrbitConfig(uint8 level) external view override returns (OrbitConfig memory) {
        if (!_isSupportedP39Level(level)) revert UnsupportedP39Level();
        return levelConfig[level];
    }

    /**
     * P39 final payout rule
     *
     * IMPORTANT:
     * These percentages are defined against the FULL activation amount for direct fills.
     *
     * For mirrored routed arrivals:
     * - BaseOrbit/LevelManager now handle full routed-amount locking correctly.
     * - So this function should only describe whether the mirrored arrival is inside
     *   an escrow-qualified window, not try to convert routed fragments into some
     *   smaller pseudo-escrow amount.
     *
     * line 1:
     * - arrival #1, #2 => 20 owner, 20 spill1, 50 spill2
     * - arrival #3 => 20 escrow, 20 spill1, 50 spill2
     *
     * line 2:
     * - arrivals #1..#4 => 20 escrow, 20 spill1, 50 spill2
     * - arrivals #5..#9 => 20 owner, 20 spill1, 50 spill2
     *
     * line 3:
     * - arrivals #1..#2 => 50 escrow, 20 spill1, 20 spill2
     * - arrivals #3..#25 => 50 owner, 20 spill1, 20 spill2
     * - arrivals #26 and #27 => 50 recycle, 20 spill1, 20 spill2
     *
     * This is based on line arrival number, not slot number.
     */
    function _calculatePayoutPercentages(
        uint8 level,
        uint8,
        uint8 line,
        uint8 linePaymentNumber,
        bool autoUpgradeEnabled
    ) internal pure override returns (PayoutPercentages memory pct) {
        if (!_isSupportedP39Level(level)) revert UnsupportedP39Level();

        if (line == 1) {
            if (linePaymentNumber < 1 || linePaymentNumber > LINE1_SIZE) revert InvalidLinePayment();

            if (autoUpgradeEnabled && linePaymentNumber == 3) {
                pct.toEscrow = 20;
                pct.toSpillover1 = 20;
                pct.toSpillover2 = 50;
            } else {
                pct.toOwner = 20;
                pct.toSpillover1 = 20;
                pct.toSpillover2 = 50;
            }

            return pct;
        }

        if (line == 2) {
            if (linePaymentNumber < 1 || linePaymentNumber > LINE2_SIZE) revert InvalidLinePayment();

            if (autoUpgradeEnabled && linePaymentNumber >= 1 && linePaymentNumber <= 4) {
                pct.toEscrow = 20;
                pct.toSpillover1 = 20;
                pct.toSpillover2 = 50;
            } else {
                pct.toOwner = 20;
                pct.toSpillover1 = 20;
                pct.toSpillover2 = 50;
            }

            return pct;
        }

        if (linePaymentNumber < 1 || linePaymentNumber > LINE3_SIZE) revert InvalidLinePayment();

        // line 3
        if (linePaymentNumber == 26 || linePaymentNumber == 27) {
            pct.toRecycle = 50;
            pct.toSpillover1 = 20;
            pct.toSpillover2 = 20;
            return pct;
        }

        if (autoUpgradeEnabled && linePaymentNumber >= 1 && linePaymentNumber <= 2) {
            pct.toEscrow = 50;
            pct.toSpillover1 = 20;
            pct.toSpillover2 = 20;
            return pct;
        }

        pct.toOwner = 50;
        pct.toSpillover1 = 20;
        pct.toSpillover2 = 20;
        return pct;
    }

    function _line2ParentPosition(uint8 position) internal pure returns (uint8) {
        if (position < 4 || position > 12) revert InvalidP39Position();
        return uint8(((position - 4) % 3) + 1);
    }

    function _line3ParentPosition(uint8 position) internal pure returns (uint8) {
        if (position < 13 || position > 39) revert InvalidP39Position();
        return uint8(4 + ((position - 13) % 9));
    }

    function _line3GrandParentLine1Position(uint8 position) internal pure returns (uint8) {
        uint8 parent = _line3ParentPosition(position);
        return uint8(((parent - 4) % 3) + 1);
    }

    function _afterPositionPlaced(
        address orbitOwner,
        uint8 level,
        address user,
        uint8 position
    ) internal override {
        address parent;
        if (position <= 3) {
            parent = orbitOwner;
        } else if (position <= 12) {
            uint8 parentPos = _line2ParentPosition(position);
            parent = userOrbits[orbitOwner][level].positions[parentPos].user;
        } else {
            uint8 parentPos = _line3ParentPosition(position);
            parent = userOrbits[orbitOwner][level].positions[parentPos].user;
        }

        if (parent == address(0)) parent = ILevelManagerReader(levelManager).id1Wallet();
        matrixPlacementParent[user][level] = parent;
    }

    function matrixParentOf(address user, uint8 level) public view returns (address) {
        address storedParent = matrixPlacementParent[user][level];
        if (storedParent != address(0)) return storedParent;
        return ILevelManagerReader(levelManager).id1Wallet();
    }

    function _resolveRecipients(
        address orbitOwner,
        uint8 level,
        uint8 position
    ) internal view override returns (address spillover1Recipient, address spillover2Recipient) {
        if (!_isSupportedP39Level(level)) revert UnsupportedP39Level();
        if (position < 1 || position > POSITIONS) revert InvalidP39Position();

        OrbitData storage orbit = userOrbits[orbitOwner][level];
        address id1 = ILevelManagerReader(levelManager).id1Wallet();

        // Line 1 landing: user -> orbitOwner -> matrix parent -> matrix grandparent
        if (position <= 3) {
            spillover1Recipient = matrixParentOf(orbitOwner, level);
            spillover2Recipient = matrixParentOf(spillover1Recipient, level);
            return (spillover1Recipient, spillover2Recipient);
        }

        // Line 2 landing: user -> line1 parent -> orbitOwner -> matrix parent
        if (position >= 4 && position <= 12) {
            uint8 parentLine1Pos = _line2ParentPosition(position);
            address line1Parent = orbit.positions[parentLine1Pos].user != address(0)
                ? orbit.positions[parentLine1Pos].user
                : id1;

            spillover1Recipient = line1Parent;
            spillover2Recipient = matrixParentOf(orbitOwner, level);
            return (spillover1Recipient, spillover2Recipient);
        }

        // Line 3 landing: user -> line2 parent -> line1 grandparent -> orbitOwner
        uint8 parentLine2Pos = _line3ParentPosition(position);
        uint8 grandLine1Pos = _line3GrandParentLine1Position(position);

        spillover1Recipient = orbit.positions[parentLine2Pos].user != address(0)
            ? orbit.positions[parentLine2Pos].user
            : id1;

        spillover2Recipient = orbit.positions[grandLine1Pos].user != address(0)
            ? orbit.positions[grandLine1Pos].user
            : id1;

        return (spillover1Recipient, spillover2Recipient);
    }

    /**
     * @dev Override for historical recipients – always returns the stored snapshot values.
     * This ensures that historical data is immutable and matches the actual execution.
     */
    function _resolveHistoricalRecipients(
        address orbitOwner,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) internal view override returns (address spillover1Recipient, address spillover2Recipient) {
        if (!_isSupportedP39Level(level)) revert UnsupportedP39Level();
        if (position < 1 || position > POSITIONS) revert InvalidP39Position();

        StoredRuleSnapshot memory snap = historicalStoredRuleSnapshots[orbitOwner][level][cycleNumber][position];

        if (snap.exists) {
            return (snap.spillover1Recipient, snap.spillover2Recipient);
        }

        // Fallback – should never happen after the system is live with snapshots
        return (address(0), address(0));
    }

    uint256[49] private __gap;
}
