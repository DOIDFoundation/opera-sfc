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

task('balance', 'Prints the balance of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address, hre.ethers.formatEther(await account.provider.getBalance(account.address)))
  }
})

function accounts() {
    const privatekey = process.env.PrivateKey;
    if (!privatekey)
        return {
            mnemonic:
                'test test test test test test test test test test test junk',
        };
    return [privatekey];
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    // defaultNetwork: 'localhost',
    networks: {
        localhost: {
            // gasPrice: 100000000000,
            url: 'http://localhost:18545',
            accounts: accounts(),
        },
        doidtest: {
            // gasPrice: 100000000000,
            url: 'https://rpc.testnet.doid.tech',
            accounts: accounts(),
        },
        doid: {
            // gasPrice: 100000000000,
            url: 'https://rpc.doid.tech',
            accounts: accounts(),
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY ?? 'no_key',
        customChains: [
            {
                network: 'doid',
                chainId: 0xd01d,
                urls: {
                    apiURL: 'https://scan.doid.tech/api',
                    browserURL: 'https://scan.doid.tech',
                },
            },
            {
                network: 'doidtest',
                chainId: 0xdddd,
                urls: {
                    apiURL: 'https://scan.testnet.doid.tech/api',
                    browserURL: 'https://scan.testnet.doid.tech',
                },
            },
        ],
    },
    solidity: {
        compilers: [
            {
                version: '0.5.17',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 10000,
                    },
                },
            },
        ],
    },
};
