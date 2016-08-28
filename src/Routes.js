import {
  IndexRedirect,
  Route,
  Router,
} from "react-router";
import React from "react";

import App from "./App";
import ComicRoutesWrapper from "./ComicRoutesWrapper";

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
          <IndexRedirect to="/1" />
          <Route path="/:comicNum" component={ComicRoutesWrapper} />
        </Route>
      </Router>
    );
  },
});

export default RouteContainer;
