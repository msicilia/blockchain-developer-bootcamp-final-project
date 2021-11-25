const SpeedRunStub = artifacts.require("SpeedRunRepo_Stub");
const SpeedRunOraclized = artifacts.require("SpeedRunRepoOraclized");


module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SpeedRunStub);
  if (network=="kovan"){
    console.log("Deploying also Chainlink-based speedrun repo.");
    await deployer.deploy(SpeedRunOraclized);
  }
};