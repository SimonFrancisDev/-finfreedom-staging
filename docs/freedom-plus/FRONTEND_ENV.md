# Freedom-Plus frontend environment

Freedom-Plus remains hidden until a verified deployment is available. Configure these values with proxy addresses from the same deployment manifest.

```env
VITE_FREEDOM_PLUS_ENABLED=false
VITE_FREEDOM_PLUS_REGISTRATION_ADDRESS=
VITE_FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS=
VITE_FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS=
VITE_FREEDOM_PLUS_P39_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_P14_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_P12_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_P6_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_P4_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_P3_ORBIT_ADDRESS=
VITE_FREEDOM_PLUS_FPT_ADDRESS=
VITE_FREEDOM_PLUS_FPTR_ADDRESS=
VITE_FREEDOM_PLUS_NFT_MEMBERSHIP_ADDRESS=
VITE_FREEDOM_PLUS_NFT_REWARD_DISTRIBUTOR_ADDRESS=
```

The existing `VITE_USDT_ADDRESS`, RPC, chain and API variables are reused. Do not enable the feature until the backend reconciliation endpoint passes for the same addresses and deployment block.
