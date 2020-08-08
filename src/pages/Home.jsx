import React from 'react';
import BookListContainer from '../containers/BookListContainer';
import useAuth from '../hooks/useAuth';

const Home = () => {
  useAuth();
  return <BookListContainer />;
};

export default Home;
