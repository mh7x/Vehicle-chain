const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledInsuranceFactory = require('./build/InsuranceFactory.json');
const compiledMileageFactory = require('./build/MileageFactory.json');
const compiledServiceFactory = require('./build/ServiceFactory.json')

const provider = new HDWalletProvider(
    'enjoy because neck access gate few gather hover engine remind cheese laundry',
    // remember to change this to your own phrase!
    'https://rinkeby.infura.io/v3/5c1d453e6df74f2791c96b94087d0b44'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();


    console.log('Attempting to deploy INSURANCE from account', accounts[0]);

    const resultInsurance = await new web3.eth.Contract(JSON.parse(compiledInsuranceFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract INSURANCE deployed to', resultInsurance.options.address);


    console.log('Attempting to deploy MILEAGE from account', accounts[0]);

    const resultMileage = await new web3.eth.Contract(JSON.parse(compiledMileageFactory.interface))
    .deploy({ data: compiledMileageFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract MILEAGE deployed to', resultMileage.options.address);


    console.log('Attempting to deploy SERVICE from account', accounts[0]);

    const resultService = await new web3.eth.Contract(JSON.parse(compiledServiceFactory.interface))
    .deploy({ data: compiledServiceFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract SERVICE deployed to', resultService.options.address);


    provider.engine.stop();
};

deploy();
