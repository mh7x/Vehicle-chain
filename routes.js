const routes = require('next-routes')();

routes
    .add("/contracts/insurance", "/contracts/insurance")
    .add("/contracts/insurance/new", "contracts/insurances/new")
    .add("/contracts/insurance/:address", "/contracts/insurances/info")
    .add("/contracts/insurance/:address/entry", "contracts/insurances/entry")
    .add("/contracts/insurance/:address/private", "contracts/insurances/private")
    .add("/contracts/mileage", "/contracts/mileage")
    .add("/contracts/mileage/:address", "/contracts/mileages/info")
    .add("/contracts/mileage/:address/entry", "contracts/mileages/entry")
    .add("/contracts/service", "/contracts/service")
    .add("/contracts/service/:address", "/contracts/services/info")
    .add("/contracts/service/:address/entry", "contracts/services/entry")

module.exports = routes;