import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const speedOptions = ["energy", "tempo"];
const colorOptions = ["key", "mode", "valence"];
const varianceOptions = ["danceability", "tempo", "energy"];
// const saturationOptions = ["danceability", "valence"];

const MapTrackFeatures = ({ features, selectors, onChange }) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <SelectInput
            name="speed"
            label="Map Features to Speed"
            value={selectors.speed}
            defaultOption="Select Track Feature"
            options={speedOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
        </div>
        <div className="col-md-3">
          <SelectInput
            name="color"
            label="Map Features to Color"
            value={selectors.color}
            defaultOption="Select Track Feature"
            options={colorOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
        </div>
        <div className="col-md-3">
          <SelectInput
            name="color"
            label="Map Features to Variance"
            value={selectors.variance}
            defaultOption="Select Track Feature"
            options={varianceOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

MapTrackFeatures.propTypes = {
  features: PropTypes.object.isRequired,
  selectors: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  //   speed: PropTypes.string.isRequired,
};

export default MapTrackFeatures;
