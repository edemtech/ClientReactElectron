import axios from 'axios';
import { apiPrefix, serverPort } from '../../etc/config.json';
const ip = apiPrefix + serverPort;

export function getData() {
  // return dispatch => {
  //   return axios.get(ip+'/api/users');
  // };
  return axios.get(ip+'/api/users');
}
