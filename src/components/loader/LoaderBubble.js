import Radium from "radium";
import React from "react";

const BUBBLE_RADIUS = 25;

const pulseFadeKeyframes = Radium.keyframes({
  "0%, 80%, 100%": {
    transform: "scale(0)",
    opacity: 0,
  },
  "40%": {
    opacity: 1,
    transform: "scale(1)",
  },
}, "pulseFade");

function LoaderBubble ({ delay = null }) {

  const style = {
    bubble: {
      animation: "x 1.8s infinite ease-in-out",
      animationDelay: `${delay}s`,
      animationFillMode: "both",
      animationName: pulseFadeKeyframes,
      backgroundColor: "white",
      borderRadius: "50%",
      width: BUBBLE_RADIUS,
      height: BUBBLE_RADIUS,
    },

    container: {
      alignItems: "center",
      display: "flex",
      height: BUBBLE_RADIUS,
      justifyContent: "center",
      width: BUBBLE_RADIUS,
      margin: BUBBLE_RADIUS / 5,
    },
  };

  return (
    <div style={style.container}>
      <div style={style.bubble} />
    </div>
  );
}

export default Radium(LoaderBubble);
