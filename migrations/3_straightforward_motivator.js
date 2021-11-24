const SpeedRunStub = artifacts.require("SpeedRunRepo_Stub");
const StraightForwardMotivator = artifacts.require("StraightForwardMotivator");

module.exports = async function (deployer) {
  const repo = await SpeedRunStub.deployed();  
  console.log(repo);
  await deployer.deploy(StraightForwardMotivator, repo.address);
};