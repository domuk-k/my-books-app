import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
// import WidthContext from './WidthContext';

const gridPoint = '1050';

const StyledGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 30px;
  list-style: none;
  padding-left: 0;

  ${props =>
    props.width < gridPoint &&
    css`
      display: block;
    `}
`;

function BookListGrid({ children }) {
  const width = useSelector(state => state.width.width);
  return <StyledGrid width={width}>{children}</StyledGrid>;
}

export default BookListGrid;
