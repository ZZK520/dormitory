import axios from "axios";
import {MAIN_IP} from '../configuration'

export default axios.create({
  
  baseURL: MAIN_IP,
  timeout: 1000 * 60 * 2,
  headers: {
    "Content-type": "application/json",
    
  }
});