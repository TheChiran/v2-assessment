import axios from "axios";
import { dev_URL } from "./apis/urls";

export default axios.create({
  baseURL: `${dev_URL}`,
});
