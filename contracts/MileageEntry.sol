// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MileageEntry {
    mapping(address => uint256) mileages;

    // Entering mileage
    function enter(uint256 mileage, address carId) public returns (bool sufficient)
    {
        if (mileage < 0) return false;
        mileages[carId] += mileage;
        return true;
    }

    // Get mileage of a car
    function getMileageOfCar(address carId) public view returns (uint256) {
        return mileages[carId];
    }
}
