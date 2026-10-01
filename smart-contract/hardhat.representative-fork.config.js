const base = require('./hardhat.config');
if (!process.env.AMOY_RPC_URL) throw new Error('Explicit Amoy fork RPC required');
module.exports = {
  ...base,
  networks: {
    hardhat: {
      ...base.networks.hardhat,
      chainId: 80002,
      chains: {80002:{hardforkHistory:{london:0}}},
      forking: { url: process.env.AMOY_RPC_URL },
    },
  },
};
