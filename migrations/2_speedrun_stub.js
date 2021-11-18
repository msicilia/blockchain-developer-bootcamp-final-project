const SpeedRunStub = artifacts.require("SpeedRunRepo_Stub");

module.exports = function (deployer) {
  deployer.deploy(SpeedRunStub);
};