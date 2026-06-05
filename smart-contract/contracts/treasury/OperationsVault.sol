// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract OperationsVault is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdt;

    event OperationsDisbursement(address indexed recipient, uint256 amount, string reason);
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

    function disburse(
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyOwner nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        usdt.safeTransfer(recipient, amount);
        emit OperationsDisbursement(recipient, amount, reason);
    }

    function recoverToken(
        IERC20 token,
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyOwner nonReentrant {
        require(address(token) != address(usdt), "Use disburse for USDT");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        token.safeTransfer(recipient, amount);
        emit TokenRecovered(address(token), recipient, amount, reason);
    }
}
