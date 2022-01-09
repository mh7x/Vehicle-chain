// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InsuranceFactory {
    address[] public deployedInsurances;

    function createInsurance(address initialCar, address initialOwner) public {
        address newInsurance = address(new Insurance(initialCar, initialOwner, msg.sender));
        deployedInsurances.push(newInsurance);
    }

    function getDeployedInsurances() public view returns (address[] memory) {
        return deployedInsurances;
    }
}

contract Insurance {
    address public car;
    address public manager;
    address private owner;
    string[] private publicInsurances;
    string[] private privateInsurances;

    constructor (address initialCar, address initialOwner, address creator) {
        manager = creator;
        car = initialCar;
        owner = initialOwner;
    }

    // enters public part of insurance
    function enterPublic(string memory insurancePack) public restricted {
        publicInsurances.push(insurancePack);
    }

    // enters private part of Insurance
    function enterPrivate(string memory insurancePack) public restricted {
        privateInsurances.push(insurancePack);
    }

    // gets public part of insurance
    function getPublic() public view returns (string[] memory) {
        return publicInsurances;
    }

    // gets private part of insurance
    function getPrivate() public view owns returns (string[] memory) {
        return privateInsurances;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier owns() {
        require(msg.sender == owner || msg.sender == manager);
        _;
    }

}