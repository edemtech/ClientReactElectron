import axios from 'axios';
import { apiPrefix, serverPort } from '../../etc/config.json';
import { EDIT_USER, LOAD_TABLE } from './types';
const ip = apiPrefix + serverPort;

export function setUsersTable(table) {
  return {
    type: LOAD_TABLE,
    payload: table
  };
}
export function loadTable() {
  console.log('loading table..')
  return dispatch => {
    return axios.get(ip+'/api/users').then(res => {
      const data = res.data;
      dispatch(setUsersTable(data));
    });
  }
  // return axios.get(ip+'/api/users').then(res => {
  //   const data = res.data.data;
  //   // console.log(...data);
  //   setUsersTable(data);
  // });
}





export function setEditingUser(user) {
  return {
    type: EDIT_USER,
    user
  };
}
export function getUsers() {
  return dispatch => {
    return axios.get(ip+'/api/users');
  };
  // return axios.get(ip+'/api/users');
}

// export function getUser(userId) {
//   return axios.get(ip+'/api/users/'+userId);
// }


export function getUser(userId) {
  return dispatch => {
    return axios.get(ip+'/api/users/'+userId).then(res => {
      console.log(console.log(res.data.user));
      dispatch(setEditingUser(res.data.user));
    });
  }
  // return axios.get(ip+'/api/users/'+userId).then(res => {
  //   console.log(console.log(res.data.user));
  // });
}
