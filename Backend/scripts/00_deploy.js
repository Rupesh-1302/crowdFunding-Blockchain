const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const { network, ethers } = hre;
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  console.log("Deploying CrowdFunding...");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.deployed();

  console.log("CrowdFunding details", crowdFunding);
  function updateFrontend() {
    console.log("Updating frontend...");
    const crowdFundingAddressPath =
      "../frontend/src/web3context/contractAddress.json";
    const crowdFundingAbiPath = "../frontend/src/web3context/contractAbi.json";
    const crowdFundingAddressContent = JSON.parse(
      fs.readFileSync(crowdFundingAddressPath)
    );
    console.log(network.config.chainId);
    crowdFundingAddressContent[network.config.chainId] = crowdFunding.address;
    fs.writeFileSync(
      crowdFundingAddressPath,
      JSON.stringify(crowdFundingAddressContent)
    );
    fs.writeFileSync(
      crowdFundingAbiPath,
      crowdFunding.interface.format(ethers.utils.FormatTypes.json)
    );
  }

  updateFrontend();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
