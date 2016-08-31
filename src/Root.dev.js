import Promise from "bluebird";

if (window) {
  window.Promise = Promise;
  window.Promise.config({ cancellation: true });
}

import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";

import RootContainer from "./RootContainer";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <AppContainer>
    <RootContainer />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept("RootContainer", () => {
    const NextApp = require("./RootContainer").default;

    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}

