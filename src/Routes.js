import { IndexRoute, Route, Router } from "react-router";
import React from "react";

import App from "./App";
import HomePage from "components/HomePage";
import NotFoundPage from "components/NotFoundPage";

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
          <IndexRoute component={HomePage}/>
          <Route path="*" component={NotFoundPage}/>
        </Route>
      </Router>
    );
  },
});

export default RouteContainer;
