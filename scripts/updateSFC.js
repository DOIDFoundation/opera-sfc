const hre = require('hardhat');

const SFC_ADDRESS = '0xfc00face00000000000000000000000000000000';
const NODE_AUTH_ADDRESS = '0xd100ae0000000000000000000000000000000000';

async function main() {
    const accounts = await hre.ethers.getSigners();
    console.log('account:', accounts[0].address);
    const sfc = await hre.ethers.getContractAt('SFC', SFC_ADDRESS);
    console.log('sfc code:', await sfc.getDeployedCode());
    console.log('sfc owner:', await sfc.owner());
    const nodeAuth = await hre.ethers.getContractAt(
        'NodeDriverAuth',
        NODE_AUTH_ADDRESS
    );
    console.log('node auth owner:', await nodeAuth.owner());

    const newSFC = await hre.ethers.deployContract('SFC');
    await newSFC.waitForDeployment();
    console.log('new address:', await newSFC.getAddress());

    const tx = await nodeAuth.upgradeCode(SFC_ADDRESS, newSFC.getAddress());
    console.log('upgrade tx:', tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
