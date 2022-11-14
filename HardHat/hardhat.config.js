require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: './.env.local' });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const privateKey = process.env.PRIVATE_KEY

module.exports = {
  solidity: "0.8.10",
  defaultNetwork:"goerli",
  networks:{
    hardhat:{},
    goerli: {
      url: process.env.QUICKNODE_HTTP_URL,
      accounts: [privateKey],
    }
  }
};