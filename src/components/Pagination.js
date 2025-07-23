import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { setPage } from '../store/songs/songsSlice';
import { theme } from '../styles/theme';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${theme.typography.fontSize.md};
  transition: background 0.3s;

  &:disabled {
    background: ${theme.colors.secondary};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;

const PageInfo = styled.span`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

function Pagination() {
  const { currentPage, totalPages, loading } = useSelector(state => state.songs);
  const dispatch = useDispatch();

  if (loading || totalPages === 0) return null;

  return (
    <PaginationContainer>
      <Button
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <PageInfo>
        Page {currentPage} of {totalPages || 1}
      </PageInfo>
      <Button
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages || !totalPages}
      >
        Next
      </Button>
    </PaginationContainer>
  );
}

export default Pagination;