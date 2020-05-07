import React from "react";
import PropTypes from "proptypes";
import SelectInput from "../common/SelectInput";

const MapTrackFeatures = (props) => {
  //
};

function handleChange() {
  // destructure on first line to avoid errors
  const { name, value } = event.target;
  setSketch((prevSketch) => ({
    ...prevSketch,
    [name]: parseInt(value, 10),
  }));
}

MapTrackFeatures.PropTypes = {
  features: PropTypes.object.isRequired,
};

export default MapTrackFeatures;
