import axios from 'axios';
import { apiPrefix, serverPort } from '../../etc/config.json';
import { LOAD_TABLE, EDIT_USER } from './types';
const ip = apiPrefix + serverPort;

export function setUsersTable(table) {
  return {
    type: LOAD_TABLE,
    payload: table
  };
}
export function loadTable() {
  return dispatch => {
    return axios.get(ip+'/api/users').then(res => {
      const data = res.data;
      dispatch(setUsersTable(data));
    });
  }
}
///////////////////////////////////////
export function setEditingUser(user) {
  return {
    type: EDIT_USER,
    user
  };
}
export function getUser(userId) {
  return dispatch => {
    return axios.get(ip+'/api/users/'+userId).then(res => {
      console.log(console.log('respond', res.data.user));
      const data = res.data.user;
      dispatch(setEditingUser(data));
    });
  }
}
