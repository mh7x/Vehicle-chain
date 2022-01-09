/***
* Compile file is currently not working, I will use REMIX compiler instead
*/

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const insurancePath = path.resolve(__dirname, 'contracts', 'Insurance.sol');
const mileagePath = path.resolve(__dirname, 'contracts', 'Mileage.sol');
const servicePath = path.resolve(__dirname, 'contracts', 'Service.sol');

/* Insurance compile */
const source = fs.readFileSync(insurancePath, 'utf-8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

/* Mileage compile */
source = fs.readFileSync(mileagePath, 'utf-8');
output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

/* Service compile */
source = fs.readFileSync(servicePath, 'utf-8');
output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}