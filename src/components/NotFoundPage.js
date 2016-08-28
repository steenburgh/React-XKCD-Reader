import { IndexLink } from "react-router";
import React from "react";

const style = {
  textAlign: "center",
  padding: 10,
};

function NotFoundPage () {
  return (
    <div style={style}>
      <h2>
        Well, this is embarrassing...
      </h2>
      <p>
        We couldn't find the page you're looking for.
        Try using your back button or going to
        the <IndexLink to="/">home</IndexLink> page
      </p>
    </div>
  );
}

export default NotFoundPage;
