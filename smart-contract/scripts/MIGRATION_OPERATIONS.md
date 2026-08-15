# Production Migration Operations

The wallet-replacement scripts form a controlled reproducibility chain.

## Discovery and Frozen Inputs

- auditWalletMigrationChainState.js
- auditWalletReplacementLiveReferences.js
- auditWalletReplacementOrbitPrestate.js
- buildWalletReplacementManifest.js
- buildWalletReplacementOrbitManifest.js

## Validation and Rehearsal

- validateWalletReplacementLayouts.js
- verifyWalletReplacementDescendantEdges.js
- runWalletReplacementForkRehearsal.js
- verifyWalletSurgerySourceProvenance.js

## Deployment and Governance

- deployWalletReplacementMigrators.js
- verifyWalletReplacementDeployments.js
- buildWalletReplacementProposalPackage.js
- validateWalletReplacementProposalPackage.js
- submitWalletReplacementProposalPackage.js

## Post-Execution Verification

- verifyWalletReplacementLiveCheckpoint.js
- verifyWalletReplacementMatrixStorage.js

Deployment and proposal submission scripts are state-changing. They require
explicit runtime credentials and must be run only against a reviewed manifest.
Never embed an RPC credential or signing key in these files. Before execution,
confirm chain ID, proxy addresses, implementation bytecode, multisig ownership,
paused state, proposal calldata, and rollback evidence.
