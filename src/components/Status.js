import { PropTypes } from "react";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

import Loader from "components/loader/Loader";

const Status = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  },

  getDefaultProps () {
    return {
      error: false,
      loading: false,
    };
  },

  render () {
    const { error, loading } = this.props;

    if (!error && !loading) {
      return null;
    }

    const style = {
      container: {
        alignItems: "center",
        display: "flex",
        height: "300px",
        justifyContent: "center",
        width: "100%",
      },
    };

    return (
      <div style={style.container}>
        {
          error ?
            <p>Error loading comic</p> :
            loading ?
              <Loader /> :
              null
        }
      </div>
    );
  },
});

export default Status;
