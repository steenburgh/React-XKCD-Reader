import { PropTypes } from "react";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

import Loader from "components/loader/Loader";

const ImageWithLoader = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
  },

  getDefaultProps () {
    return {
      src: "",
      style: {},
    };
  },

  getInitialState () {
    return ({
      imageLoaded: false,
    });
  },

  render () {
    const style = {
      image: this.state.imageLoaded ?
        this.props.style :
        { display: "none" },
      loader: {
        marginTop: 100,
      },
    };


    return (
      <div>
        {
          !this.state.imageLoaded &&
            <div style={style.loader} >
              <Loader />
            </div>
        }
        <img
          onLoad={() => this.setState({ imageLoaded: true })}
          src={this.props.src}
          style={style.image}
        />
      </div>
    );
  },
});

export default ImageWithLoader;