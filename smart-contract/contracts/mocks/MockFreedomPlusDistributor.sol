// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IMockFreedomNFTPoolVault {
    function reserveRewards(address token, uint256 amount, bytes32 distributionId) external;
    function disburse(
        address token,
        address recipient,
        uint256 amount,
        bytes32 distributionId
    ) external;
}

contract MockFreedomPlusDistributor {
    function reserve(
        address vault,
        address token,
        uint256 amount,
        bytes32 distributionId
    ) external {
        IMockFreedomNFTPoolVault(vault).reserveRewards(token, amount, distributionId);
    }

    function disburse(
        address vault,
        address token,
        address recipient,
        uint256 amount,
        bytes32 distributionId
    ) external {
        IMockFreedomNFTPoolVault(vault).disburse(
            token,
            recipient,
            amount,
            distributionId
        );
    }
}
