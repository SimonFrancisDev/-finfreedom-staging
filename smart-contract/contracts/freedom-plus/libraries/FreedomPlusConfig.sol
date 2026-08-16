// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library FreedomPlusConfig {
    uint16 internal constant BPS_DENOMINATOR = 10_000;
    uint16 internal constant SYSTEM_CHARGE_BPS = 1_000;
    uint8 internal constant MIN_LEVEL = 1;
    uint8 internal constant MAX_LEVEL = 7;

    enum OrbitType {
        P39,
        P14,
        P12,
        P6,
        P4,
        P3
    }

    struct LevelConfig {
        OrbitType orbitType;
        uint256 price;
        uint256 fptReward;
        uint256 fptrReward;
    }

    error InvalidLevel(uint8 level);
    error InvalidPosition(OrbitType orbitType, uint8 position);
    error InvalidRing(OrbitType orbitType, uint8 ring);

    function levelConfig(uint8 level) internal pure returns (LevelConfig memory config) {
        if (level < MIN_LEVEL || level > MAX_LEVEL) revert InvalidLevel(level);

        uint256 price = 50 * 10 ** 6;
        for (uint8 current = MIN_LEVEL; current < level; current++) {
            price *= 3;
        }

        OrbitType orbitType;
        if (level == 1) orbitType = OrbitType.P39;
        else if (level == 2) orbitType = OrbitType.P14;
        else if (level == 3) orbitType = OrbitType.P12;
        else if (level == 4) orbitType = OrbitType.P6;
        else if (level == 5 || level == 6) orbitType = OrbitType.P4;
        else orbitType = OrbitType.P3;

        config = LevelConfig({
            orbitType: orbitType,
            price: price,
            fptReward: price,
            fptrReward: price / 2
        });
    }

    function positionCount(OrbitType orbitType) internal pure returns (uint8) {
        if (orbitType == OrbitType.P39) return 39;
        if (orbitType == OrbitType.P14) return 14;
        if (orbitType == OrbitType.P12) return 12;
        if (orbitType == OrbitType.P6) return 6;
        if (orbitType == OrbitType.P4) return 4;
        return 3;
    }

    function ringCount(OrbitType orbitType) internal pure returns (uint8) {
        if (orbitType == OrbitType.P39 || orbitType == OrbitType.P14) return 3;
        if (orbitType == OrbitType.P12 || orbitType == OrbitType.P6) return 2;
        return 1;
    }

    function ringForPosition(OrbitType orbitType, uint8 position) internal pure returns (uint8) {
        _validatePosition(orbitType, position);

        if (orbitType == OrbitType.P39) {
            if (position <= 3) return 1;
            if (position <= 12) return 2;
            return 3;
        }
        if (orbitType == OrbitType.P14) {
            if (position <= 2) return 1;
            if (position <= 6) return 2;
            return 3;
        }
        if (orbitType == OrbitType.P12) return position <= 3 ? 1 : 2;
        if (orbitType == OrbitType.P6) return position <= 2 ? 1 : 2;
        return 1;
    }

    function parentPosition(OrbitType orbitType, uint8 position) internal pure returns (uint8) {
        uint8 ring = ringForPosition(orbitType, position);
        if (ring == 1) return 0;

        if (orbitType == OrbitType.P39) {
            if (ring == 2) return uint8(((position - 4) % 3) + 1);
            return uint8(((position - 13) % 9) + 4);
        }
        if (orbitType == OrbitType.P14) {
            if (ring == 2) return uint8(((position - 3) % 2) + 1);
            return uint8(((position - 7) % 4) + 3);
        }
        if (orbitType == OrbitType.P12) return uint8(((position - 4) % 3) + 1);
        if (orbitType == OrbitType.P6) return uint8(((position - 3) % 2) + 1);
        return 0;
    }

    function payoutBps(OrbitType orbitType, uint8 ring) internal pure returns (uint16) {
        if (ring < 1 || ring > ringCount(orbitType)) revert InvalidRing(orbitType, ring);

        if (orbitType == OrbitType.P39) {
            if (ring == 1 || ring == 2) return 2_000;
            return 5_000;
        }
        if (orbitType == OrbitType.P14) {
            if (ring == 1) return 1_500;
            if (ring == 2) return 2_500;
            return 5_000;
        }
        if (orbitType == OrbitType.P12 || orbitType == OrbitType.P6) {
            return ring == 1 ? 4_000 : 5_000;
        }
        return 9_000;
    }

    function systemChargeBps() internal pure returns (uint16) {
        return SYSTEM_CHARGE_BPS;
    }

    function isRecycleOnlyPosition(OrbitType orbitType, uint8 position) internal pure returns (bool) {
        _validatePosition(orbitType, position);
        return (orbitType == OrbitType.P4 && position == 4)
            || (orbitType == OrbitType.P3 && position == 3);
    }

    function firstRecycleQualifyingArrival(OrbitType orbitType) internal pure returns (uint8) {
        if (orbitType == OrbitType.P39) return 26;
        if (orbitType == OrbitType.P14) return 7;
        if (orbitType == OrbitType.P12) return 8;
        if (orbitType == OrbitType.P6) return 3;
        if (orbitType == OrbitType.P4) return 4;
        return 3;
    }

    function _validatePosition(OrbitType orbitType, uint8 position) private pure {
        if (position == 0 || position > positionCount(orbitType)) {
            revert InvalidPosition(orbitType, position);
        }
    }
}
