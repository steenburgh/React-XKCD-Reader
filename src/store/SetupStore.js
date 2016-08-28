import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

export function setupStore() {
  const store = createStore(
    rootReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk),
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
