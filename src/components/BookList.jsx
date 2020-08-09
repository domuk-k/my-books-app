import React, { useEffect } from 'react';
import BookListGrid from './BookListGrid';
import BookCard from './BookCard';
import styled from 'styled-components';
import Headers from './Headers';

const BookListBlock = styled.div`
  padding: 30px ${props => props.width / 12}px;
  & h1 {
    font-weight: 800;
  }
`;
// Presentational Component
export default function BookList({
  books,
  loading,
  error,
  getBooks,
  width,
  logout,
}) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <BookListBlock width={width}>
      <Headers />
      {loading && <p>로딩 중...</p>}
      {error && <p>에러다!!</p>}
      <BookListGrid>
        {error === null &&
          books.map(book => (
            <li key={book.bookId} id={book.bookId}>
              <BookCard book={book} width={width} />
            </li>
          ))}
      </BookListGrid>
      <p>
        <button onClick={reload}>Reload</button>
      </p>
    </BookListBlock>
  );

  function reload() {
    getBooks();
  }
}
