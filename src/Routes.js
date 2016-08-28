import {
  IndexRedirect,
  Route,
  Router,
} from "react-router";
import React from "react";

import App from "./App";
import ComicViewer from "containers/ComicViewer";

const RouteContainer = React.createClass({

  propTypes: {
    history: React.PropTypes.object.isRequired,
  },

  getDefaultProps () {
    return {
      history: null,
    };
  },

  render () {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRedirect to="/0" />
          <Route path="/:comicNum" component={ComicViewer} />
        </Route>
      </Router>
    );
  },
});

export default RouteContainer;
