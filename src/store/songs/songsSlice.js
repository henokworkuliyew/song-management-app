import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.songs = action.payload.songs;
      state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      state.currentPage = action.payload.page;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongSuccess(state, action) {
      state.songs.push(action.payload);
    },
    updateSongSuccess(state, action) {
      state.songs = state.songs.map(song =>
        song.id === action.payload.id ? action.payload : song
      );
    },
    deleteSongSuccess(state, action) {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  setPage,
} = songsSlice.actions;

export default songsSlice.reducer;