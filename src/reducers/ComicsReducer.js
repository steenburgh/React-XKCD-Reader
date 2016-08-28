import * as Immutable from "immutable";

import { ActionTypes } from "actions/Actions";

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ActionTypes.COMIC_FETCH_SUCCESS:
      return state.set(
        action.comicNum,
        Immutable.fromJS(action.comicData)
      );
    default:
      return state;
  }
};

