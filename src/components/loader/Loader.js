import React from "react";

import LoaderBubble from "components/loader/LoaderBubble";

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
};

function Loader () {
  return (
    <div style={style.container}>
      <LoaderBubble delay={-0.32}/>
      <LoaderBubble delay={-0.16}/>
      <LoaderBubble delay={-0}/>
    </div>
  );
}

export default Loader;
