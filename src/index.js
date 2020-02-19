// Standard create-react-app imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux imports
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from "./actions/index";
import { watcherSaga } from "./sagas";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Dev tools middleware.. visible in Chrome/Browser (Redux Dev Tools Download Required)
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create a redux store with our reducer above and middleware
let store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

// Run the saga (Running the saga triggers the workerSaga when an API request is made)
sagaMiddleware.run(watcherSaga);

// React-redux provider wrapping our app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
