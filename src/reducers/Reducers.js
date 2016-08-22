import { routerReducer as routing } from "react-router-redux";

import { combineReducers } from "redux";

function reducer (state = {}, action) {
  switch (action.type) {
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  reducer,
  routing,
});

export default rootReducer;
