import { put, delay, call, select, takeLatest } from 'redux-saga/effects';
import BookService from '../../services/BookService';

const prefix = 'my-books/books';
// books
export const START = `${prefix}/START`;
export const SUCCESS = `${prefix}/SUCCESS`;
export const FAIL = `${prefix}/FAIL`;

const startGetBooks = () => {
  return {
    type: START,
  };
};
const successGetBooks = books => {
  return {
    type: SUCCESS,
    books,
  };
};
const failGetBooks = error => {
  return {
    type: FAIL,
    error,
  };
};

// 보내온 액션과 현재 상태를 이용해서
// 새로운 상태를 만드는 함수

// 상태는 항상 고정적으로 만들어둔다.
const initialState = {
  loading: false,
  books: [],
  error: null,
};

// 앱이 실행될 때
// 액션이 날라올 때
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        loading: true,
        books: [],
        error: null,
      };
    case SUCCESS:
      return {
        loading: false,
        books: action.books,
        error: null,
      };
    case FAIL:
      return {
        loading: false,
        books: [],
        error: action.error,
      };
    default:
      return state;
  }
}

// export function getBooksThunk() {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(startGetBooks());
//       // await sleep(1000);
//       const state = getState();
//       const token = state.auth.token;
//       const books = await BookService.getBooks(token);
//       const covers = await BookService.getBookCovers(books);
//       const books_integrated = books.map((book, i) => ({
//         ...book,
//         thumbnail: covers[i].thumbnail,
//       }));
//       dispatch(successGetBooks(books_integrated));
//     } catch (error) {
//       console.log(error);
//       dispatch(failGetBooks(error));
//     }
//   };
// }

const START_GET_BOOKS = 'START_GET_BOOKS';

export const startGetBooksActionCreator = () => ({
  type: START_GET_BOOKS,
});

function* startGetBooksSaga(action) {
  try {
    yield put(startGetBooks());
    yield delay(2000);
    const token = yield select(action.payload.token);
    const books = yield call(BookService.getBooks(token));
    const covers = yield call(BookService.getBookCovers(books));
    const books_integrated = books.map((book, i) => ({
      ...book,
      thumbnail: covers[i].thumbnail,
    }));
    yield put(successGetBooks(books_integrated));
  } catch (error) {
    console.log(error);
    yield put(failGetBooks(error));
  }
}

// saga
export function* booksSaga() {
  yield takeLatest(START_GET_BOOKS, startGetBooksSaga);
}
