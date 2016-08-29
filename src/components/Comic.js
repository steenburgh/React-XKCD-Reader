import { PropTypes } from "react";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

import ImageWithLoader from "components/ImageWithLoader";

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
      image: {
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
        <ImageWithLoader
          src={imageUrl}
          style={style.image}
        />
      </div>
    );
  },
});

export default Comic;
