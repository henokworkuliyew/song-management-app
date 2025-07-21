import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} from './songsSlice';

function* fetchSongsSaga(action) {
  try {
    yield put(fetchSongsStart());
    const response = yield call(axios.get, `${process.env.API_BASE_URL}/songs?page=${action.payload}&limit=10`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action) {
  try {
    const response = yield call(axios.post, `${process.env.API_BASE_URL}/songs`, action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `${process.env.API_BASE_URL}/songs/${action.payload.id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${process.env.API_BASE_URL}/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchSongsSaga() {
  yield takeEvery('songs/fetchSongs', fetchSongsSaga);
  yield takeEvery('songs/addSong', addSongSaga);
  yield takeEvery('songs/updateSong', updateSongSaga);
  yield takeEvery('songs/deleteSong', deleteSongSaga);
}