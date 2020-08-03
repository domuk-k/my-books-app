import React from 'react';
import { Redirect } from 'react-router-dom';

// 이 hoc로 감싼 컴포는 토큰이없을때 리디렉션
export default function withAuth(Component) {
  const C = props => {
    const token = localStorage.getItem('token');
    if (token === null) return <Redirect to="/signin" />;
    // if (token !== null && !hasToken) return <Redirect to="/" />;

    return <Component {...props} token={token} />;
  };

  C.displayName = `withAuth(${Component.displayName})`;

  return C;
}
