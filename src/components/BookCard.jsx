import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import qs from 'qs';
import axios from 'axios';
import WidthContext from './WidthContext';

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

  ${props =>
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
  }
  & i {
    display: block;
  }
`;

const BookCard = props => {
  const [thumbnail, setThumbnail] = useState('');
  const width = useContext(WidthContext);
  const book = props.book;

  useEffect(() => {
    const fetchBookCovers = async () => {
      const data = await getBookCover();
      setThumbnail(data.thumbnail);
    };
    fetchBookCovers();
  }, []);

  return (
    <BookCardBlock book={book} width={width}>
      {width > 600 && <img src={thumbnail} alt="도서 커버이미지"></img>}
      <BookDetailBlock>
        <h2>{book.title}</h2>
        <i>{book.author}</i>
        <p>{book.message}</p>
      </BookDetailBlock>
    </BookCardBlock>
  );

  async function getBookCover() {
    const query = { query: props.book.title };
    const appKey = `6ca57f1a12aa1279e34bf0775176aba4`;
    const url = `https://dapi.kakao.com/v3/search/book?target=title&size=1&${qs.stringify(
      query,
    )}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `KakaoAK ${appKey}`,
      },
      url,
    };
    const response = await axios(requestOptions);
    return response.data.documents[0];
  }
};

export default React.memo(BookCard);
