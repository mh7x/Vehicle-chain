import web3 from "./web3";
import Service from "./build/Service.json";

const service = (address) => {
  return new web3.eth.Contract(Service.abi, address);
};

export default service;