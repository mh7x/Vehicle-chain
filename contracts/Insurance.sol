// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Insurance {
    address public car;
    address public manager;
    address private owner;
    string[] private publicInsurances;
    string[] private privateInsurances;

    constructor (address initialCar, address initialOwner) {
        manager = msg.sender;
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