import React, { useCallback } from 'react';
import styled from 'styled-components';

const FormBlock = styled.form`
  & div {
    margin-bottom: 18px;
  }

  & input {
    border-radius: 10px;
    border: 1px solid lightgrey;
    outline: none;
    padding: 4px 12px;
  }

  & button {
    padding: 5px 18px;
    background-color: white;
    border-radius: 10px;
    border: 2px solid #7950f2;
    color: #7950f2;

    :hover {
      color: white;
      background-color: #7950f2;
    }
  }
`;

export default function SigninForm({ login }) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef(); // 한번 만들어지면 객체 인스턴스는 그대로

  const click = useCallback(
    async e => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (email === '' || password === '') return;
      login(email, password);
    },
    [login],
  );
  return (
    <FormBlock>
      <div>
        <input type="text" ref={emailRef} />
      </div>
      <div>
        <input type="password" ref={passwordRef} />
      </div>
      <div>
        <button onClick={click}>로그인</button>
      </div>
    </FormBlock>
  );
}
