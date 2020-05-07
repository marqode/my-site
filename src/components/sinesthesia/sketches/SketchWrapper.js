// this file transforms parameters from Sinesthesia (e.g. track features)
// into sketch props and chooses a sketch to render

import React, { useEffect } from "react";
import Sketch04 from "./sketch04";
import PerlinNoise from "./perlinNoise";
import PropTypes from "prop-types";

export const sketchList = [
  { id: 0, name: "Perlin Noise", sketch: PerlinNoise },
  { id: 1, name: "Double Pendulums", sketch: Sketch04 },
];

const SketchWrapper = ({ sketch, scaleKey, params }) => {
  const colorMode = "HSB";
  let bg = scaleKey ? transformKey(scaleKey, colorMode) : [10, 10, 10];

  useEffect(() => {
    // setParams based off default track features or user selection
    standardizeParams();
    console.log("params: " + JSON.stringify(params));
  }, []);

  // make all params between 0 and 1 -> to sketchWrapper
  const standardizeParams = () => {
    for (let [key, val] of Object.entries(params)) {
      if (val < 0) val *= -1;
      if (val > 1) {
        while (val > 1) val /= 10;
      } else if (val < 0.1) {
        while (val < 0.1) val *= 10;
      }
      params[key] = val;
    }
  };

  // transform musical key (and other props?) into color
  function transformKey(key, colorMode) {
    if (colorMode === "HSB") {
      let hue = (key + 1) * (360 / 12);
      return [hue, 80, 50];
    } else {
      // assume RGB
      // https://stackoverflow.com/questions/20792445/calculate-rgb-value-for-a-range-of-values-to-create-heat-map

      let ratio = (2 * (key + 1)) / 13;
      let b = Math.max(0, 255 * (1 - ratio));
      let r = Math.max(0, 255 * (ratio - 1));
      let g = 255 - b - r;
      return [r, g, b];
    }
  }

  switch (sketch) {
    case sketchList[0].id:
      return <PerlinNoise bg={bg} params={params} />;
    case sketchList[1].id:
      return <Sketch04 bg={bg} params={params} />;
    default:
      return <div className="alert">Error with sketch :(</div>;
  }
  // return <Sketch04 bg={bg} colorMode={colorMode} params={params} />;
};

// SketchWrapper.propTypes = {
//   key: PropTypes.number,
// };

export default SketchWrapper;
