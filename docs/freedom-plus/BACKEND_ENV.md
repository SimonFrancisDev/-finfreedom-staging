# Freedom-Plus Backend Environment

Freedom-Plus is opt-in. Keep `FREEDOM_PLUS_ENABLED=false` until the deployment manifest has been verified and the worker is ready to replay from the deployment block.

```dotenv
FREEDOM_PLUS_ENABLED=false
FREEDOM_PLUS_REALTIME_ENABLED=true
FREEDOM_PLUS_POLLING_ENABLED=false
FREEDOM_PLUS_START_BLOCK=0
FREEDOM_PLUS_REGISTRATION_ADDRESS=
FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS=
FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS=
FREEDOM_PLUS_P39_ORBIT_ADDRESS=
FREEDOM_PLUS_P14_ORBIT_ADDRESS=
FREEDOM_PLUS_P12_ORBIT_ADDRESS=
FREEDOM_PLUS_P6_ORBIT_ADDRESS=
FREEDOM_PLUS_P4_ORBIT_ADDRESS=
FREEDOM_PLUS_P3_ORBIT_ADDRESS=
FREEDOM_PLUS_FPT_ADDRESS=
FREEDOM_PLUS_FPTR_ADDRESS=
FREEDOM_PLUS_TOKEN_CONTROLLER_ADDRESS=
FREEDOM_NFT_MEMBERSHIP_ADDRESS=
FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS=
FREEDOM_NFT_POOL_VAULT_ADDRESS=
FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS=
```

Use the proxy addresses and earliest deployment block from `deployments-freedom-plus-staging/deployment-*.json`. Configure the same values on the API and worker, but only the worker runs the Freedom-Plus indexer. Realtime mode performs one bounded checkpoint recovery at startup and after a WebSocket reconnect; it does not run the recurring Freedom-Plus poller.
