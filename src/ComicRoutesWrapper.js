import _ from "lodash";
import React from "react";
import { PropTypes } from "react";

import ComicViewer from "containers/ComicViewer";
import NotFoundPage from "components/NotFoundPage";


const ComicRoutesWrapper = React.createClass({

  // 8/28/16
  // This is a hack to get around the fact that React router is missing the ability to add integer matchers for routes
  // Eg. we can't write path="/:<int:comicNum>" or matcher={(comicNum) => return _.isFinite(comicNum)}
  // https://github.com/reactjs/react-router/issues/2286
  propTypes: {
    params: PropTypes.shape({
      comicNum: PropTypes.string.isRequired,
    }),
  },

  getDefaultProps () {
    return {
      params: { comicNumStr: "0" },
    };
  },

  render () {
    const parsedComicNum = Number(this.props.params.comicNum);

    if (!_.isFinite(parsedComicNum)) {
      return <NotFoundPage />;
    }

    return <ComicViewer params={{ comicNum: parsedComicNum }} />;
  },

});

export default ComicRoutesWrapper;
