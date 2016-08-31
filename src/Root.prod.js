import Promise from "bluebird";

if (window) {
  window.Promise = Promise;
  window.Promise.config({ cancellation: true });
}

import React from "react";
import ReactDOM from "react-dom";

import RootContainer from "./RootContainer";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <RootContainer />,
  rootEl
);
