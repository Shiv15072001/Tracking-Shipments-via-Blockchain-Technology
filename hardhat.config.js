require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    viaIR: true,
  },
  networks: {
    hardhat: {
      chainId: 31337, // MetaMask requires a fixed chainId
    }
  }
};