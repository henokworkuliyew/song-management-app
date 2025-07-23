import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    currentPage: 1,
    totalPages: 1,
    total: 0, 
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
      state.total = action.payload.total; // Update total from payload
      state.totalPages = Math.ceil(action.payload.total / action.payload.limit); // Recalculate totalPages
      state.currentPage = action.payload.page;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongSuccess(state, action) {
      state.songs.push(action.payload);
      state.total += 1; // Increment total when a new song is added
      state.totalPages = Math.ceil(state.total / 10); // Recalculate totalPages (assuming limit of 10)
    },
    updateSongSuccess(state, action) {
      state.songs = state.songs.map(song =>
        song.id === action.payload.id ? action.payload : song
      );
    },
    deleteSongSuccess(state, action) {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      state.total -= 1; // Decrement total when a song is deleted
      state.totalPages = Math.ceil(state.total / 10); // Recalculate totalPages (assuming limit of 10)
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