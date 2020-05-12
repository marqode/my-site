import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import FlexSlider from "../common/slider";

const speedOptions = ["energy", "tempo"];
const colorOptions = ["key", "acousticness", "valence"];
const varianceOptions = ["danceability", "tempo", "energy"];
// const saturationOptions = ["danceability", "valence"];

const MapTrackFeatures = ({
  features,
  selectors,
  flex,
  onChange,
  sliderChanges,
  reset,
}) => {
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
          <FlexSlider
            min={0.5}
            max={2}
            step={0.1}
            defaultValue={1}
            onChange={sliderChanges[0]}
            value={flex[0]}
          />
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
          <FlexSlider
            min={0.5}
            max={2}
            step={0.1}
            defaultValue={1}
            onChange={sliderChanges[1]}
            value={flex[1]}
          />
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
          <FlexSlider
            min={0.5}
            max={2}
            step={0.1}
            defaultValue={1}
            onChange={sliderChanges[2]}
            value={flex[2]}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <p>Use the flex sliders above to adjust values.</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-small" onClick={reset}>
            Reset Sketch
          </button>
        </div>
      </div>
    </>
  );
};

MapTrackFeatures.propTypes = {
  features: PropTypes.object.isRequired,
  selectors: PropTypes.array,
  flex: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  sliderChanges: PropTypes.array.isRequired,
  reset: PropTypes.func,
  // params: PropTypes.object,
  //   speed: PropTypes.string.isRequired,
};

export default MapTrackFeatures;
