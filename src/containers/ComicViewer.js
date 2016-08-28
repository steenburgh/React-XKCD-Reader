import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { PropTypes } from "react";
import _ from "lodash";
import Immutable from "immutable";
import React from "react";

import { loadComic } from "../actions/Actions";
import Comic from "../components/Comic";
import Status from "../components/Status";

const ComicViewer = React.createClass({

  propTypes: {
    comic: PropTypes.instanceOf(Immutable.Map).isRequired,
    comicNum: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    loadComic: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.object,
  },

  getDefaultProps () {
    return {
      comic: Immutable.Map(),
      comicNum: 0,
      error: false,
      loadComic: _.noop,
      loading: false,
      params: {},
    };
  },

  componentWillMount () {
    const comicNum = this.props.params && this.props.params.comicNum;
    if (!comicNum) {

    }

    this._loadComic(comicNum);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.comicNum !== nextProps.comicNum) {
      this._loadComic(this.props.comicNum);
    }
  },

  _loadComic (comicNum) {
    if (!comicNum) {
      return;
    }
    browserHistory.push(`/${comicNum}`);
    this.props.loadComic(comicNum);
  },

  render () {
    const {
      comic,
      error,
      loading,
    } = this.props;

    const comicReady = !this.props.loading && !this.props.error;

    return (
      <div>
        <Status
          error={error}
          loading={loading}
        />
        {
          comicReady && <Comic
            title={comic.get('title', 'ayy lmao')}
          />
        }
      </div>
    );
  },

});

function mapStateToProps (state, ownProps) {
  const comicNum = ownProps.params && ownProps.params.comicNum || 0;

  return {
    comic: comicNum ? state.comics.get(comicNum, Immutable.Map()) : Immutable.Map(),
    comicNum,
    error: state.status.error,
    loading: state.status.loading,
  };
}

export default connect(
  mapStateToProps,
  {
    loadComic,
  }
)(ComicViewer);
