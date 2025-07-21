import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
  margin-bottom: ${theme.spacing.sm};
  border-radius: 4px;
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  margin-left: ${theme.spacing.sm};
  &:hover {
    background: ${theme.colors.secondary};
  }
`;

function SongList() {
  const { songs, loading, error } = useSelector(state => state.songs);
  const dispatch = useDispatch();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <List>
      {songs.map(song => (
        <ListItem key={song.id}>
          <span>{song.title} by {song.artist} ({song.year})</span>
          <div>
            <Button
              onClick={() => {
                const updatedSong = prompt('Enter new title:', song.title);
                if (updatedSong) {
                  dispatch({
                    type: 'songs/updateSong',
                    payload: { id: song.id, title: updatedSong, artist: song.artist, album: song.album, year: song.year },
                  });
                }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch({ type: 'songs/deleteSong', payload: song.id })}
            >
              Delete
            </Button>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default SongList;