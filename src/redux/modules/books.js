import { put, delay, call, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import BookService from '../../services/BookService';
import { go, push } from 'connected-react-router';

const prefix = 'my-books/books';
// books
export const START = `${prefix}/START`;
export const SUCCESS = `${prefix}/SUCCESS`;
export const FAIL = `${prefix}/FAIL`;
export const ADD = `${prefix}/ADD`;
export const REMOVE = `${prefix}/REMOVE`;

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
    case ADD:
      return {
        ...state,
        books: [...state.books, action.payload.book],
      };
    case REMOVE:
      return {
        ...state,
        books: state.books.filter(
          book => book.id !== action.payload.id,
        ),
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
const START_REMOVE_BOOK = 'START_REMOVE_BOOK';
const START_ADD_BOOK = 'START_ADD_BOOK';

const removeBook = id => ({
  type: REMOVE,
  payload: { id },
});
const addBook = book => ({
  type: ADD,
  payload: { book },
});
export const startGetBooksActionCreator = token => ({
  type: START_GET_BOOKS,
  payload: token,
});
export const removeBookActionCreator = token => id => ({
  type: START_REMOVE_BOOK,
  payload: { token, id },
});
export const addBookActionCreator = token => (
  title,
  content,
  author,
  url,
) => ({
  type: START_ADD_BOOK,
  payload: {
    token,
    book: {
      author,
      bookId: uuidv4(),
      createdAt: new Date().toISOString(),
      deletedAt: null,
      message: content,
      ownerID: token,
      title,
      updatedAt: '구현중',
      url,
    },
  },
});

function* startGetBooksSaga(action) {
  try {
    yield put(startGetBooks());
    yield delay(300);
    const token = action.payload;
    const books = yield call(BookService.getBooks, token);
    const covers = yield call(BookService.getBookCovers, books);
    const books_integrated = books.map((book, i) => ({
      ...book,
      thumbnail: covers[i]
        ? covers[i].thumbnail
        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADDCAMAAACxkIT5AAAASFBMVEVUVFSoqKhOTk5RUVGrq6tzc3OZmZmFhYWwsLBMTEyXl5etra1vb29+fn6Li4uTk5NiYmJnZ2dbW1uhoaGAgIBeXl5ycnJsbGwxLNHVAAAEr0lEQVR4nO2cDZeiIBSG4V4ElQSVJv//P13ATPuY2Wlqzy7u+5wzk0l2uk9cQEOEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaTO+H/3ZQz8GTfj9TWRK4svLd2Ko0B+rtDhQcwAEcwAEcwAEcwAEcwAEcwMGuHahuiYLMXbly9OXBcLBDBwwHcCDgIJfDARyI/9tBwzPNIweXwj07kK1Z0PeF+lLo9+xAqoWnC/fj4BXgAA7gAA7gAA7gAA7gAA7gAA7gAA7gAA7g4P90kK6a2ZnPL6Dt10EMXgbvuuowDcMwHarO+SDt1yL25CDG77tepMn4K/GZ6DsfPezfgbLBDCn6RwdFE4MJn2nYiQNl/dQ8jP9yIDeTf2xhFw6UcuM3bkZhGt2jlmEPDqwf6fdHZmj09/eAlO/A6v7GwNwSnm9Vug2Pen1roXQHSlZXWRCjF0N1dL7VWrfeHavYUfD1Kyqp9uTAtuPm8zOJg8vDgXPa59GS1GbirSgeW7sfB7Zr1iKi0yfDgDRwOGwtNN1WQskOlFxbgtjmmy/HQVaaTd9B/SYfCnagtNjE5H97YhDHEBtnQq9vVKwD6y8BpR7vO6eTatuL0qWXLNaBdUtTwGS+cXJ4DleZS0I0zpbtQJlFAQ3hmUsKKgxLVVjmLhXrYAmEzLM3/1pzObZwB/PHZvFUJViqwnlQwXtwcNXFPSFBzvmwBwd0+OnFRXVKEnbggF5YB8BWtAcHryhIw2wq38FrCnJNKN0BTa8uiGGn0vvGj9d/a1neo1QHP+oT7yTIsh28ETiAAziAAziAAziAAziAAzjYiwOsIclTePtSoqGwtUSxpiwAAABwQ5p8lx7m31wpTzjj607u/DRv8byT55/b0/a6gx9OYPz34aH1KWrXsWDhggyG+aDbjB5yeNP85EPQSUvZDhSP0ulg8h2za0+clm2n+FZt683tDM9/Hz5YeWRBMXQxqlBNnQw8GGNCMMb1+SWVTeu/uJFM7aaDryvmU51KKDimEGR0cKobPtTHo9O1L01CdFApkR2QDrEm06hcfGhav8xbj6dVnO9gGOqqSasF2TGGm0ryUaGTsTacbHIQs6GZ1nkphRAdNNJQjIbGOp/rkJEpy1u/WQkqZTqTC/OcJdvRlYNOLQ7yzs7+lUh+TnJQ1SmaGNeY90zp8cqB9ZFDE+ZdMQOaKwckj7Q6EGN9KKtdjA4oBRUdVHMIscr3tw6cc8nBvEgYaX/joLKbeiBEXdq5c3SQPrw2NNUf8567enDOhbUeXOdC/DPT6uCjHspzIOI3HB2IOq8UR+6uPZgTPBbkXaOtaMh5E5MgO4i1oLo4aIwqS8HsgAebvlEvx/ht9/XxsQPua5P6BS/jE3tsOJqYsoMoMahzv0BdaamQan6OuI7jAxGU6VzdpuBj0t86iC1+rbtjsLGq87F2nUlTnEmm0dVkcz3wvs0Tkwqjd5z/p7acu1b7ah47d+u3OZjzBvVOazPO0/i8blPu8DFdOaNjdNinoVQlCqsFifNAKD/weiFsO+6/bG7Ll01e/+ebQP/8JwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwB/gFh35K7dZjp9sAAAAASUVORK5CYII=',
    }));
    yield put(successGetBooks(books_integrated));
  } catch (error) {
    yield put(failGetBooks(error));
  }
}

function* startRemoveBooksSaga(action) {
  try {
    yield delay(400);
    const token = action.payload.token;
    const id = action.payload.id;
    yield call(BookService.deleteBook, token, id);
    yield put(removeBook(id));
    yield put(go(0));
  } catch (e) {
    console.log(e);
  }
}
function* startAddBooksSaga(action) {
  try {
    // yield put(startAddBooks());
    yield delay(400);
    const token = action.payload.token;
    const book = action.payload.book;
    console.log(token, book);
    yield call(BookService.addBook, token, book);

    yield put(addBook());
    yield put(push('/'));
  } catch (e) {
    console.log(e);
  }
}

// saga
export function* booksSaga() {
  yield takeLatest(START_GET_BOOKS, startGetBooksSaga);
  yield takeLatest(START_REMOVE_BOOK, startRemoveBooksSaga);
  yield takeLatest(START_ADD_BOOK, startAddBooksSaga);
}
