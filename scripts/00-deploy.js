const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying the smart contract...");

    const Medical = await ethers.getContractFactory("MedicalRecord");
    const accounts = await ethers.getSigners();
    const medical = await Medical.connect(accounts[0]).deploy();

    await medical.waitForDeployment();  

    console.log(`Medical contract deployed to: ${medical.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });