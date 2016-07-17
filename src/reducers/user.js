import {
  CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE,
  VALID_TOKEN
} from '../actions/user'

export default function user(state = {}, action) {
    switch (action.type) {
      case CHECK_AUTH_SUCCESS:
        return Object.assign({}, state, {
          status: true,
          user: action.req.data.user,
          user_id: action.req.data.user.id,
          token: action.req.data.token,
        });
      case CHECK_AUTH_FAILURE:
        return Object.assign({}, state, {
          status: false,
          user: null,
          user_id: null,
          token: null,
        });
      case VALID_TOKEN:
        return Object.assign({}, state, {
          status: true,
          user: action.user,
          user_id: action.user.id,
          token: action.token,
        })
      default:
        return state;
    }
}
