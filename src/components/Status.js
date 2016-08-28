import React from "react";
import { PropTypes } from "react";

const Status = React.createClass({

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

    return (
      <div>
        {error ?
          <div>Error</div> :
          loading ?
            <div>Loading...</div> :
            <div>The thing is loaded</div>
        }
      </div>
    );
  },
});

export default Status;
