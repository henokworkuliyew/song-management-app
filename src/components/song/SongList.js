import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1fr;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.cardBackground};
  border-radius: ${theme.spacing.xs} ${theme.spacing.xs} 0 0;
  font-weight: 500;
  color: ${theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.cardBackground};
  margin-bottom: ${theme.spacing.sm};
  border-radius: ${theme.spacing.xs};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm};
  }
`;

const SongInfo = styled.span`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.spacing.xs};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.sm};
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.xs};
  }
`;

function SongList({ songs }) {
  const dispatch = useDispatch();

  // Check if songs is undefined or not an array
  if (!Array.isArray(songs) || songs.length === 0) {
    return <div style={{ textAlign: 'center', color: theme.colors.text }}>No songs found.</div>;
  }

  const handleEdit = (song) => {
    const updatedData = prompt(
      `Edit song details (comma-separated: title, artist, album, year, genre, duration):\nCurrent: ${song.title}, ${song.artist}, ${song.album || '-'}, ${song.year || '-'}, ${song.genre || '-'}, ${song.duration || '-'}`,
      `${song.title}, ${song.artist}, ${song.album || ''}, ${song.year || ''}, ${song.genre || ''}, ${song.duration || ''}`
    );
    if (updatedData) {
      const [title, artist, album, year, genre, duration] = updatedData.split(',').map(item => item.trim());
      if (title && artist && year) {
        dispatch({
          type: 'songs/updateSong',
          payload: { id: song.id, title, artist, album: album || song.album, year: parseInt(year) || song.year, genre: genre || song.genre, duration: duration || song.duration },
        });
      } else {
        alert('Please provide title, artist, and year.');
      }
    }
  };

  return (
    <List>
      <HeaderRow>
        <span>Title</span>
        <span>Artist</span>
        <span>Album</span>
        <span>Year</span>
        <span>Genre</span>
        <span>Duration</span>
        <span>Actions</span>
      </HeaderRow>
      {songs.map(song => (
        <ListItem key={song.id}>
          <SongInfo>{song.title}</SongInfo>
          <SongInfo>{song.artist}</SongInfo>
          <SongInfo>{song.album || '-'}</SongInfo>
          <SongInfo>{song.year || '-'}</SongInfo>
          <SongInfo>{song.genre || '-'}</SongInfo>
          <SongInfo>{song.duration || '-'}</SongInfo>
          <ButtonGroup>
            <Button onClick={() => handleEdit(song)}>Edit</Button>
            <Button onClick={() => dispatch({ type: 'songs/deleteSong', payload: song.id })}>Delete</Button>
          </ButtonGroup>
        </ListItem>
      ))}
    </List>
  );
}

export default SongList;