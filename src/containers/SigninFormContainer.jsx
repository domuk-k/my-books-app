import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../actions';
import SigninForm from '../components/SigninForm';
import { useHistory } from 'react-router-dom';

export default function SignInContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = useCallback(
    (email, password) => {
      dispatch(loginThunk(email, password, history));
    },
    [dispatch, history],
  );

  return <SigninForm login={login} />;
}
