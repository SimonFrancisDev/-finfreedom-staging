// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FreedomPlusBaseVault.sol";

contract FreedomNFTPoolVault is FreedomPlusBaseVault {
    address public distributor;
    bool public distributorLocked;
    mapping(address => uint256) public reservedBalance;

    event DistributorConfigured(address indexed distributor);
    event RewardDisbursed(
        address indexed token,
        address indexed recipient,
        uint256 amount,
        bytes32 indexed distributionId
    );
    event RewardsReserved(
        address indexed token,
        uint256 amount,
        bytes32 indexed distributionId
    );

    error OnlyDistributor();
    error DistributorAlreadyConfigured();
    error InsufficientUnreservedBalance(uint256 available, uint256 requested);
    error InsufficientReservedBalance(uint256 reserved, uint256 requested);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(address initialOwner, address guardian_) public initializer {
        __FreedomPlusBaseVault_init(initialOwner, guardian_);
    }

    function configureDistributor(address distributor_) external onlyOwner {
        if (distributorLocked) revert DistributorAlreadyConfigured();
        _requireContract(distributor_);
        distributor = distributor_;
        distributorLocked = true;
        emit DistributorConfigured(distributor_);
    }

    function disburse(address token, address recipient, uint256 amount, bytes32 distributionId)
        external whenNotPaused nonReentrant
    {
        if (msg.sender != distributor) revert OnlyDistributor();
        uint256 reserved = reservedBalance[token];
        if (reserved < amount) revert InsufficientReservedBalance(reserved, amount);
        reservedBalance[token] = reserved - amount;
        _transfer(token, recipient, amount);
        emit RewardDisbursed(token, recipient, amount, distributionId);
    }

    function reserveRewards(address token, uint256 amount, bytes32 distributionId)
        external whenNotPaused
    {
        if (msg.sender != distributor) revert OnlyDistributor();
        _requireContract(token);
        if (amount == 0) revert InvalidAmount();
        uint256 balance = IERC20(token).balanceOf(address(this));
        uint256 available = balance - reservedBalance[token];
        if (available < amount) revert InsufficientUnreservedBalance(available, amount);
        reservedBalance[token] += amount;
        emit RewardsReserved(token, amount, distributionId);
    }

    function unreservedBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this)) - reservedBalance[token];
    }

    function _beforeWithdrawal(address token, uint256 amount) internal view override {
        uint256 balance = IERC20(token).balanceOf(address(this));
        uint256 available = balance - reservedBalance[token];
        if (available < amount) revert InsufficientUnreservedBalance(available, amount);
    }
}
