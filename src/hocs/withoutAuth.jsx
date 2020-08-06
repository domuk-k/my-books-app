import React from 'react';
import { Redirect } from 'react-router-dom';

// 이 hoc 를 사용한 컴포넌트는 토큰이 있으면 리다이렉트
export default function withoutAuth(Component) {
  const displayName = `withAuth(${Component.displayName})`;
  const C = (props) => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      return <Redirect to="/" />;
    }

    return <Component {...props} />;
  };

  C.displayName = displayName;

  return C;
}
