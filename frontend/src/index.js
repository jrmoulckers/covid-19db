import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ";

if (process.env.NODE_ENV === "production") {
  window.console.error = () => {};
  window.console.warn = () => {};
  window.console.trace = () => {};
  window.console.clear();
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
