import React from 'react';
import styled, { css } from 'styled-components';

const BookCardBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 28px 20px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  height: 260px;
  color: #495057;

  :hover {
    box-shadow: 1px 1px 9px #ced4da;
  }

  & img {
    min-width: 160px;
    margin-right: 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  ${(props) =>
    props.width < 1000 &&
    css`
      margin-bottom: 30px;
    `}
`;

const BookDetailBlock = styled.div`
  & h2 {
    display: inline-block;
    font-weight: 700;
    word-break: keep-all;
    margin: 0;
    margin-bottom: 5px;
  }
  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.5rem;

    font-weight: 300;
  }
  & i {
    display: block;
    font-style: normal;
    color: grey;
    margin-bottom: 10px;
  }
`;

const BookCard = ({ book, width }) => {
  return (
    <BookCardBlock book={book} width={width}>
      {width > 600 && <img src={book.thumbnail} alt="도서 커버이미지"></img>}
      <BookDetailBlock>
        <h2>{book.title}</h2>
        <i>{book.author}</i>
        <p>{book.message}</p>
      </BookDetailBlock>
    </BookCardBlock>
  );
};

export default React.memo(BookCard);
