// this file transforms parameters from Sinesthesia (e.g. track features)
// into sketch props and chooses a sketch to render

import React, { useEffect, useState } from "react";
import Sketch04 from "./sketch04";
import PerlinNoise from "./perlinNoise";
import FFTTest from "./FFTTest";
// import RecursionTree from "./RecursionTree";
import Petals from "./Petals";
import PropTypes from "prop-types";
import { CONTROLSTATES } from "../sinesthesiaContent";

export const sketchList = [
  {
    id: 0,
    name: "Perlin Noise",
    url: "https://www.openprocessing.org/sketch/494102",
  },
  { id: 1, name: "Double Pendulums", url: "https://owingit.github.io/art/" },
  {
    id: 2,
    name: "Petals",
    url: "https://www.openprocessing.org/sketch/819688",
  },
  { id: 3, name: "Mic FFTTest", url: "https://p5js.org/reference/#/p5.FFT" },
];

const SketchWrapper = ({ sketchID, params, version }) => {
  const colorMode = "HSB";
  const [reset, setReset] = useState(version);
  const [sketch, setSketch] = useState({ id: sketchID, version });
  let bg = params.color
    ? transformColor(params.color, colorMode)
    : [10, 10, 10];

  useEffect(() => {
    // setParams based off default track features or user selection
    standardizeParams();
    console.log("params: " + JSON.stringify(params));
  }, [params]);

  useEffect(() => {
    // setParams based off default track features or user selection
    // setReset(version);
    console.log("reset sketch");
    // setSketch((sketch) => ({ ...sketch, version }));
    setSketch({ id: sketchID, version });
  }, [version, sketchID]);

  // make all params between 0 and 1 -> to sketchWrapper
  const standardizeParams = () => {
    for (let [key, val] of Object.entries(params)) {
      if (key === "speed" || key === "speedAdj") break;
      if (val < 0) val *= -1;
      if (val > 1) {
        while (val > 1) val /= 10;
      } else if (val < 0.1) {
        while (val < 0.1) val *= 10;
      }
      params[key] = val;
    }
    // if (params["speed"]) params["speed"] *= 100;
  };

  // transform musical key (and other props?) into color
  function transformColor(color, colorMode) {
    if (colorMode === "HSB") {
      params.colorMode = "HSB";
      let hue = color * 360;
      return [hue, 80, 50];
    } else {
      // assume RGB
      params.colorMode = "RGB";
      // https://stackoverflow.com/questions/20792445/calculate-rgb-value-for-a-range-of-values-to-create-heat-map

      // let ratio = (2 * (color + 1)) / 13;
      let b = Math.min(255, 255 * color);
      let r = Math.min(255, 255 * (1 - color));
      let g = 255 - (b + r) / 2;
      return [r, g, b];
    }
  }

  switch (sketch.id) {
    case sketchList[0].id:
      return <PerlinNoise bg={bg} params={params} version={version} />;
    case sketchList[1].id:
      return <Sketch04 bg={bg} params={params} version={version} />;
    case sketchList[2].id:
      return <Petals bg={bg} params={params} version={version} />;
    case sketchList[3].id:
      return <FFTTest playing={true} />;
    default:
      return <div className="alert">Error with sketch :(</div>;
  }
  // return <Sketch04 bg={bg} colorMode={colorMode} params={params} />;
};

SketchWrapper.propTypes = {
  sketch: PropTypes.number,
  version: PropTypes.number,
  params: PropTypes.object,
};

export default SketchWrapper;
