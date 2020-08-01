import React from 'react';
import { Redirect } from 'react-router-dom';

//  이 hoc로 감싼 컴포는 토큰이 있으면 리디렉션

export default function withoutAuth(Component) {
  const C = props => {
    const token = localStorage.getItem('token');
    if (token !== null) return <Redirect to="/" />;

    return <Component {...props} />;
  };

  C.displayName = `withAuth(${Component.displayName})`;

  return C;
}
