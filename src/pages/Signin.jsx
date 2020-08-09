import React from 'react';
import SigninFormContainer from '../containers/SigninFormContainer';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SinginPage = styled.div`
  display: flex;
  & .login-left {
    width: 50vw;
    height: 100vh;
    background-color: ivory;
    background-image: ${props => props.img};
  }
  & .login-right {
    width: 50vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .login-block {
    width: 35vw;
    height: 45vh;
    border-radius: 8px;
    border: 1px solid lightgrey;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

function Signin() {
  const token = useSelector(state => state.auth.token);
  // if (token !== null) return <Redirect to="/" />;
  return (
    <SinginPage>
      <div className="login-left" />
      <div className="login-right">
        <div className="login-block">
          <h1>로그인</h1>
          <SigninFormContainer />
        </div>
      </div>
    </SinginPage>
  );
}

export default Signin;
