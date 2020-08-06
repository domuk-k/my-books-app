import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions';

const initialState = {
  loading: false,
  token: null,
  error: null,
};
export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
