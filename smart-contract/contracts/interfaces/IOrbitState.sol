// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IOrbitState
 * @dev Shared data types and events for per-user orbit state.
 */
interface IOrbitState {
    struct Position {
        address user;
        uint256 amount;
        uint256 timestamp;
        address referrer;
        bool isActive;
    }

    struct OrbitData {
        uint8 currentPosition;
        uint256 escrowBalance;
        bool autoUpgradeCompleted;
        bool isActive;

        mapping(uint8 => Position) positions;
        mapping(uint8 => address) positionAbove;

        uint8 positionsInLine1;
        uint8 positionsInLine2;
        uint8 positionsInLine3;

        uint256 totalCycles;
        uint256 totalEarned;
    }

    struct OrbitConfig {
        uint8 totalPositions;
        uint8 lines;
        uint8 line1Size;
        uint8 line2Size;
        uint8 line3Size;
        uint256 levelPrice;
        uint256 upgradeRequirement;
    }

    struct PayoutPercentages {
        uint256 toOwner;
        uint256 toSpillover1;
        uint256 toSpillover2;
        uint256 toEscrow;
        uint256 toRecycle;
    }

    /**
     * @dev Frontend-facing read model for the exact rule applied to a live position.
     */
    struct PositionRuleView {
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
     * @dev Frontend-facing read model for the exact rule applied to a historical position.
     * Uses the stored historical line-arrival number captured when the cycle completed.
     */
    struct HistoricalPositionRuleView {
        uint256 cycleNumber;
        uint8 position;
        uint8 line;
        uint8 linePaymentNumber;
        bool autoUpgradeEnabled;
        bool hasStoredRuleData;
        uint256 toOwner;
        uint256 toSpillover1;
        uint256 toSpillover2;
        uint256 toEscrow;
        uint256 toRecycle;
        address spillover1Recipient;
        address spillover2Recipient;
    }

    event PositionFilled(
        address indexed orbitOwner,
        address indexed user,
        uint8 indexed level,
        uint8 position,
        uint256 amount,
        uint256 timestamp
    );

    event SpilloverPaid(
        address indexed from,
        address indexed to,
        uint8 indexed level,
        uint256 amount
    );

    event AutoUpgradeTriggered(
        address indexed user,
        uint8 fromLevel,
        uint8 toLevel,
        uint256 amount
    );

    event OrbitReset(
        address indexed user,
        uint8 indexed level,
        uint256 cycleNumber
    );

    event EscrowUpdated(
        address indexed user,
        uint8 indexed level,
        uint256 newBalance
    );
}