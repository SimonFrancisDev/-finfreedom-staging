// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

interface IFreedomPlusVaultGuardian {
    function validateUpgrade(address proxy, address implementation) external view returns (bool);
}

abstract contract FreedomPlusBaseVault is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    address public guardian;

    event Withdrawal(
        address indexed token,
        address indexed recipient,
        uint256 amount,
        bytes32 indexed reason
    );
    event GuardianUpdated(address indexed previousGuardian, address indexed newGuardian);

    error InvalidAddress();
    error InvalidContract(address target);
    error InvalidAmount();

    function __FreedomPlusBaseVault_init(address initialOwner, address guardian_)
        internal onlyInitializing
    {
        if (initialOwner == address(0)) revert InvalidAddress();
        _requireContract(guardian_);
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        guardian = guardian_;
    }

    function _authorizeUpgrade(address implementation) internal view override onlyOwner {
        _requireContract(implementation);
        if (!IFreedomPlusVaultGuardian(guardian).validateUpgrade(address(this), implementation)) {
            revert InvalidContract(implementation);
        }
    }

    function withdraw(address token, address recipient, uint256 amount, bytes32 reason)
        external onlyOwner whenNotPaused nonReentrant
    {
        _beforeWithdrawal(token, amount);
        _transfer(token, recipient, amount);
        emit Withdrawal(token, recipient, amount, reason);
    }

    function _beforeWithdrawal(address, uint256) internal view virtual {}

    function setGuardian(address guardian_) external onlyOwner {
        _requireContract(guardian_);
        address previous = guardian;
        guardian = guardian_;
        emit GuardianUpdated(previous, guardian_);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _transfer(address token, address recipient, uint256 amount) internal {
        _requireContract(token);
        if (recipient == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();
        SafeERC20.safeTransfer(IERC20(token), recipient, amount);
    }

    function _requireContract(address target) internal view {
        if (target == address(0) || target.code.length == 0) revert InvalidContract(target);
    }

    uint256[48] private __gap;
}
