import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import SongForm from './song/SongForm';
import SongList from './song/SongList';
import { fetchSongsStart } from '../store/songs/songsSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: ${theme.spacing.xl} auto;
  padding: ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.xl};
  margin: 0;
`;

const AddButton = styled.button`
  background: ${props => (props.active ? theme.colors.success : theme.colors.primary)};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${theme.typography.fontSize.md};
  transition: background 0.3s;

  &:hover {
    background: ${props => (props.active ? theme.colors.success : theme.colors.secondary)};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${theme.colors.cardBackground};
  padding: ${theme.spacing.md};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.sm};
  margin: 0 0 ${theme.spacing.xs};
`;

const StatValue = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: 600;
  margin: 0;
`;

const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary};
  border-radius: 4px;
  font-size: ${theme.typography.fontSize.md};
  max-width: 400px;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;

function SongManagementPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { songs, total, loading } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongsStart(1)); 
  }, [dispatch]);

  // Handle loading state and ensure songs is an array
  const filteredSongs = loading ? [] : songs.filter(song =>
    song && (song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (song.album && song.album.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (song.year && String(song.year).includes(searchQuery)))
  );

  const stats = {
    totalSongs: total || 0,
    totalArtists: new Set(songs.map(song => song.artist)).size || 0,
    totalAlbums: new Set(songs.map(song => song.album)).size || 0,
    
  };

  return (
    <Container>
      <Header>
        <Title>
          <span role="img" aria-label="musical-notes">🎵</span> Song Management
          <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text }}>Manage your music library</p>
        </Title>
        <AddButton active={isFormVisible} onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Remove Add Song' : 'Add New Song'}
        </AddButton>
      </Header>
      <StatsContainer>
        <StatCard>
          <StatLabel>Total Songs</StatLabel>
          <StatValue>{stats.totalSongs}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Artists</StatLabel>
          <StatValue>{stats.totalArtists}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Albums</StatLabel>
          <StatValue>{stats.totalAlbums}</StatValue>
        </StatCard>
        
      </StatsContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search songs, artists, or albums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      {isFormVisible && <SongForm />}
      <SongList songs={filteredSongs} />
    </Container>
  );
}


export default SongManagementPage;