import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import SelectInput from "../common/SelectInput";
// import Sketch02 from "./sketches/sketch02";
import SketchWrapper, { sketchList } from "./sketches/SketchWrapper";
import MapTrackFeatures from "./MapTrackFeatures";

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
  const [open, setOpen] = useState(true);
  const [params, setParams] = useState({
    speed: 60,
    color: 4,
    variance: 100,
  });
  const [version, setVersion] = useState(0);
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
        <div className="col col-md-3">
          <button
            className="btn btn-large btn-primary"
            onClick={() => getData()}
          >
            Click here to load Spotify data.
          </button>
          <br />
          <SelectInput
            name="sketchID"
            label="Processing Sketch"
            value={sketchID}
            defaultOption="Select Sketch"
            options={sketchList.map((sketch) => ({
              value: sketch.id,
              text: sketch.name,
            }))}
            onChange={onChange}
          />
        </div>
        {track ? (
          <>
            <div className="col-md-3">
              <div className="div">
                {playing ? "Currently Playing: " : "Last Played: "}
                {track.name}
                <br />
                by {track.artists[0].name}
              </div>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-secondary"
                onClick={() => setOpen(!open)}
                style={{ display: track ? "block" : "none" }}
                data-toggle="collapse"
                data-target="#track-features"
                aria-controls="track-features"
                aria-expanded={open}
              >
                Show Track Features
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <Collapse in={open}>
        <div className="collapse" id="track-features">
          {/* <div className="card card-body"> */}
          {features ? (
            <MapTrackFeatures
              onChange={onChange}
              onSliderChange={onSliderChange}
              sliderChanges={sliderChanges}
              features={features}
              // reset={() => {
              //   setVersion((version) => (version: version+1));
              // }}
              selectors={selectors}
              flex={flex}
              params={params}
              // reset={() => {sketchID = sketchID}}
            />
          ) : (
            ""
          )}
          {/* </div> */}
        </div>
      </Collapse>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <SketchWrapper sketch={sketchID} params={params} version={version} />
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
