import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// Watcher saga - Watches for actions that are dispatched to the store.
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// Function that will create our API request and return a response
function fetchDog() {
  return axios({
    method: get,
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// Worker Saga - Makes the request when the Watcher saga see's there is a request/action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // Dispatch a success actionType to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });
  } catch (error) {
    // Dispatch a fail actionType to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
