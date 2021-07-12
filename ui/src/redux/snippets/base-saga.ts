import { takeEvery } from 'redux-saga/effects';

function* BASE_SAGA(): Generator<any, any, any> {}

export function* BASE_SAGAMiddlware() {
  yield takeEvery('', BASE_SAGA);
}
