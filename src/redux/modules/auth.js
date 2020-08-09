import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import { push } from 'connected-react-router';
import {
  takeEvery,
  takeLeading,
  call,
  put,
  delay,
  select,
} from 'redux-saga/effects';

const prefix = 'my-books/auth';
// action type
const START = `${prefix}/START`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// action creator
const loginStart = () => ({
  type: START,
});
const loginSucess = token => ({
  type: SUCCESS,
  token,
});
const loginFail = error => ({
  type: FAIL,
  error,
});

// initial state
const initialState = {
  loading: false,
  token: null,
  error: null,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        token: action.token,
        error: null,
        loading: false,
      };
    case FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

//  loginThunk
// export function loginThunk(email, password, history) {
//   return async dispatch => {
//     try {
//       dispatch(loginStart());
//       const token = await UserService.login(email, password);
//       // 1. 받아온 토큰을 저장한다.
//       TokenService.setToken(token);
//       dispatch(loginSucess(token));
//       // 2. 홈으로 이동시킨다.
//       dispatch(push('/'));
//     } catch (error) {
//       dispatch(loginFail(error));
//     }
//   };
// }

//saga-action
const START_LOGIN_SAGA = 'START_LOGIN_SAGA';
const START_LOGOUT_SAGA = 'START_LOGOUT_SAGA';

//saga-action-creator
export const startLoginSagaActionCreator = (email, password) => ({
  type: START_LOGIN_SAGA,
  payload: {
    email,
    password,
  },
});

export const startLogoutActionCreator = () => ({
  type: START_LOGOUT_SAGA,
});

//saga-reducer
function* startLoginSaga(action) {
  // 비동기 로직
  const { email, password } = action.payload;
  try {
    yield put(loginStart());
    yield delay(1000);
    const token = yield call(UserService.login, email, password);
    console.log(token);
    // 1. 받아온 토큰을 저장한다.
    TokenService.setToken(token);
    yield put(loginSucess(token));
    // 2. 홈으로 이동시킨다.
    yield put(push('/'));
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* startLogoutSaga() {
  const token = yield select(state => state.auth.token);
  TokenService.clear();
  yield put(loginSucess(null));
  yield put(push('/signin'));
  try {
    yield call(UserService.logout, token);
  } catch (error) {}
}

// saga-reducer-controller
// (액션=>어떤사가로직)에 대해 룰을 정하라.
export function* authSaga() {
  yield takeEvery(START_LOGIN_SAGA, startLoginSaga);
  yield takeLeading(START_LOGOUT_SAGA, startLogoutSaga);
}
