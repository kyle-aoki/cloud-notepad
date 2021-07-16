import { takeEvery } from "redux-saga/effects";
import { Editor } from "../redux";

function* SaveNewFileSaga() {
  
}

function* SaveNewFileSagaMiddleware() {
  yield takeEvery(Editor.SAVE_NEW_FILE.meta.type, SaveNewFileSaga);
}