import React from 'react';

export default function NotFound() {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다.</h1>
    </div>
  );
}

// 컨테이너 vs (프레젠테이셔널) 컴포넌트
// 컨테이너는 로직만 담겨 있다.

// 컴포넌트는 뷰만 담겨 있어요. => 테스트가 쉽다. => props 로 받아서 보여주는 로직에 집중
