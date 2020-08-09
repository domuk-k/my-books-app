import React from 'react';
import BookList from '../components/BookList';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGetBooksActionCreator,
  removeBookActionCreator,
} from '../redux/modules/books';
import { push } from 'connected-react-router';

export default function BookListContainer() {
  // mapStateToProps
  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const token = useSelector(state => state.auth.token);
  const width = useSelector(state => state.width.width);

  // mapDispatchToProps
  const dispatch = useDispatch();
  const getBooks = React.useCallback(async () => {
    dispatch(startGetBooksActionCreator(token));
  }, [dispatch, token]);
  const removeBook = React.useCallback(
    async id => {
      dispatch(removeBookActionCreator(token)(id));
      dispatch(push('/'));
    },
    [dispatch, token],
  );
  return (
    <BookList
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
      width={width}
      removeBook={removeBook}
    />
  );
}
