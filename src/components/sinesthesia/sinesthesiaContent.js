import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import Sketch02 from "./sketches/sketch02";
import SketchWrapper, { sketchList } from "./sketches/SketchWrapper";
import SelectInput from "../common/SelectInput";
import SpotifyControls from "./spotify/SpotifyControls";
import AudioControls from "./AudioControls";

export const CONTROLSTATES = { SPOTIFY: "SPOTIFY", AUDIO: "AUDIO" };

// destructure props here
const SinesthesiaContent = ({
  sketchID,
  track,
  onChange,
  onSliderChange,
  sliderChanges,
  features,
  flex,
  selectors,
  getData,
  playing,
}) => {
  const [params, setParams] = useState({
    speed: 60,
    speedAdj: 60,
    color: 4,
    variance: 0.5,
  });
  const [version, setVersion] = useState(0);
  const [controls, setControls] = useState(CONTROLSTATES.AUDIO);
  // const [sketch, setSketch] = useState({ sketchID: 0 });

  useEffect(() => {
    if (features) {
      // params.speed = props.features.tempo;
      setParams({
        speed: features[selectors[0]] * flex[0],
        color: features[selectors[1]] * flex[1],
        variance: features[selectors[2]] * flex[2],
      });
    }
  }, [features, selectors]);

  const handleRateChange = (value) => {
    // setRate(value);
    // let prevSpeed = params.speed;
    setParams((prevParams) => ({
      ...prevParams,
      speedAdj: params.speed * value,
    }));
  };

  return (
    <>
      <div className="jumbotron">
        <blockquote>
          <h3>Sinesthesia</h3> (noun) a sensation produced in one modality when
          a stimulus is applied to another modality, as when the hearing of a
          certain sound induces the visualization of a certain color.
        </blockquote>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <p>
            Sinesthesia is unique among audio visualizers in that it uses music
            as the seed for pieces of generative art. Generative art, much like
            human art, is never exactly the same. This example uses a Perlin
            noise or double pendulum simulation to create an imprint of chaotic
            motion on the screen, inspired by whatever {"you've"} been listening
            to recently! Thank you for your patience with this work in progress
            :)
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="card text-center sinesthesia-controls">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              {/*<li className="nav-item">*/}
              {/*  <a*/}
              {/*    className={*/}
              {/*      controls === CONTROLSTATES.SPOTIFY*/}
              {/*        ? "nav-link active"*/}
              {/*        : "nav-link"*/}
              {/*    }*/}
              {/*    href="#"*/}
              {/*    onClick={(e) => {*/}
              {/*      e.preventDefault();*/}
              {/*      setControls(CONTROLSTATES.SPOTIFY);*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Spotify Data*/}
              {/*  </a>*/}
              {/*</li>*/}
              <li className="nav-item">
                <a
                  href="#"
                  className={
                    controls === CONTROLSTATES.AUDIO
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setControls(CONTROLSTATES.AUDIO);
                  }}
                >
                  Audio Player
                </a>
              </li>
            </ul>
          </div>
          {controls === CONTROLSTATES.SPOTIFY ? (
            <SpotifyControls
              sketchID={sketchID}
              sketchList={sketchList}
              version={version}
              features={features}
              selectors={selectors}
              flex={flex}
              track={track}
              playing={playing}
              params={params}
              setVersion={setVersion}
              onChange={onChange}
              onSliderChange={onSliderChange}
              sliderChanges={sliderChanges}
              getData={getData}
            />
          ) : (
            <AudioControls onRateChange={handleRateChange} />
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 style={{ marginTop: "10px" }}>Processing Sketch</h3>
          <SelectInput
            name="sketchID"
            label=""
            value={sketchID}
            defaultOption="Select Sketch"
            options={sketchList.map((sketch) => ({
              value: sketch.id,
              text: sketch.name,
            }))}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <SketchWrapper
            sketchID={sketchID}
            params={params}
            version={version}
            controls={controls}
          />
          {/* <Sketch02 hue={hue} /> */}
        </div>
      </div>
      <div className="row justify-content-center">
        <small>
          Source:{" "}
          <a href={sketchList[sketchID].url}>{sketchList[sketchID].url}</a>
        </small>
      </div>
    </>
  );
};

SinesthesiaContent.propTypes = {
  sketchID: PropTypes.number,
  features: PropTypes.object,
  track: PropTypes.object,
  selectors: PropTypes.array,
  flex: PropTypes.array,
  getData: PropTypes.func,
  onChange: PropTypes.func,
  onSliderChange: PropTypes.func,
  sliderChanges: PropTypes.array,
  playing: PropTypes.bool,
};

export default SinesthesiaContent;
