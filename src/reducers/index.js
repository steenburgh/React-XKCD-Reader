import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";

import comics from "./ComicsReducer"
import status from "./StatusReducer";

const rootReducer = combineReducers({
  comics,
  status,
  routing,
});

export default rootReducer;
