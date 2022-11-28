require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// https://eth-goerli.g.alchemy.com/v2/ah_pzf2QJljrdZR1767g-aA2WxMwPxj0
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/ah_pzf2QJljrdZR1767g-aA2WxMwPxj0",
      accounts: ["account"] // private key
    }
  },
  solidity: {
    compilers:[
      {version: "0.8.7"}, {version: "0.4.24"}, {version: "0.6.6"}, {version: "0.7.0"}
    ]
  },
  namedAccounts: {
    deployer: 0
  }
};
