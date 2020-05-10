import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function log(value) {
  console.log(value); //eslint-disable-line
}

const FlexSlider = ({ min, max, defaultValue }) => {
  return (
    <div style={{ height: 100 }}>
      <Slider min={min} max={max} onChange={log} defaultValue={defaultValue} />
    </div>
  );
};

export default FlexSlider;
