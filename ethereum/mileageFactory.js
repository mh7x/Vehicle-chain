import web3 from './web3';
import MileageFactory from './build/MileageFactory.json';

const instance = new web3.eth.Contract(
    MileageFactory.abi,
    "0xBE279d24b8730f3570AAF5C60A3137564B0dE841"
);

export default instance;