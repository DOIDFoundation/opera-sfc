const hre = require('hardhat');

const SFC_ADDRESS = '0xfc00face00000000000000000000000000000000';

async function main() {
    const accounts = await hre.ethers.getSigners();
    console.log('account:', accounts[0].address);
    const proxy = await hre.ethers.getContractAt('SFC', SFC_ADDRESS);
    const constAddr = await proxy.constsAddress();
    console.log('ConstantsManager:', constAddr);
    const constants = await hre.ethers.getContractAt(
        'ConstantsManager',
        constAddr
    );

    console.log('owner:', await constants.owner());
    console.log(
        'targetGasPowerPerSecond:',
        await constants.targetGasPowerPerSecond()
    );
    const tx = await constants.updateTargetGasPowerPerSecond(1000000);
    console.log(tx);
    await tx;
    console.log('tx:', tx);
    console.log(
        'targetGasPowerPerSecond:',
        await constants.targetGasPowerPerSecond()
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
