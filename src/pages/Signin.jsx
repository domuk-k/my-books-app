import React, { Component } from 'react';
import axios from 'axios';
import { message } from 'antd';
import withAuth from '../hocs/withAuth';
import styled from 'styled-components';

const SigninBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  width: 50vmin;
  height: 100vmin;
  margin: 0 auto;

  text-align: center;

  & form label {
    display: block;
  }

  & button {
    border: none;
    border-radius: 5px;
    background: #4c6ef5;
    color: white;
    width: 100%;

    margin: 1rem auto;
    height: 2rem;
    :active,
    :hover {
      background: #3b5bdb;
    }
  }

  & form div {
    display: inline-block;
    border-radius: 5px;
    padding: 6px 12px;
    text-align: left;
    width: 70%;
  }

  & input {
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #f8f9fa;
    outline: none;
    width: 100%;
    margin: 5px 0;
    padding: 5px;

    :focus {
      background-color: white;
      border: 2px #3b5bdb solid;
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
  };

  passwordRef = React.createRef();

  render() {
    return (
      <SigninBlock>
        <h1 style={{ fontWeight: 700, margin: 0 }}>Welcome Back</h1>
        <h3>signin to continue</h3>
        <form>
          <div>
            <label>email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.change}
              onSubmit={this.click}
            />
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              ref={this.passwordRef}
              onSubmit={this.click}
            />
          </div>
          <div>
            <button onClick={this.click}>continue</button>
          </div>
          {/* <input type="password" ref={(ref)=>{this.passwordRef.current =ref}} /> */}
        </form>
      </SigninBlock>
    );
  }

  click = async e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.passwordRef.current.value;

    const regex_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!email.match(regex_email)) {
      message.error('이메일 형식 오류');
      return;
    }
    if (password === '') {
      message.error('비밀번호를 입력하세요');
      return;
    }

    const url = 'https://api.marktube.tv/v1/me';

    try {
      const res = await axios.post(url, {
        email,
        password,
      });
      // 1.토근을 저장
      const token = res.data.token;
      localStorage.setItem('token', token);
      // 2.홈으로이동
      this.props.history.push('/');
      // 3.팝업
      message.success('로그인 성공');
    } catch (error) {
      let errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('계정정보 불일치');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('존재하지 않는 이메일');
      } else {
        message.error('나도 모르는 에러');
      }
      // alert('다시 입력혀');
    }
  };

  change = e => {
    this.setState({
      email: e.target.value,
    });
  };
}

export default withAuth(Signin, false);
