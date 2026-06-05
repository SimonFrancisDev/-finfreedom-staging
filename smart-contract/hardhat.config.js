require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const amoyRpcUrl = process.env.AMOY_RPC_URL || process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology";
const polygonRpcUrl = process.env.POLYGON_RPC_URL || process.env.MAINNET_RPC_URL || "";
function readPrivateKey() {
  const raw = (process.env.PRIVATE_KEY || "").trim();
  if (!raw) {
    return [];
  }

  const privateKey = raw.startsWith("0x") ? raw : `0x${raw}`;
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error("PRIVATE_KEY must be a 32-byte hex private key, with or without 0x prefix");
  }

  return [privateKey];
}

const privateKey = readPrivateKey();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
      viaIR: true,
    },
  },

  networks: {
    hardhat: {
      accounts: {
        count: 30,
        accountsBalance: "10000000000000000000000",
      },
    },
    amoy: {
      url: amoyRpcUrl,
      chainId: 80002,
      accounts: privateKey,
      gas: "auto",
      gasPrice: process.env.AMOY_GAS_PRICE ? Number(process.env.AMOY_GAS_PRICE) : "auto",
      timeout: 300000,
    },
    polygon: {
      url: polygonRpcUrl,
      chainId: 137,
      accounts: privateKey,
      gas: "auto",
      gasPrice: process.env.POLYGON_GAS_PRICE ? Number(process.env.POLYGON_GAS_PRICE) : "auto",
      timeout: 300000,
    },
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
    customChains: [
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com",
        },
      },
    ],
  },
};
