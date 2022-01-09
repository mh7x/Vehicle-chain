import web3 from "./web3";
import Mileage from "./build/Mileage.json";

const mileage = (address) => {
  return new web3.eth.Contract(Mileage.abi, address);
};

export default mileage;