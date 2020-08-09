import React, { useEffect } from 'react';
import BookListGrid from './BookListGrid';
import BookCard from './BookCard';
import styled from 'styled-components';

const BookListBlock = styled.div`
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
  removeBook,
}) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <BookListBlock width={width}>
      {loading && <p>로딩 중...</p>}
      {error && <p>에러다!!</p>}
      <BookListGrid>
        {error === null &&
          books.map(
            book =>
              book && (
                <li key={book.bookId} id={book.bookId}>
                  <BookCard
                    book={book}
                    width={width}
                    removeBook={removeBook}
                  />
                </li>
              ),
          )}
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
