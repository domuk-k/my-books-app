import React, { useState, useEffect } from 'react';
import SigninFormContainer from '../containers/SigninFormContainer';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackgroundService from '../services/BackgroundService';

const mediaPoint = 700;
const SinginPage = styled.div`
  display: flex;

  & .login-left {
    width: 50vw;
    background-image: url(${props => props.img});
    background-size: cover;
    background-repeat: no-repeat;
  }
  & .login-right {
    width: ${props => (props.width > mediaPoint ? '50vw' : '100vw')};
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
  const width = useSelector(state => state.width.width);

  const [img, setImg] = useState('');
  useEffect(() => {
    const fetchImg = async () => {
      const img = await BackgroundService.getSource();
      setImg(img);
    };
    fetchImg();
  }, []);
  if (token !== null) return <Redirect to="/" />;

  return (
    <SinginPage width={width} img={img}>
      {width > mediaPoint && <div className="login-left" />}
      <div className="login-right">
        <div className="login-block">
          <h1>WELCOME BACK</h1>
          <h3>sign in to continue</h3>
          <SigninFormContainer />
        </div>
      </div>
    </SinginPage>
  );
}

export default Signin;
