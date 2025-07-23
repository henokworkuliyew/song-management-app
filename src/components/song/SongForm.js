import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  background: ${theme.colors.cardBackground};
  padding: ${theme.spacing.md};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: ${theme.spacing.lg} auto;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    max-width: 300px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 700px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: 900px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 90%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${props => (props.error ? theme.colors.error : theme.colors.secondary)};
  border-radius: 4px;
  font-size: ${theme.typography.fontSize.sm};
  background: #fff;
  height: 40px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 5px ${theme.colors.primary};
    outline: none;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    height: 36px;
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.xs};
  margin-top: ${theme.spacing.xs};
`;

const Button = styled.button`
  grid-column: 1 / -1;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${theme.typography.fontSize.md};
  font-weight: 500;
  height: 44px;
  transition: background 0.3s, transform 0.2s;
  align-self: center;
  width: 100%;
  max-width: 250px;

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    height: 40px;
  }
`;

const SuccessMessage = styled.p`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.sm};
  text-align: center;
  grid-column: 1 / -1;
`;

const schema = yup.object().shape({
  title: yup.string().required('Song title is required').min(2, 'Title must be at least 2 characters'),
  artist: yup.string().required('Artist is required').min(2, 'Artist must be at least 2 characters'),
  album: yup.string().notRequired().min(2, 'Album must be at least 2 characters if provided'),
  year: yup.number()
    .typeError('Year must be a number')
    .required('Year is required')
    .min(1900, 'Year must be at least 1900')
    .max(2025, 'Year cannot exceed 2025'),
  genre: yup.string().required('Genre is required'),
  duration: yup.string().required('Duration is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Duration must be in HH:MM format (e.g., 3:45)'),
});

function SongForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', artist: '', album: '', year: '', genre: '', duration: '' },
  });

  const onSubmit = (data) => {
    dispatch({
      type: 'songs/addSong',
      payload: { ...data, year: parseInt(data.year) },
    });
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="title">Song Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter song title"
          {...register('title')}
          error={!!errors.title}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          type="text"
          placeholder="Enter artist name"
          {...register('artist')}
          error={!!errors.artist}
        />
        {errors.artist && <ErrorMessage>{errors.artist.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="album">Album</Label>
        <Input
          id="album"
          type="text"
          placeholder="Enter album name"
          {...register('album')}
          error={!!errors.album}
        />
        {errors.album && <ErrorMessage>{errors.album.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          placeholder="Enter year"
          {...register('year')}
          error={!!errors.year}
        />
        {errors.year && <ErrorMessage>{errors.year.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          type="text"
          placeholder="Enter genre"
          {...register('genre')}
          error={!!errors.genre}
        />
        {errors.genre && <ErrorMessage>{errors.genre.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          type="text"
          placeholder="Enter duration (e.g., 3:45)"
          {...register('duration')}
          error={!!errors.duration}
        />
        {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
      </FormGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Song'}
      </Button>
      {isSubmitSuccessful && <SuccessMessage>Song added successfully!</SuccessMessage>}
    </Form>
  );
}

export default SongForm;