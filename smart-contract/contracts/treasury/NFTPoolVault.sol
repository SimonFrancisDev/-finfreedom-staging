// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTPoolVault is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdt;

    struct DistributionRoot {
        bytes32 merkleRoot;
        string metadataURI;
        bool active;
    }

    mapping(bytes32 => DistributionRoot) public distributionRoots;

    event DistributionRootSet(bytes32 indexed distributionId, bytes32 indexed merkleRoot, string metadataURI, string reason);
    event NFTPoolDistribution(address indexed recipient, uint256 amount, bytes32 indexed distributionId, string reason);
    event TokenRecovered(address indexed token, address indexed recipient, uint256 amount, string reason);

    constructor(IERC20 _usdt, address initialOwner) Ownable(initialOwner) {
        require(address(_usdt) != address(0), "Invalid USDT");
        require(initialOwner != address(0), "Invalid owner");
        usdt = _usdt;
    }

    receive() external payable {
        revert("Native token not accepted");
    }

    function balance() external view returns (uint256) {
        return usdt.balanceOf(address(this));
    }

    function setDistributionRoot(
        bytes32 distributionId,
        bytes32 merkleRoot,
        string calldata metadataURI,
        string calldata reason
    ) external onlyOwner {
        require(distributionId != bytes32(0), "Invalid distribution");
        require(merkleRoot != bytes32(0), "Invalid root");

        distributionRoots[distributionId] = DistributionRoot({
            merkleRoot: merkleRoot,
            metadataURI: metadataURI,
            active: true
        });

        emit DistributionRootSet(distributionId, merkleRoot, metadataURI, reason);
    }

    function distribute(
        address recipient,
        uint256 amount,
        bytes32 distributionId,
        string calldata reason
    ) external onlyOwner nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        if (distributionId != bytes32(0)) {
            require(distributionRoots[distributionId].active, "Distribution not active");
        }

        usdt.safeTransfer(recipient, amount);
        emit NFTPoolDistribution(recipient, amount, distributionId, reason);
    }

    function recoverToken(
        IERC20 token,
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyOwner nonReentrant {
        require(address(token) != address(usdt), "Use distribute for USDT");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        token.safeTransfer(recipient, amount);
        emit TokenRecovered(address(token), recipient, amount, reason);
    }
}
