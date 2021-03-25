import React from "react";
import ReactDOM from "react-dom";

//routing
import { BrowserRouter } from "react-router-dom";

//redux
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//part of the redux initial state (later from online)
import reducer from "./store/reducer";

//REDUX
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
