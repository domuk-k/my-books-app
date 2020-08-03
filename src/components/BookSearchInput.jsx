import React from 'react';
import styled from 'styled-components';

const BookSearchInputBlock = styled.div`
  input {
    background-color: #f1f3f5;
    width: 100%;
    padding: 10px 15px;
    margin: 28px 0;
    border: 2px solid #ced4da;
    border-radius: 8px;
    font-size: 1.2rem;
    outline: none;

    :focus {
      border: 2px solid #12b886;
      background-color: white;
    }
  }
`;

function BookSearchInput(props) {
  return (
    <BookSearchInputBlock>
      <input {...props}></input>
    </BookSearchInputBlock>
  );
}

export default React.memo(BookSearchInput);
