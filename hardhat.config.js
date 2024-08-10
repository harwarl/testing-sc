require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.TEST_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
    },
    sepolia1: {
      chainId: 11155111,
      url: process.env.TEST_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY2],
    },
  },
};
