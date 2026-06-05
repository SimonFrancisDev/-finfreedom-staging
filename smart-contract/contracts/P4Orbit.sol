// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseOrbit.sol";

/**
 * @title P4Orbit
 * @dev 4 positions, 1 line, sequential fill.
 */
contract P4Orbit is BaseOrbit {
    uint8 public constant POSITIONS = 4;
    uint8 public constant LINES = 1;
    uint8 public constant LINE1_SIZE = 4;

    uint256 public constant LEVEL1_PRICE = 10 * 10**6;
    uint256 public constant LEVEL4_PRICE = 80 * 10**6;
    uint256 public constant LEVEL7_PRICE = 640 * 10**6;
    uint256 public constant LEVEL10_PRICE = 5120 * 10**6;

    uint256 public constant UPGRADE1_REQ = 20 * 10**6;
    uint256 public constant UPGRADE4_REQ = 160 * 10**6;
    uint256 public constant UPGRADE7_REQ = 1280 * 10**6;
    uint256 public constant UPGRADE10_REQ = 10240 * 10**6;

    function initialize(
        address _levelManager,
        address _escrow,
        address _registration,
        address _guardian
    ) public initializer {
        __BaseOrbit_init(_levelManager, _escrow, _registration, _guardian);

        levelConfig[1] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, 0, 0, LEVEL1_PRICE, UPGRADE1_REQ);
        levelConfig[4] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, 0, 0, LEVEL4_PRICE, UPGRADE4_REQ);
        levelConfig[7] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, 0, 0, LEVEL7_PRICE, UPGRADE7_REQ);
        levelConfig[10] = OrbitConfig(POSITIONS, LINES, LINE1_SIZE, 0, 0, LEVEL10_PRICE, UPGRADE10_REQ);
    }

    function _isSupportedP4Level(uint8 level) internal pure returns (bool) {
        return level == 1 || level == 4 || level == 7 || level == 10;
    }

    function getOrbitType() external pure override returns (string memory) {
        return "P4";
    }

    function getOrbitConfig(uint8 level) external view override returns (OrbitConfig memory) {
        require(_isSupportedP4Level(level), "Unsupported P4 level");
        return levelConfig[level];
    }

    /**
     * @dev P4 payout rule.
     *
     * Auto-upgrade enabled:
     * - Position 1 => 70% owner, 20% escrow
     * - Position 2 => 90% escrow
     * - Position 3 => 90% escrow
     * - Position 4 => 90% recycle
     *
     * Auto-upgrade disabled:
     * - Position 1 => 90% owner
     * - Position 2 => 90% owner
     * - Position 3 => 90% owner
     * - Position 4 => 90% recycle
     *
     * The remaining 10% is handled by LevelManager as system charge.
     */
    function _calculatePayoutPercentages(
        uint8 level,
        uint8 position,
        uint8,
        uint8,
        bool autoUpgradeEnabled
    ) internal pure override returns (PayoutPercentages memory pct) {
        require(_isSupportedP4Level(level), "Unsupported P4 level");
        require(position >= 1 && position <= POSITIONS, "Invalid P4 position");

        if (autoUpgradeEnabled) {
            if (position == 1) {
                pct.toOwner = 70;
                pct.toEscrow = 20;
            } else if (position == 2 || position == 3) {
                pct.toEscrow = 90;
            } else if (position == 4) {
                pct.toRecycle = 90;
            }
        } else {
            if (position == 1 || position == 2 || position == 3) {
                pct.toOwner = 90;
            } else if (position == 4) {
                pct.toRecycle = 90;
            }
        }
    }

    function _resolveRecipients(
        address,
        uint8,
        uint8
    ) internal pure override returns (address spillover1Recipient, address spillover2Recipient) {
        spillover1Recipient = address(0);
        spillover2Recipient = address(0);
    }

    uint256[50] private __gap;
}
