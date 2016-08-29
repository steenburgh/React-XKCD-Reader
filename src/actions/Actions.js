import Immutable from 'immutable';

import XkcdApi from "api/XkcdApi";

const ActionTypes = {
  COMIC_FETCH_CACHE: "COMIC_FETCH_CACHE",
  COMIC_FETCH_ERROR: "COMIC_FETCH_ERROR",
  COMIC_FETCH_START: "COMIC_FETCH_START",
  COMIC_FETCH_SUCCESS: "COMIC_FETCH_SUCCESS",
  COMIC_SET_LATEST: "COMIC_SET_LATEST",
};


let _pendingRequest = null;

function loadComic (comicNum) {
  return (dispatch, getState) => {
    const cache = getState().comics.get("comics", new Immutable.Map());

    if (cache.has(comicNum)) {
      dispatch({type: ActionTypes.COMIC_FETCH_CACHE});
      return null;
    }

    dispatch({ type: ActionTypes.COMIC_FETCH_START });
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

function loadLatestComic () {
  return (dispatch, getState) => {

    dispatch({ type: ActionTypes.COMIC_FETCH_START });

    return XkcdApi.getLatestComic()
      .then((data) => {
        dispatch({
          type: ActionTypes.COMIC_FETCH_SUCCESS,
          comicNum: data.num,
          comicData: data,
        });
        dispatch({
          type: ActionTypes.COMIC_SET_LATEST,
          comicNum: data.num,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.COMIC_FETCH_ERROR,
          err,
        });
      });

  };
}

export {
  loadComic,
  loadLatestComic,
  ActionTypes,
};
