import axios from 'axios';
import { apiPrefix, serverPort } from '../../etc/config.json';
const ip = apiPrefix + serverPort;

export function createEvent(event) {
  return dispatch => {
    return axios.post(ip+'/api/events', event);
  };
}
