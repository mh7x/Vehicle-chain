// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MileageFactory {
    address[] public deployedMileages;

    function createMileage () public {
        address newMileage = address(new Mileage(msg.sender));
        deployedMileages.push(newMileage);
    }

    function getDeployedMileages() public view returns (address[] memory) {
        return deployedMileages;
    }
}

contract Mileage {
    address public car;
    address public manager;
    uint[] private mileages; // total mileages

    constructor (address creator) {
        manager = creator;
        mileages = [0];
    }

    // enters an address of the car
    function enterCar(address carAddress) public restricted {
        car = carAddress;
    }

    // enters new mileage
    function enterMileage(uint newMileage) public restricted returns (uint diffMileage) {
        diffMileage = newMileage - mileages[mileages.length - 1];
        mileages.push(newMileage);
        return diffMileage;
    }

    // gets new mileage
    function getMileage() public view returns (uint) {
        return mileages[mileages.length - 1];
    }

    // gets mileages
    function getMileages() public view returns (uint[] memory) {
        return mileages;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


}