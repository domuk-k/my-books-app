import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MainHeader = styled.div`
  text-align: right;

  & button {
    padding: 10px 20px;
    margin-left: 20px;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 5px;
    text-transform: uppercase;

    background: transparent;
    border: 1px solid #495057;
    color: #343a40;

    &:hover {
      background: #495057;
      border: 1px solid #f1f3f5;
      color: white;
    }
  }
`;

const SubHeader = styled.h1`
  font-weight: 800;
  font-size: 2.4rem;
  margin: 0;
`;

function Headers({ logout, goToAdd, goBack }) {
  const path = useSelector(state => state.router.location.pathname);
  return (
    <>
      {path === '/' && (
        <>
          <MainHeader>
            <button onClick={goToAdd}>add</button>
            <button onClick={logout}>log out</button>
          </MainHeader>
          <SubHeader>ENJOY READING</SubHeader>
        </>
      )}
      {path === '/add' && (
        <>
          <MainHeader>
            <button onClick={goBack}>뒤로가기</button>
            <button onClick={logout}>log out</button>
          </MainHeader>
          <SubHeader>
            ADD ANY <br /> MEANINGFUL BOOK
          </SubHeader>
        </>
      )}
    </>
  );
}
export default React.memo(Headers);
