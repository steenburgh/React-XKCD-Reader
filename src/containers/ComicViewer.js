import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { PropTypes } from "react";
import _ from "lodash";
import Immutable from "immutable";
import PureRenderMixin from "react-immutable-render-mixin";
import Radium from "radium";
import React from "react";

import { loadComic, loadLatestComic } from "actions/Actions";
import Comic from "components/Comic";
import ConstrainedNumberPicker from "components/ConstrainedNumberPicker";
import KeyCodes from "constants/KeyCodes";
import Status from "components/Status";

const ComicViewer = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    comic: PropTypes.instanceOf(Immutable.Map).isRequired,
    error: PropTypes.bool.isRequired,
    latestComicNum: PropTypes.number.isRequired,
    loadComic: PropTypes.func.isRequired,
    loadLatestComic: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      comicNum: PropTypes.number.isRequired,
    }),
  },

  getDefaultProps () {
    return {
      comic: new Immutable.Map(),
      error: false,
      latestComicNum: -1,
      loadComic: _.noop,
      loadLatestComic: _.noop,
      loading: false,
      params: { comicNum: 0 },
    };
  },

  getInitialState () {
    return {
      firstLoad: true,
    };
  },

  componentWillMount () {
    if (this.props.params.comicNum === 0) {
      this.props.loadLatestComic().then(() => {
        this._selectComic(this.props.latestComicNum);
      });
    } else {
      this.props.loadLatestComic().then(() => {
        this.props.loadComic(this.props.params.comicNum);
      });
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.comicNum !== this.props.params.comicNum) {
      this.props.loadComic(nextProps.params.comicNum);
    }
  },

  _handleKeydown (ev) {
    switch (ev.keyCode) {
      case KeyCodes.LEFT:
        this._prevComic();
        break;
      case KeyCodes.RIGHT:
        this._nextComic();
        break;
      default:
        break;
    }
  },

  _nextComic () {
    const minNum = 1;
    const maxNum = this.props.latestComicNum;
    let nextNum = this.props.params.comicNum + 1;

    if (nextNum >= maxNum) {
      nextNum = minNum;
    }

    this._selectComic(nextNum);
  },

  _prevComic () {
    const minNum = 1;
    const maxNum = this.props.latestComicNum;
    let nextNum = this.props.params.comicNum - 1;

    if (nextNum <= minNum) {
      nextNum = maxNum;
    }

    this._selectComic(nextNum);
  },

  _selectComic (comicNum) {
    browserHistory.push(`/${comicNum}`);
  },

  render () {
    const {
      comic,
      error,
      latestComicNum,
      loading,
    } = this.props;

    const style = {
      container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "lightgray",
        ":focus": {
          outline: "none",
        },
      },
    };

    return (
      <div
        onKeyDown={this._handleKeydown}
        style={style.container}
        tabIndex={0}
      >
        {
          (this.props.latestComicNum !== -1) &&
          <ConstrainedNumberPicker
            maxNum={latestComicNum}
            num={this.props.params.comicNum}
            onPick={this._selectComic}
          />
        }
        {

          error || loading ?
            <Status
              error={error}
              loading={loading}
            /> :
            <Comic
              alt={comic.get("alt", "")}
              imageUrl={comic.get("img", "")}
              title={comic.get("title", "")}
            />
        }
      </div>
    );
  },

});

function mapStateToProps (state, ownProps) {
  return {
    comic: state.comics.getIn(["comics", ownProps.params.comicNum], new Immutable.Map()),
    error: state.status.error,
    latestComicNum: state.comics.get("latestComicNum", -1),
    loading: state.status.loading,
  };
}

export default connect(
  mapStateToProps,
  {
    loadComic,
    loadLatestComic,
  }
)(Radium(ComicViewer));
