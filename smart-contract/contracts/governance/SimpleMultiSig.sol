// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleMultiSig {

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Deposit(address indexed sender, uint256 amount);
    event Submit(uint256 indexed txId);
    event Confirm(address indexed owner, uint256 indexed txId);
    event Revoke(address indexed owner, uint256 indexed txId);
    event Execute(uint256 indexed txId);
    event Queued(uint256 indexed txId, uint256 executeAfter);
    event Cancel(uint256 indexed txId);

    event OwnerAdded(address owner);
    event OwnerRemoved(address owner);
    event OwnerReplaced(address oldOwner, address newOwner);
    event RequirementChanged(uint256 newRequirement);
    event ProposalSubmitterUpdated(address indexed submitter, bool allowed);

    /*//////////////////////////////////////////////////////////////
                                STRUCTS
    //////////////////////////////////////////////////////////////*/

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        bool cancelled;
        uint256 confirmations;
        uint256 submittedAt;
        uint256 executeAfter;
    }

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    address[] public owners;
    mapping(address => bool) public isOwner;
    mapping(address => bool) public isProposalSubmitter;

    uint256 public requiredConfirmations;
    uint256 public timelockDelay;

    Transaction[] public transactions;

    mapping(uint256 => mapping(address => bool)) public approved;

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    modifier onlyOwnerOrSubmitter() {
        require(isOwner[msg.sender] || isProposalSubmitter[msg.sender], "Not owner or submitter");
        _;
    }

    modifier onlySelf() {
        require(msg.sender == address(this), "Only multisig");
        _;
    }

    modifier txExists(uint256 txId) {
        require(txId < transactions.length, "Tx does not exist");
        _;
    }

    modifier notExecuted(uint256 txId) {
        require(!transactions[txId].executed, "Tx already executed");
        require(!transactions[txId].cancelled, "Tx cancelled");
        _;
    }

    modifier notApproved(uint256 txId) {
        require(!approved[txId][msg.sender], "Already approved");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address[] memory _owners,
        uint256 _requiredConfirmations,
        uint256 _timelockDelay
    ) {
        require(_owners.length > 0, "Owners required");
        require(
            _requiredConfirmations > 0 &&
            _requiredConfirmations <= _owners.length,
            "Invalid confirmations"
        );
        require(_timelockDelay > 0, "Invalid timelock");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        requiredConfirmations = _requiredConfirmations;
        timelockDelay = _timelockDelay;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    /*//////////////////////////////////////////////////////////////
                        TRANSACTION LOGIC
    //////////////////////////////////////////////////////////////*/

    function submitTransaction(
        address to,
        uint256 value,
        bytes memory data
    ) external onlyOwnerOrSubmitter returns (uint256 txId) {
        txId = transactions.length;

        uint256 executeAfter = block.timestamp + timelockDelay;

        transactions.push(Transaction({
            to: to,
            value: value,
            data: data,
            executed: false,
            cancelled: false,
            confirmations: 0,
            submittedAt: block.timestamp,
            executeAfter: executeAfter
        }));

        emit Submit(txId);
        emit Queued(txId, executeAfter);
    }

    function approveTransaction(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
        notApproved(txId)
    {
        approved[txId][msg.sender] = true;
        transactions[txId].confirmations += 1;

        emit Confirm(msg.sender, txId);
    }

    function executeTransaction(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
    {
        Transaction storage txn = transactions[txId];

        require(
            txn.confirmations >= requiredConfirmations,
            "Not enough confirmations"
        );

        require(
            block.timestamp >= txn.executeAfter,
            "Timelock not expired"
        );

        txn.executed = true;

        (bool success, ) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Tx failed");

        emit Execute(txId);
    }

    function cancelTransaction(uint256 txId)
        external
        onlySelf
        txExists(txId)
        notExecuted(txId)
    {
        transactions[txId].cancelled = true;
        emit Cancel(txId);
    }

    function setProposalSubmitter(address submitter, bool allowed) external onlySelf {
        require(submitter != address(0), "Invalid submitter");
        isProposalSubmitter[submitter] = allowed;
        emit ProposalSubmitterUpdated(submitter, allowed);
    }

    function revokeConfirmation(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
    {
        require(approved[txId][msg.sender], "Not approved");

        approved[txId][msg.sender] = false;
        transactions[txId].confirmations -= 1;

        emit Revoke(msg.sender, txId);
    }

    /*//////////////////////////////////////////////////////////////
                        OWNER MANAGEMENT (SELF ONLY)
    //////////////////////////////////////////////////////////////*/

    function addOwner(address owner) external onlySelf {
        require(owner != address(0), "Invalid owner");
        require(!isOwner[owner], "Already owner");

        isOwner[owner] = true;
        owners.push(owner);

        emit OwnerAdded(owner);
    }

    function removeOwner(address owner) external onlySelf {
        require(isOwner[owner], "Not owner");

        isOwner[owner] = false;
        _clearPendingApprovals(owner);

        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }

        require(
            requiredConfirmations <= owners.length,
            "Threshold too high"
        );

        emit OwnerRemoved(owner);
    }

    function replaceOwner(address oldOwner, address newOwner) external onlySelf {
        require(isOwner[oldOwner], "Old not owner");
        require(newOwner != address(0), "Invalid owner");
        require(!isOwner[newOwner], "New already owner");

        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == oldOwner) {
                owners[i] = newOwner;
                break;
            }
        }

        isOwner[oldOwner] = false;
        isOwner[newOwner] = true;
        _clearPendingApprovals(oldOwner);

        emit OwnerReplaced(oldOwner, newOwner);
    }

    function _clearPendingApprovals(address owner) internal {
        for (uint256 i = 0; i < transactions.length; i++) {
            Transaction storage txn = transactions[i];
            if (!txn.executed && !txn.cancelled && approved[i][owner]) {
                approved[i][owner] = false;
                txn.confirmations -= 1;
            }
        }
    }

    function changeRequirement(uint256 _requiredConfirmations) external onlySelf {
        require(
            _requiredConfirmations > 0 &&
            _requiredConfirmations <= owners.length,
            "Invalid requirement"
        );

        requiredConfirmations = _requiredConfirmations;

        emit RequirementChanged(_requiredConfirmations);
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getOwners() external view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
}
