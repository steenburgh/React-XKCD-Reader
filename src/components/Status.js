import { PropTypes } from "react";
import React from "react";
import PureRenderMixin from "react-immutable-render-mixin";

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
