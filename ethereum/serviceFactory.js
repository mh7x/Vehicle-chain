import web3 from './web3';
import ServiceFactory from './build/ServiceFactory.json';

const instance = new web3.eth.Contract(
    ServiceFactory.abi,
    "0x040AFADEbBeB1064A9636d7d35F15A093126Fd84"
);

export default instance;