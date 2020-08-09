import React from 'react';
import { useDispatch } from 'react-redux';
import Headers from '../components/Headers';
import { push } from 'connected-react-router';
import { startLogoutActionCreator } from '../redux/modules/auth';

export default function HeadersContainer() {
  const dispatch = useDispatch();
  const logout = React.useCallback(() => {
    dispatch(startLogoutActionCreator());
  }, [dispatch]);
  const addBook = React.useCallback(() => {
    dispatch();
  }, [dispatch]);
  const goToAdd = () => {
    dispatch(push('/add'));
  };
  const goBack = () => {
    dispatch(push('/'));
  };
  return (
    <Headers
      logout={logout}
      addBook={addBook}
      goToAdd={goToAdd}
      goBack={goBack}
    />
  );
}
