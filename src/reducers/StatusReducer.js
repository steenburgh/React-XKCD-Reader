import { ActionTypes } from "actions/Actions";

const defaultStatus = {
  loading: false,
  error: false,
};

export default (state = defaultStatus, action) => {
  switch (action.type) {
    case ActionTypes.COMIC_FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionTypes.COMIC_FETCH_CACHE:
    case ActionTypes.COMIC_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ActionTypes.COMIC_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
