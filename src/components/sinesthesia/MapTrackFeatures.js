import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import FlexSlider from "../common/slider";

const speedOptions = ["energy", "tempo"];
const colorOptions = ["key", "acousticness", "valence"];
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
            value={selectors[0]}
            defaultOption="Select Track Feature"
            options={speedOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
          <FlexSlider min={0} max={200} defaultValue={features[selectors[0]]} />
        </div>
        <div className="col-md-3">
          <SelectInput
            name="color"
            label="Map Features to Color"
            value={selectors[1]}
            defaultOption="Select Track Feature"
            options={colorOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
          <FlexSlider min={0} max={1} defaultValue={features[selectors[1]]} />
        </div>
        <div className="col-md-3">
          <SelectInput
            name="variance"
            label="Map Features to Variance"
            value={selectors[2]}
            defaultOption="Select Track Feature"
            options={varianceOptions.map((option) => ({
              value: option,
              text: option + ": " + features[option],
            }))}
            onChange={onChange}
          />
          <FlexSlider min={0} max={1} defaultValue={features[selectors[2]]} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <p>Use the flex sliders above to adjust values.</p>
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
