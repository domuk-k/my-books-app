import {
  START_LOADING,
  END_LOADING,
  START_GET_BOOKS,
  SUCCESS_GET_BOOKS,
  FAIL_GET_BOOKS,
} from '../actions';

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
export default function books(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case START_GET_BOOKS:
      return {
        loading: true,
        books: [],
        error: null,
      };
    case SUCCESS_GET_BOOKS:
      return {
        loading: false,
        books: action.books,
        error: null,
      };
    case FAIL_GET_BOOKS:
      return {
        loading: false,
        books: [],
        error: action.error,
      };
    default:
      return state;
  }
}
