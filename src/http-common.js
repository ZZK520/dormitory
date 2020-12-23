import axios from "axios";
import {MAIN_IP} from '../configuration'

export default axios.create({
  baseURL: `http://${MAIN_IP}:8080`,
  timeout: 1000 * 60 * 2,
 
});