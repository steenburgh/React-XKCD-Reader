import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "reducers/Reducers";

export function setupStore() {
  const store = createStore(
    rootReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk),
  );

  if (module.hot) {
    module.hot.accept("reducers/Reducers", () => {
      const nextRootReducer = require("reducers/Reducers").default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}