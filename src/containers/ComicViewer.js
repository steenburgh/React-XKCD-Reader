import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { PropTypes } from "react";
import _ from "lodash";
import Immutable from "immutable";
import PureRenderMixin from "react-immutable-render-mixin";
import React from "react";

import { loadComic, loadLatestComic } from "actions/Actions";
import Comic from "components/Comic";
import ConstrainedNumberPicker from "components/ConstrainedNumberPicker";
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
      },
    };

    if (this.props.latestComicNum === -1) {
      return (
        <Status
          error={error}
          loading={loading}
        />
      );
    }

    return (
      <div style={style.container}>
        <ConstrainedNumberPicker
          maxNum={latestComicNum}
          num={this.props.params.comicNum}
          onPick={this._selectComic}
        />
        {
          (!this.props.loading && !this.props.error) ?
            <Comic
              alt={comic.get("alt", "")}
              imageUrl={comic.get("img", "")}
              title={comic.get("title", "")}
            /> :
            <Status
              error={error}
              loading={loading}
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
)(ComicViewer);
