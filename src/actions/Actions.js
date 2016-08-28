import XkcdApi from 'api/XkcdApi';

const ActionTypes = {
  COMIC_FETCH_ERROR: "COMIC_FETCH_ERROR",
  COMIC_FETCH_START: "COMIC_FETCH_START",
  COMIC_FETCH_SUCCESS: "COMIC_FETCH_SUCCESS",
  COMIC_RESET_CACHE: "COMIC_RESET_CACHE",
};

function loadComic (comicNum) {
  return (dispatch, getState) => {
    if (getState().comics.has(comicNum)) {
      return null;
    }

    dispatch({ type: ActionTypes.COMIC_FETCH_START, num: comicNum });
    return XkcdApi.getComic(comicNum)
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
          payload: err,
        });
      });
  };
}

export {
  loadComic,
  ActionTypes,
};
