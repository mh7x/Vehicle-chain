import web3 from "./web3";
import Insurance from "./build/Insurance.json";

const insurance = (address) => {
  return new web3.eth.Contract(Insurance.abi, address);
};

export default insurance;