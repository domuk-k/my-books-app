import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginSagaActionCreator } from '../redux/modules/auth';
import SigninForm from '../components/SigninForm';

export default function SignInContainer() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const login = useCallback(
    (email, password) => {
      dispatch(startLoginSagaActionCreator(email, password));
    },
    [dispatch],
  );

  return <SigninForm login={login} loading={loading} />;
}
