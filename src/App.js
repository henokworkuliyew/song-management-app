import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Pagination from './components/Pagination';
import { theme } from './styles/theme';
import { fetchSongsStart } from './store/songs/songsSlice';
import SongManagementPage from './components/Song';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background};
  min-height: 100vh;
  font-family: ${theme.typography.fontFamily};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

const Header = styled.h1`
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

function App() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(state => state.songs);

  React.useEffect(() => {
    dispatch(fetchSongsStart(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Container>
      <SongManagementPage />
      <Pagination />
    </Container>
  );
}

export default App;