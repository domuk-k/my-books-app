import React from 'react';
import styled from 'styled-components';

const SubHeader = styled.div`
  text-align: right;

  & button {
    padding: 10px 20px;
    margin-left: 20px;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 5px;
    text-transform: uppercase;

    background: #495057;
    border: 1px solid #f1f3f5;
    color: white;

    &:hover {
      background: transparent;
      border: 1px solid #495057;
      color: #343a40;
    }
  }
`;

const MainHeader = styled.h1`
  font-weight: 800;
  font-size: 2.4rem;
  margin: 0;
`;

function Headers() {
  return (
    <>
      <SubHeader>
        <button>add</button>
        <button>log out</button>
      </SubHeader>
      <MainHeader>ENJOY READING</MainHeader>
    </>
  );
}
export default React.memo(Headers);
