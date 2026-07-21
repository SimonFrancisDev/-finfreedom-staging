// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseOrbit.sol";

/**
 * @title P12Orbit
 * @dev Sequential placement:
 * positions 1..12 are filled in order.
 *
 * Structure:
 * line 1 => 1,2,3
 * line 2 => 4..12
 *
 * Structural parents on line 2:
 * 4,7,10 => 1
 * 5,8,11 => 2
 * 6,9,12 => 3
 */
contract P12Orbit is BaseOrbit {
    error UnsupportedP12Level();
    error InvalidP12Line();
    error InvalidP12Position();
    error InvalidLinePayment();

    uint8 public constant POSITIONS = 12;
    uint8 public constant LINES = 2;
    uint8 public constant LINE1_SIZE = 3;
    uint8 public constant LINE2_SIZE = 9;

    uint256 public constant LEVEL2_PRICE = 20 * 10**6;
    uint256 public constant LEVEL5_PRICE = 160 * 10**6;
    uint256 public constant LEVEL8_PRICE = 1280 * 10**6;

    uint256 public constant UPGRADE2_REQ = 40 * 10**6;
    uint256 public constant UPGRADE5_REQ = 320 * 10**6;
    uint256 public constant UPGRADE8_REQ = 2560 * 10**6;

    mapping(address => mapping(uint8 => address)) internal matrixPlacementParent;

    function initialize(
        address _levelManager,
        address _escrow,
        address _registration,
        address _guardian
    ) public initializer {
        __BaseOrbit_init(_levelManager, _escrow, _registration, _guardian);

        levelConfig[2] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, 0, LEVEL2_PRICE, UPGRADE2_REQ);
        levelConfig[5] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, 0, LEVEL5_PRICE, UPGRADE5_REQ);
        levelConfig[8] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, LINE2_SIZE, 0, LEVEL8_PRICE, UPGRADE8_REQ);
    }

    function _isSupportedP12Level(uint8 level) internal pure returns (bool) {
        return level == 2 || level == 5 || level == 8;
    }

    function getOrbitType() external pure override returns (string memory) {
        return "P12";
    }

    function getOrbitConfig(uint8 level) external view override returns (OrbitConfig memory) {
        if (!_isSupportedP12Level(level)) revert UnsupportedP12Level();
        return levelConfig[level];
    }

    /**
     * Final approved rule:
     * line1 => 40 owner, 50 spill1
     *
     * line2 is arrival-based:
     * - first 4 paid arrivals in line 2 => 50 escrow, 40 spill1
     * - arrivals 5,6,7 in line 2 => 50 owner, 40 spill1
     * - arrivals 8 and 9 in line 2 => 50 recycle, 40 spill1
     *
     * This depends on payment arrival number in line 2,
     * not fixed slot numbers.
     */
    function _calculatePayoutPercentages(
        uint8 level,
        uint8,
        uint8 line,
        uint8 linePaymentNumber,
        bool autoUpgradeEnabled
    ) internal pure override returns (PayoutPercentages memory pct) {
        if (!_isSupportedP12Level(level)) revert UnsupportedP12Level();
        if (line != 1 && line != 2) revert InvalidP12Line();

        if (line == 2) {
            if (linePaymentNumber < 1 || linePaymentNumber > LINE2_SIZE) revert InvalidLinePayment();
        }

        if (line == 1) {
            pct.toOwner = 40;
            pct.toSpillover1 = 50;
            return pct;
        }

        // line 2
        if (linePaymentNumber == 8 || linePaymentNumber == 9) {
            pct.toRecycle = 50;
            pct.toSpillover1 = 40;
            return pct;
        }

        if (autoUpgradeEnabled && linePaymentNumber >= 1 && linePaymentNumber <= 4) {
            pct.toEscrow = 50;
            pct.toSpillover1 = 40;
            return pct;
        }

        pct.toOwner = 50;
        pct.toSpillover1 = 40;
    }

    function _line2ParentPosition(uint8 position) internal pure returns (uint8) {
        if (position < 4 || position > 12) revert InvalidP12Position();

        if (position == 4 || position == 7 || position == 10) return 1;
        if (position == 5 || position == 8 || position == 11) return 2;
        return 3; // 6, 9, 12
    }

    function matrixParentOf(address user, uint8 level) public view returns (address) {
        if (registration.code.length != 0) {
            try IRegistration(registration).currentMatrixParentOf(user, level) returns (address canonicalParent) {
                if (canonicalParent != address(0)) return canonicalParent;
            } catch {}
        }
        address storedParent = matrixPlacementParent[user][level];
        return storedParent != address(0)
            ? storedParent
            : ILevelManagerReader(levelManager).id1Wallet();
    }

    function _resolveRecipients(
        address orbitOwner,
        uint8 level,
        uint8 position
    ) internal view override returns (address spillover1Recipient, address spillover2Recipient) {
        if (!_isSupportedP12Level(level)) revert UnsupportedP12Level();
        if (position < 1 || position > POSITIONS) revert InvalidP12Position();

        OrbitData storage orbit = userOrbits[orbitOwner][level];
        address id1 = ILevelManagerReader(levelManager).id1Wallet();

        // ---------------------------
        // LINE 1
        // ---------------------------
        if (position <= 3) {
            return (matrixParentOf(orbitOwner, level), address(0));
        }

        // ---------------------------
        // LINE 2
        // ---------------------------
        if (position >= 4 && position <= 12) {
            uint8 parentPos = _line2ParentPosition(position);
            address line1Parent = orbit.positions[parentPos].user;

            spillover1Recipient = line1Parent != address(0) ? line1Parent : id1;
            return (spillover1Recipient, address(0));
        }

        return (address(0), address(0));
    }

    function _resolveHistoricalRecipients(
        address orbitOwner,
        uint8 level,
        uint256 cycleNumber,
        uint8 position
    ) internal view override returns (address spillover1Recipient, address spillover2Recipient) {
        if (!_isSupportedP12Level(level)) revert UnsupportedP12Level();
        if (position < 1 || position > POSITIONS) revert InvalidP12Position();

        StoredRuleSnapshot memory snap = historicalStoredRuleSnapshots[orbitOwner][level][cycleNumber][position];
        if (snap.exists) {
            return (snap.spillover1Recipient, snap.spillover2Recipient);
        }

        address id1 = ILevelManagerReader(levelManager).id1Wallet();

        if (position <= 3) {
            address upperOrbitOwner = IRegistration(registration).getReferrer(orbitOwner);

            if (upperOrbitOwner == address(0)) {
                return (id1, address(0));
            }

            uint8 upperPosition = _findUserPosition(upperOrbitOwner, level, orbitOwner);

            if (upperPosition == 0) {
                return (id1, address(0));
            }

            if (upperPosition >= 1 && upperPosition <= 3) {
                return (upperOrbitOwner, address(0));
            }

            if (upperPosition >= 4 && upperPosition <= 12) {
                uint8 parentPos = _line2ParentPosition(upperPosition);
                address parentUser = historicalCyclePositions[upperOrbitOwner][level][cycleNumber][parentPos].user;

                spillover1Recipient = parentUser != address(0) ? parentUser : id1;
                return (spillover1Recipient, address(0));
            }

            return (id1, address(0));
        }

        if (position >= 4 && position <= 12) {
            uint8 parentPos = _line2ParentPosition(position);
            address line1Parent = historicalCyclePositions[orbitOwner][level][cycleNumber][parentPos].user;

            spillover1Recipient = line1Parent != address(0) ? line1Parent : id1;
            return (spillover1Recipient, address(0));
        }

        return (address(0), address(0));
    }

    uint256[49] private __gap;
}
