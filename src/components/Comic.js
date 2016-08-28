import { PropTypes } from "react";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

const Comic = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    alt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  },

  getDefaultProps () {
    return {
      alt: "",
      imageUrl: "",
      title: "",
    };
  },

  render () {
    const {
      alt,
      imageUrl,
      title,
    } = this.props;

    const style = {
      container: {
        display: "flex",
        flexDirection: "column",
      },
      img: {
        margin: "auto",
        maxWidth: "100%",
      },
      title: {
        textAlign: "center",
      },
    };

    return (
      <div
        style={style.container}
        title={alt}
      >
        <h2 style={style.title}>
          {title}
        </h2>
        <img
          src={imageUrl}
          style={style.img}
        />
      </div>
    );
  },
});

export default Comic;
