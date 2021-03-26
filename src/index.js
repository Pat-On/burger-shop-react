import React from "react";
import ReactDOM from "react-dom";

//importing the middleware redux-thunk
import thunk from "redux-thunk";

//routing
import { BrowserRouter } from "react-router-dom";

//redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//part of the redux initial state (later from online)
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";

//setting up middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//combining the reducers
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});

//REDUX
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
