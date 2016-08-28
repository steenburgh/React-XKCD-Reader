import React from "react";
import { PropTypes } from "react";

const Comic = React.createClass({

  propTypes: {
    title: PropTypes.string.isRequired,
  },

  getDefaultProps () {
    return {
      error: false,
      loading: false,
    };
  },

  render () {
    const { title } = this.props;

    const style = {
      border: "1px solid black",
      margin: "auto",
      padding: "10px",
    };

    return (
      <div style={style}>{title}</div>
    );
  },
});

export default Comic;
