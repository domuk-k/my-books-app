import React from 'react';
import AddForm from '../components/AddForm';
import { useDispatch, useSelector } from 'react-redux';
import { addBookActionCreator } from '../redux/modules/books';

export default function AddFormContainer() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const addBook = (title, content, author, url) => {
    dispatch(
      addBookActionCreator(token)(title, content, author, url),
    );
  };
  return <AddForm addBook={addBook} />;
}
