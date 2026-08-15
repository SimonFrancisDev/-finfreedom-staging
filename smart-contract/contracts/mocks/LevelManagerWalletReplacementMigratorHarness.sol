// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../migration/LevelManagerWalletReplacementMigrator.sol";

contract LevelManagerWalletReplacementMigratorHarness is LevelManagerWalletReplacementMigrator {
    function initializeHarness(address initialOwner) external initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
    }

    function seedParticipant(address wallet, uint8 highestActiveLevel, bool id1Downline) external {
        for (uint8 level = 1; level <= 10; ++level) {
            userLevelActivated[wallet][level] = level <= highestActiveLevel;
        }
        isID1Downline[wallet] = id1Downline;
    }

    function pauseHarness() external onlyOwner {
        _pause();
    }
}
