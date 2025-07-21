import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.secondary};
  border-radius: 4px;
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  &:hover {
    background: ${theme.colors.secondary};
  }
`;

function SongForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'songs/addSong',
      payload: { ...formData, year: parseInt(formData.year) || undefined },
    });
    setFormData({ title: '', artist: '', album: '', year: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Song Title"
        required
      />
      <Input
        type="text"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        placeholder="Artist"
        required
      />
      <Input
        type="text"
        name="album"
        value={formData.album}
        onChange={handleChange}
        placeholder="Album"
      />
      <Input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <Button type="submit">Add Song</Button>
    </Form>
  );
}

export default SongForm;