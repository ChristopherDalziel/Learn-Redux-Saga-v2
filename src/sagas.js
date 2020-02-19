import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// Watcher saga - Watches for actions that are dispatched to the store.
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// Function that will create our API request and return a response
function fetchDog() {
  return axios({
    method: "get",
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

// Notes:

/* 
takeLatest -  is a helper function provided by redux-saga that will trigger a new workerSaga when it sees an API_CALL_REQUEST, while cancelling any previously triggered workerSaga still in process.

yield - in a generator basically represents an asynchronous step in a more synchronous/sequential process — somewhat like await in an async function.

watcherSaga - is a saga that watches for an action to be dispatched to the Store, triggering a workerSaga.

workerSaga - attempts to fetchDog, using another redux-saga helper function call, and stores the result (a resolved or failed Promise) in a response variable.
*/
