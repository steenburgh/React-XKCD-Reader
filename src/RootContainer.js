import React from "react";
import { browserHistory } from "react-router";
import { Provider } from "react-redux"
import { syncHistoryWithStore } from "react-router-redux"

import RouteContainer from "./Routes";
import { setupStore } from "store/SetupStore";

function RootContainer () {
  const store = setupStore();
  const syncedHistory = syncHistoryWithStore(browserHistory, store);

  return (
    <Provider store={store}>
      <RouteContainer history={syncedHistory} />
    </Provider>
  );
}

export default RootContainer;
