import Promise from "bluebird";
import jsonp from "lib/jsonp";

const API_URL = "http://dynamic.xkcd.com/api-0/jsonp/";

function _makeJSONpRequest (url) {
  return new Promise((resolve, reject) => {
    jsonp(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function _callApi ({ apiUrl = API_URL, route }) {
  return _makeJSONpRequest(`${apiUrl}${route}`);
}

function getComic (num) {
  return _callApi({
    route: `comic/${num}`,
  });
}

function getLatestComic () {
  return _callApi({
    route: "comic",
  });
}

export default {
  getComic,
  getLatestComic,
};
