import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
// import Sketch02 from "./sketches/sketch02";
import Sketch04 from "./sketches/sketch04";

const SinesthesiaContent = (props) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({ a: 0.411, b: 0.096, c: 10, d: -17 });

  useEffect(() => {
    // if (props.features) {
    //   setHue(props.features.key * 33);
    // }
    // setParams based off default track features or user selection
    standardizeParams();
    console.log("params: " + JSON.stringify(params));
  }, []);

  // make all params between 0 and 1
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
        </div>
        {props.track ? (
          <>
            <div className="col-md-3">
              <div className="div">
                Currently Playing: {props.track.name}
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
      <div>
        <Sketch04 params={params} />
        {/* <Sketch02 hue={hue} /> */}
      </div>
    </>
  );
};

SinesthesiaContent.propTypes = {
  features: PropTypes.object,
  track: PropTypes.object,
  getToken: PropTypes.func,
};

export default SinesthesiaContent;
