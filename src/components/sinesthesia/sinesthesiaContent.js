import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import SelectInput from "../common/SelectInput";
// import Sketch02 from "./sketches/sketch02";
import SketchWrapper, { sketchList } from "./sketches/SketchWrapper";

const SinesthesiaContent = (props) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({ a: 0.411, b: 0.096, c: 10, d: -17 });
  const [sketch, setSketch] = useState({ sketchID: 0 });

  useEffect(() => {
    if (props.features) {
      // params.speed = props.features.tempo;
      setParams({ speed: props.features.tempo });
    }
  }, [props.features]);

  function handleChange() {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    setSketch((prevSketch) => ({
      ...prevSketch,
      [name]: parseInt(value, 10),
    }));
  }

  // const speedParams = ["tempo", "danceability", "energy"];
  // const colorParams = ["key"];
  // const satParams = ["loudness", "speechiness"];

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
            human art, is never exactly the same. This example uses a double
            pendulum simulation to create an imprint of chaotic motion on the
            screen, inspired by whatever {"you've"} been listening to recently!
            Thank you for your patience with this work in progress :)
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-md-3">
          <button
            className="btn btn-large btn-primary"
            onClick={() => props.getToken()}
          >
            Click here to load Spotify data.
          </button>
          <br />
          <SelectInput
            name="sketchID"
            label="Processing Sketch"
            value={sketch.sketchID}
            defaultOption="Select Sketch"
            options={sketchList.map((sketch) => ({
              value: sketch.id,
              text: sketch.name,
            }))}
            onChange={handleChange}
          />
        </div>
        {props.track ? (
          <>
            <div className="col-md-3">
              <div className="div">
                {props.playing ? "Currently Playing: " : "Last Played: "}
                {props.track.name}
                <br />
                by {props.track.artists[0].name}
              </div>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-secondary"
                onClick={() => setOpen(!open)}
                style={{ display: props.track ? "block" : "none" }}
                data-toggle="collapse"
                data-target="#track-features"
                aria-controls="track-features"
                aria-expanded={open}
              >
                Show Track Features
              </button>
            </div>
            <div className="row justify-content-center">
              <Collapse in={open}>
                <div className="collapse" id="track-features">
                  <div className="card card-body">
                    {props.features
                      ? Object.keys(props.features).map((key) => {
                          return (
                            <li key={key}>
                              {key}: {props.features[key]}
                            </li>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </Collapse>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <SketchWrapper
            sketch={sketch.sketchID}
            params={params}
            scaleKey={4}
          />
          {/* <Sketch02 hue={hue} /> */}
        </div>
      </div>
    </>
  );
};

// replace features list with selects
{
  /* <SelectInput
name="sketchID"
label="Processing Sketch"
value={speedParams[0]}
defaultOption="Speed Mapping"
options={sketchList.map((sketch) => ({
  value: sketch.id,
  text: sketch.name,
}))}
onChange={handleChange}
/> */
}

SinesthesiaContent.propTypes = {
  features: PropTypes.object,
  track: PropTypes.object,
  getToken: PropTypes.func,
  onChange: PropTypes.func,
  playing: PropTypes.bool,
};

export default SinesthesiaContent;
