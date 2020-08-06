import BookService from './services/BookService';
import UserService from './services/UserService';
import TokenService from './services/TokenService';
// 액션의 타입을 정의하여 변수로 빼는 단계
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// 액션 객체를 만들어 내는 함수 (액션 생성자)를 만드는 단계
export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function endLoading() {
  return {
    type: END_LOADING,
  };
}

// books
export const START_GET_BOOKS = 'START_GET_BOOKS';
export const SUCCESS_GET_BOOKS = 'SUCCESS_GET_BOOKS';
export const FAIL_GET_BOOKS = 'FAIL_GET_BOOKS';

export function startGetBooks() {
  return {
    type: START_GET_BOOKS,
  };
}

export function successGetBooks(books) {
  return {
    type: SUCCESS_GET_BOOKS,
    books,
  };
}

export function failGetBooks(error) {
  return {
    type: FAIL_GET_BOOKS,
    error,
  };
}
export function getBooksThunk() {
  return async (dispatch, getState) => {
    try {
      dispatch(startGetBooks());
      // await sleep(1000);
      const state = getState();
      const token = state.auth.token;
      const books = await BookService.getBooks(token);
      const covers = await BookService.getBookCovers(books);
      const books_integrated = books.map((book, i) => ({
        ...book,
        thumbnail: covers[i].thumbnail,
      }));
      dispatch(successGetBooks(books_integrated));
    } catch (error) {
      console.log(error);
      dispatch(failGetBooks(error));
    }
  };
}

// login

// {
//   loading: Boolean,
//   token: String,
//   error: null | boolean
// }

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const loginStart = () => ({
  type: LOGIN_START,
});
const loginSucess = token => ({
  type: LOGIN_SUCCESS,
  token,
});
const loginFail = error => ({
  type: LOGIN_FAIL,
  error,
});

export function loginThunk(email, password, history) {
  return async dispatch => {
    try {
      dispatch(loginStart());
      const token = await UserService.login(email, password);
      // 1. 받아온 토큰을 저장한다.
      TokenService.setToken(token);
      dispatch(loginSucess(token));
      // 2. 홈으로 이동시킨다.
      history.push('/');
    } catch (error) {
      dispatch(loginFail(error));
    }
  };
}

// width

export const RESIZE_WINDOW = 'RESIZE_WINDOW';

export const resize = width => ({ type: RESIZE_WINDOW, width });
