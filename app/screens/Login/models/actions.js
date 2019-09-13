import actionTypes from './actionTypes';

const getLogin = (payload) => {
  return {
    type: actionTypes.GET_LOGIN,
    payload
  }
}

const getLoginResponse = payload => {
  return {
    type: actionTypes.GET_LOGIN_SUCCESS,
    payload
  }
}

export default {
  getLogin,
  getLoginResponse
}