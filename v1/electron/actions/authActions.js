import * as types from './actionTypes'

export function authSuccess(userData) {
  return {
    type: types.SUCCESS_AUTH,
    userData
  }
}

export function updateUserData(userData){
  return {
    type: types.ERROR_AUTH,
    userData
  }
}

export function loadingUserData(){
  return {
    type: types.LOADING_USER_DATA
  }
}
