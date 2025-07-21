import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { setPage } from '../store/songs/songsSlice';
import { theme } from '../styles/theme';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  &:disabled {
    background: ${theme.colors.secondary};
    cursor: not-allowed;
  }
`;

function Pagination() {
  const { currentPage, totalPages } = useSelector(state => state.songs);
  const dispatch = useDispatch();

  return (
    <PaginationContainer>
      <Button
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </PaginationContainer>
  );
}

export default Pagination;