//put at the end would just dispatch the action
import { put, delay } from "redux-saga/effects";
// import { delay } from "redux-saga";

import * as actions from "../actions/index";

//function* it is generator

export function* logoutSaga(action) {
  console.log("log out");
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  console.log("log out check auth timeout saga");
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout()); // we have to have call here because it is action creator aaa!
}
