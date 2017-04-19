import axios from 'axios';
import { apiPrefix, serverPort } from '../../etc/config.json';
const ip = apiPrefix + serverPort;

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(ip+'/api/users', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(ip+`/api/users/${identifier}`);
  }
}
