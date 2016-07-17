import request from 'axios'
import config from '../../package.json'

export const CHECK_AUTH = 'USERS/CHECK_AUTH'
export const CHECK_AUTH_REQUEST = 'USERS/CHECK_AUTH_REQUEST'
export const CHECK_AUTH_SUCCESS = 'USERS/CHECK_AUTH_SUCCESS'
export const CHECK_AUTH_FAILURE = 'USERS/CHECK_AUTH_FAILURE'

export const VALID_TOKEN = 'USERS/VALID_TOKEN'



export function auth(email, password) {
  return {
    type: CHECK_AUTH,
    auth: request.get(`http://${config.apiHost}:${config.apiPort}/auth/${email}/${password}`)
  };
}

export function tokenValid(user, token) {
  return {
    type: VALID_TOKEN,
    user: user,
    token: token
  }
}
