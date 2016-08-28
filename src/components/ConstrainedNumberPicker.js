import { PropTypes } from "react";
import _ from "lodash";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

const ConstrainedNumberPicker = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    maxNum: PropTypes.number.isRequired,
    minNum: PropTypes.number,
    num: PropTypes.number.isRequired,
    onPick: PropTypes.func,
  },

  getDefaultProps () {
    return {
      maxNum: 100,
      minNum: 1,
      num: 1,
      onPick: _.noop,
    };
  },

  getInitialState () {
    return {
      inputValue: this.props.num,
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ inputValue: nextProps.num });
  },

  _handleInputChange (ev) {
    const input = ev.target;

    if (_.isFinite(input.valueAsNumber)) {
      this.props.onPick(input.valueAsNumber);
    } else {
      this.setState({ inputValue: input.value });
    }
  },

  _firstComic () {
    this.props.onPick(this.props.minNum);
  },

  _lastComic () {
    this.props.onPick(this.props.maxNum);
  },

  _nextComic () {
    const {
      minNum,
      maxNum,
      num,
    } = this.props;

    let nextNum = num + 1;

    if (nextNum >= maxNum) {
      nextNum = minNum;
    }

    this.props.onPick(nextNum);
  },

  _prevComic () {
    const {
      num,
      minNum,
      maxNum,
    } = this.props;

    let nextNum = num - 1;

    if (nextNum <= minNum) {
      nextNum = maxNum;
    }

    this.props.onPick(nextNum);
  },

  render () {
    const {
      maxNum,
      minNum,
    } = this.props;

    const style = {
      container: {
        width: "100%",
        textAlign: "center",
      },
    };

    return (
      <div style={style.container}>
        <button onClick={this._firstComic}>First</button>
        <button onClick={this._prevComic}>Prev</button>
        <input
          max={maxNum}
          min={minNum}
          onChange={this._handleInputChange}
          type="number"
          value={this.state.inputValue}
        />
        <button onClick={this._nextComic}>Next</button>
        <button onClick={this._lastComic}>Current</button>
      </div>
    );
  },
});

export default ConstrainedNumberPicker;
