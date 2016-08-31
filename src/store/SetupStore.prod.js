import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

export function setupStore () {
  return createStore(
    rootReducer,
    applyMiddleware(thunk),
  );
}
