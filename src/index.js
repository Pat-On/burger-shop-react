import React from "react";
import ReactDOM from "react-dom";

//importing the middleware redux-thunk
import thunk from "redux-thunk";

//routing
import { BrowserRouter } from "react-router-dom";

//redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

//saga-redux
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//part of the redux initial state (later from online)
//so here we have our global state divided into two files plus reducers (functions) which are going to modify in
//immutable way the state and trigger the subscriber pattern, and by this bringing the changes into the view port
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

import { logoutSaga } from "./store/sagas/auth";

//setting up middleware - "programs" which are working "in half step"
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

//combining the reducers - and we become one!
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});
//creating sagaMiddleware like before in others
const sagaMiddleware = createSagaMiddleware();

//REDUX - rootReducer - contain the state + "reducers", so why exactly we are plugging the middleware?
//middleware between action and reducers, so It may be only the implementation
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(logoutSaga);

//connecting store to our react application + browser router
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

//DEFAULT - performance relayer

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
