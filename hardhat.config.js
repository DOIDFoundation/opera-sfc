require('@nomicfoundation/hardhat-toolbox');
require('dotenv/config');
require('@nomiclabs/hardhat-truffle5');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function accounts() {
  privatekey = process.env.PrivateKey;
  if (!privatekey)
    return {
      mnemonic: 'test test test test test test test test test test test junk',
    };
  return [privatekey];
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: 'localhost',
  networks: {
    doidtest: {
      gasPrice: 3000000000,
      url: 'https://rpc.testnet.doid.tech',
      accounts: accounts(),
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
