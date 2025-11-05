const hre = require("hardhat");

async function main() {
  console.log("Deploying CrowdFunding contract to Sepolia...");

  // Get the contract factory
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  
  // Deploy the contract
  const crowdFunding = await CrowdFunding.deploy();
  
  // Wait for deployment to finish
  await crowdFunding.deployed();

  console.log("✅ CrowdFunding contract deployed to:", crowdFunding.address);
  console.log("\n📝 Update this address in your client code:");
  console.log("   - client/src/client.ts");
  console.log("   - client/src/context/index.jsx");
  console.log("\n🔗 View on Etherscan:");
  console.log(`   https://sepolia.etherscan.io/address/${crowdFunding.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
