import React from 'react';
import { useDispatch } from 'react-redux';
import { resize } from '../actions';

export default function useWindowWidth() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('hey');
      dispatch(resize(window.innerWidth));
    });
    return () => {
      window.removeEventListener('resize', dispatch(resize(window.innerWidth)));
    };
  }, [dispatch]);
}
