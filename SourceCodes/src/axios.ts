import { AxiosInterface } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helpers/util";

function createInstance(): AxiosInterface {
  console.log("createInstance called");
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance as AxiosInterface;
}

const axios = createInstance();
export default axios;