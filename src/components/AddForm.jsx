import React, { useRef } from 'react';

export default function AddForm({ addBook }) {
  const titleRef = useRef();
  const CommentRef = useRef();
  const AuthorRef = useRef();
  const URLRef = useRef();

  const add = React.useCallback(() => {
    if (titleRef.current.value === '') {
      alert('제목은 필수 입력입니다.');
      return;
    }

    addBook(
      titleRef.current.value,
      CommentRef.current.value,
      AuthorRef.current.value,
      URLRef.current.value,
    );
  }, [addBook]);
  return (
    <div>
      <hr />
      <form>
        <p>Title</p>
        <input type="text" placeholder="Title" ref={titleRef} />
        <p>Comment</p>
        <input type="text" placeholder="Comment" ref={CommentRef} />
        <p>Author</p>
        <input type="text" placeholder="Author" ref={AuthorRef} />
        <p>URL</p>
        <input type="text" placeholder="URL" ref={URLRef} />
      </form>
      <button onClick={add}>추가하기</button>
    </div>
  );
}
