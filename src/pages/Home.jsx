import React from 'react';
import BookListContainer from '../containers/BookListContainer';
import useAuth from '../hooks/useAuth';
import HeadersContainer from '../containers/HeadersContainer';
import styled from 'styled-components';

export const PaddedFrame = styled.div`
  padding: 30px ${window.innerWidth / 24}px;
`;

const Home = () => {
  useAuth();
  return (
    <PaddedFrame>
      <HeadersContainer />
      <BookListContainer />
    </PaddedFrame>
  );
};

export default Home;
