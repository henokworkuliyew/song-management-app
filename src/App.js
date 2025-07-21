import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import SongList from './components/SongList';
import Pagination from './components/Pagination';
import { theme } from './styles/theme';
import { fetchSongsStart } from './store/songs/songsSlice';

const SongForm = lazy(() => import('./components/SongForm'));

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  background: white;
  min-height: 100vh;
`;

function App() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(state => state.songs);

  React.useEffect(() => {
    dispatch(fetchSongsStart(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Container>
      <h1>Song Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SongForm />
      </Suspense>
      <SongList />
      <Pagination />
    </Container>
  );
}

export default App;