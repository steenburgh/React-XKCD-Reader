import { browserHistory } from "react-router";
import { Provider } from "react-redux"
import { StyleRoot } from 'radium';
import { syncHistoryWithStore } from "react-router-redux"
import React from "react";

import RouteContainer from "./Routes";
import { setupStore } from "store/SetupStore";

function RootContainer () {
  const store = setupStore();
  const syncedHistory = syncHistoryWithStore(browserHistory, store);

  return (
    <StyleRoot>
      <Provider store={store}>
        <RouteContainer history={syncedHistory} />
      </Provider>
    </StyleRoot>
  );
}

export default RootContainer;
