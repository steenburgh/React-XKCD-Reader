import * as Immutable from "immutable";

import { ActionTypes } from "actions/Actions";

const defaultState = Immutable.fromJS({
  comics: Immutable.Map(),
  latestComicNum: -1,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.COMIC_FETCH_SUCCESS:
      return state.setIn(
        ["comics", action.comicNum],
        Immutable.fromJS(action.comicData)
      );
    case ActionTypes.COMIC_SET_LATEST:
      return state.set("latestComicNum", action.comicNum);
    default:
      return state;
  }
};

