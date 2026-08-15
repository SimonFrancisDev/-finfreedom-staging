// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../migration/OrbitWalletReplacementMigrators.sol";

abstract contract OrbitWalletReplacementHarnessBase is OrbitWalletReplacementStorage {
    function _initializeHarness() internal onlyInitializing {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __Pausable_init();
        _pause();
    }

    function seedSummary(
        address owner,
        uint8 level,
        uint8 currentPosition,
        uint256 escrowBalance,
        bool autoUpgradeCompleted,
        uint8 line1,
        uint8 line2,
        uint8 line3,
        uint256 cycles,
        uint256 earned
    ) external {
        IOrbitState.OrbitData storage orbit = userOrbits[owner][level];
        orbit.currentPosition = currentPosition;
        orbit.escrowBalance = escrowBalance;
        orbit.autoUpgradeCompleted = autoUpgradeCompleted;
        orbit.isActive = true;
        orbit.positionsInLine1 = line1;
        orbit.positionsInLine2 = line2;
        orbit.positionsInLine3 = line3;
        orbit.totalCycles = cycles;
        orbit.totalEarned = earned;
    }

    function seedPosition(
        address owner,
        uint8 level,
        uint8 position,
        address user,
        address referrer,
        address above,
        uint256 activationId,
        bool mirror,
        uint8 arrival
    ) external {
        userOrbits[owner][level].positions[position] = IOrbitState.Position(user, 123, block.timestamp, referrer, true);
        userOrbits[owner][level].positionAbove[position] = above;
        positionActivationId[owner][level][position] = activationId;
        positionIsMirror[owner][level][position] = mirror;
        positionLineArrivalNumber[owner][level][position] = arrival;
    }

    function seedSnapshot(address owner, uint8 level, uint8 position, address first, address second) external {
        StoredRuleSnapshot storage snap = storedRuleSnapshots[owner][level][position];
        snap.exists = true;
        snap.line = 2;
        snap.linePaymentNumber = 4;
        snap.toSpillover1 = 40;
        snap.toSpillover2 = 50;
        snap.spillover1Recipient = first;
        snap.spillover2Recipient = second;
    }

    function seedLineCount(address owner, uint8 level, uint8 line, uint8 count) external {
        linePaymentCounts[owner][level][line] = count;
    }

    function readPosition(address owner, uint8 level, uint8 position) external view returns (
        address user, address referrer, address above, uint256 activationId, bool mirror, uint8 arrival,
        address first, address second
    ) {
        IOrbitState.Position storage item = userOrbits[owner][level].positions[position];
        StoredRuleSnapshot storage snap = storedRuleSnapshots[owner][level][position];
        return (
            item.user, item.referrer, userOrbits[owner][level].positionAbove[position],
            positionActivationId[owner][level][position], positionIsMirror[owner][level][position],
            positionLineArrivalNumber[owner][level][position], snap.spillover1Recipient, snap.spillover2Recipient
        );
    }

    function readLineCount(address owner, uint8 level, uint8 line) external view returns (uint8) {
        return linePaymentCounts[owner][level][line];
    }

    function seedHistoricalPosition(address owner, uint8 level, uint256 cycle, uint8 position, address user) external {
        historicalCyclePositions[owner][level][cycle][position] =
            IOrbitState.Position(user, 456, block.timestamp, owner, true);
        historicalCycleStored[owner][level][cycle] = true;
    }

    function readHistoricalPosition(address owner, uint8 level, uint256 cycle, uint8 position)
        external view returns (address)
    {
        return historicalCyclePositions[owner][level][cycle][position].user;
    }

    function unpauseHarness() external { _unpause(); }
}

contract P4OrbitWalletReplacementMigratorHarness is P4OrbitWalletReplacementMigrator, OrbitWalletReplacementHarnessBase {
    function initializeHarness() external initializer { _initializeHarness(); }
}

contract P12OrbitWalletReplacementMigratorHarness is P12OrbitWalletReplacementMigrator, OrbitWalletReplacementHarnessBase {
    function initializeHarness() external initializer { _initializeHarness(); }
    function seedMatrixParent(address user, uint8 level, address parent) external { matrixPlacementParent[user][level] = parent; }
    function readMatrixParent(address user, uint8 level) external view returns (address) { return matrixPlacementParent[user][level]; }
}

contract P39OrbitWalletReplacementMigratorHarness is P39OrbitWalletReplacementMigrator, OrbitWalletReplacementHarnessBase {
    function initializeHarness() external initializer { _initializeHarness(); }
    function seedMatrixParent(address user, uint8 level, address parent) external { matrixPlacementParent[user][level] = parent; }
    function readMatrixParent(address user, uint8 level) external view returns (address) { return matrixPlacementParent[user][level]; }
}
