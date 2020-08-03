import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import WidthContext from './WidthContext';

const StyledGrid = styled.ul.attrs(() => ({
  id: 'grid',
}))`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 30px;

  ${props =>
    props.width < 1000 &&
    css`
      display: block;
    `}
`;

function BookListGrid({ children }) {
  const width = useContext(WidthContext);
  return <StyledGrid width={width}>{children}</StyledGrid>;
}

export default BookListGrid;
