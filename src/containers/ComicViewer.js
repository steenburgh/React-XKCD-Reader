import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { PropTypes } from "react";
import _ from "lodash";
import Immutable from "immutable";
import PureRenderMixin from "react-immutable-render-mixin";
import React from "react";

import { loadComic } from "actions/Actions";
import Comic from "components/Comic";
import ConstrainedNumberPicker from "components/ConstrainedNumberPicker";
import Status from "components/Status";

const ComicViewer = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    comic: PropTypes.instanceOf(Immutable.Map).isRequired,
    error: PropTypes.bool.isRequired,
    loadComic: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      comicNum: PropTypes.number.isRequired,
    }),
  },

  getDefaultProps () {
    return {
      comic: new Immutable.Map(),
      error: false,
      loadComic: _.noop,
      loading: false,
      params: { comicNum: 0 },
    };
  },

  componentWillMount () {
    this.props.loadComic(this.props.params.comicNum);
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
      loading,
    } = this.props;

    const comicReady = !this.props.loading && !this.props.error;

    const style = {
      container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    };

    return (
      <div style={style.container}>
        <ConstrainedNumberPicker
          maxNum={1000}
          num={this.props.params.comicNum}
          onPick={this._selectComic}
        />
        {
          comicReady ?
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
    comic: state.comics.get(ownProps.params.comicNum, new Immutable.Map()),
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
