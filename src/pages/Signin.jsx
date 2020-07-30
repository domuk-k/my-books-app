import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import withAuth from '../hocs/withAuth';

class Signin extends React.Component {
  state = {
    email: '',
  };
  passwordRef = React.createRef(); // 한번 만들어지면 객체 인스턴스는 그대로
  render() {
    return (
      <div>
        <h1>로그인</h1>
        <p>
          <input type="text" value={this.state.email} onChange={this.change} />
        </p>
        <p>
          <input type="password" ref={this.passwordRef} />
        </p>
        <p>
          <button onClick={this.click}>로그인</button>
        </p>
      </div>
    );
  }

  click = async () => {
    const email = this.state.email;
    const password = this.passwordRef.current.value;

    if (email === '' || password === '') return;

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      // 1. 토큰을 저장한다.
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      // 2. 홈으로 이동시킨다.
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('패스워드/이메일 오류');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('이메일 존재하지 않음');
      } else {
        message.error('나도 모르는 에러');
      }
    }
  };

  change = e => {
    this.setState({ email: e.target.value });
  };
}

export default withAuth(Signin, false);
