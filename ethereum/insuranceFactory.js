import web3 from './web3';
import InsuranceFactory from './build/InsuranceFactory.json';

const instance = new web3.eth.Contract(
    InsuranceFactory.abi,
    "0xA14Cc64f77df9fD87570494175dD1238345Ddc71"
);

export default instance;