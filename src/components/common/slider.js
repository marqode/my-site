import React from "react";
import Slider from "rc-slider";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";

const FlexSlider = ({ min, max, step, onChange, defaultValue }) => {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

FlexSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default FlexSlider;
