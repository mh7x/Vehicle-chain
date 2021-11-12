// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ServiceEntry {
    String public serviceMessage;
    mapping(address => uint256) mileages;

    // Entering mileage
    function enterService(string service) public returns (String)
    {
        serviceMessage = service;

        return serviceMessage;
    }

    // Get mileage of a car
    function getMileageOfCar(address carId) public view returns (uint256) {
        return mileages[carId];
    }
}
