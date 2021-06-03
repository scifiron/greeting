require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
      hardhat: {
          chainId: 31337
      },
      ropsten: {
          url: process.env.ROPSTEN_URL,
          accounts: [ process.env.ROPSTEN_PK ]
      }
  }
};
