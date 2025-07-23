import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} from './songsSlice';

function* fetchSongs(action) {
  try {
    const page = action.payload || 1;
    const response = yield call(axios.get, `${process.env.API_BASE_URL}/songs`, {
      params: { page, limit: 10 },
    });
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSong(action) {
  try {
    const response = yield call(axios.post, `${process.env.API_BASE_URL}/songs`, action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* updateSong(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(axios.put, `${process.env.API_BASE_URL}/songs/${id}`, data);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(axios.delete, `${process.env.API_BASE_URL}/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* watchSongsSaga() {
  yield all([
    takeEvery('songs/fetchSongsStart', fetchSongs),
    takeEvery('songs/addSong', addSong),
    takeEvery('songs/updateSong', updateSong),
    takeEvery('songs/deleteSong', deleteSong),
  ]);
}

export { watchSongsSaga };