import React from "react";
import { Provider } from 'react-redux'

import RouteContainer from "./Routes";

function RootContainer () {
  return (
    <Provider store={null}>
      <RouteContainer />
    </Provider>
  );
}

export default RootContainer;
