var MileageEntry = artifacts.require("MileageEntry");
var ServiceEntry = artifacts.require("ServiceEntry");

module.exports = function(deployer) {
    deployer.deploy(MileageEntry);
    deployer.deploy(ServiceEntry);
}