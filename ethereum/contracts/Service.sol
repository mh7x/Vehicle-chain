// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ServiceFactory {
    address[] public deployedServices;

    function createService () public {
        address newService = address(new Service(msg.sender));
        deployedServices.push(newService);
    }

    function getDeployedServices() public view returns (address[] memory) {
        return deployedServices;
    }
}

contract Service {
    address public manager;
    address public car;
    string private service;
    string[] private services;

    constructor (address creator) {
        manager = creator;
    }
    
    // enters an address of the car
    function enterCar(address carAddress) public restricted {
        car = carAddress;
    }

    // enters new service
    function enterService(string memory newService) public restricted {
        services.push(newService);
    }
    
    // get service with index index
    function getIndexService(uint index) public view returns (string memory) {
        return services[index];
    }

    // get all services
    function getServices() public view returns (string[] memory) {
        return services;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

}