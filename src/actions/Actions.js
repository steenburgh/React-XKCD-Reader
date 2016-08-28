import XkcdApi from "api/XkcdApi";

const ActionTypes = {
  COMIC_FETCH_ERROR: "COMIC_FETCH_ERROR",
  COMIC_FETCH_START: "COMIC_FETCH_START",
  COMIC_FETCH_SUCCESS: "COMIC_FETCH_SUCCESS",
};


let _pendingRequest = null;

function loadComic (comicNum) {
  return (dispatch, getState) => {
    if (getState().comics.has(comicNum)) {
      return null;
    }

    dispatch({ type: ActionTypes.COMIC_FETCH_START, num: comicNum });
    if (_pendingRequest) {
      _pendingRequest.cancel();
    }
    _pendingRequest = XkcdApi.getComic(comicNum)
      .then((data) => {
        dispatch({
          type: ActionTypes.COMIC_FETCH_SUCCESS,
          comicNum,
          comicData: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.COMIC_FETCH_ERROR,
          err,
        });
      });

    return _pendingRequest;
  };
}

export {
  loadComic,
  ActionTypes,
};
