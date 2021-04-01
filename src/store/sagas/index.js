// It can be called as well rootSaga

//takeEvery is going to allow us to listen to certain  actions and do something when something is gpoing to appear
import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from "./auth";

export function* watchAuth() {
  //by this we are setting the listener to the action type and by this
  // when the action of specific type appear we are going to yield it out
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
