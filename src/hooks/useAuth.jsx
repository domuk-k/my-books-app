import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export default function useAuth() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  if (token === null) dispatch(push('/'));
}
