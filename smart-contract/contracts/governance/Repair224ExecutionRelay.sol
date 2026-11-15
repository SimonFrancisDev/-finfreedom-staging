// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRepair224Governance {
    function transactions(uint256 id) external view returns (
        address to, uint256 value, bytes memory data, bool executed, bool cancelled,
        uint256 confirmations, uint256 submittedAt, uint256 executeAfter
    );
    function executeTransaction(uint256 id) external;
}

/// @notice Candidate only: requires explicit governance approval before any live use.
/// @dev Cannot submit, approve, cancel, change owners, or execute any other proposal.
contract Repair224ExecutionRelay {
    address public constant GOVERNANCE = 0x785cC854ce9e13CE1140cbFD7C08620713E1711d;
    address public constant OPERATOR = 0x884e48f9897E8633238747b608DD49dE12bF94df;
    address public constant TARGET = 0xd952d21B114F54C1259470b1693893F4D0Dd50Ed;
    uint256 public constant PROPOSAL_ID = 224;
    bytes32 public constant GOVERNANCE_CODE_HASH = 0x39381be5a244f93beb7d4f297de0f4cd7a211cb0676d67f5e4decefba4fcc0fa;
    bytes32 public constant PAYLOAD_HASH = 0x9d90c584451bdbc4214260b02891790175ec2e2a64e26fb08f86278b2abd0b9b;
    bool public executed;

    event RepairProposalExecuted(uint256 indexed proposalId);

    constructor() {
        require(block.chainid == 137, "Wrong chain");
        require(GOVERNANCE.codehash == GOVERNANCE_CODE_HASH, "Governance code changed");
        (address target, uint256 value, bytes memory data, bool done, bool cancelled,,,) =
            IRepair224Governance(GOVERNANCE).transactions(PROPOSAL_ID);
        require(target == TARGET && value == 0 && keccak256(data) == PAYLOAD_HASH, "Proposal changed");
        require(!done && !cancelled, "Proposal unavailable");
    }

    function execute() external {
        require(block.chainid == 137, "Wrong chain");
        require(msg.sender == OPERATOR, "Not operator");
        require(!executed, "Already executed");
        require(GOVERNANCE.codehash == GOVERNANCE_CODE_HASH, "Governance code changed");
        // This verified governance bytecode cannot edit an existing proposal's
        // target/value/calldata. Bind that immutable record once in the constructor.
        // The multisig still enforces its existing quorum and timelock. Any
        // downstream failure rolls back this flag and the entire repair.
        executed = true;
        IRepair224Governance(GOVERNANCE).executeTransaction(PROPOSAL_ID);
        emit RepairProposalExecuted(PROPOSAL_ID);
    }
}
