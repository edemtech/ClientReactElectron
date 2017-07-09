import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

import { apiPrefix, serverPort } from '../../etc/config.json';
const ip = apiPrefix + serverPort;

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post(ip+'/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));//предоставляем токен, который является объектом пользователя
    });

  }
}
