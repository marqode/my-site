import React, { useState } from "react";
import MapTrackFeatures from "../MapTrackFeatures";
import { Collapse } from "react-bootstrap";

export default function SpotifyControls({
  sketchID,
  sketchList,
  version,
  features,
  selectors,
  flex,
  track,
  playing,
  params,
  setVersion,
  onChange,
  onSliderChange,
  sliderChanges,
  getData,
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="row justify-content-center controls-inner">
        <div className="col col-md-4">
          <button
            className="btn btn-large btn-primary"
            onClick={() => getData()}
          >
            Click here to load Spotify
          </button>
          <br />
        </div>
        {track ? (
          <>
            <div className="col-md-4">
              <div className="div">
                {playing ? "Currently Playing: " : "Last Played: "}
                {track.name}
                <br />
                by {track.artists[0].name}
              </div>
            </div>
            <div className="col-md-4">
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
        <div className="collapse controls-inner" id="track-features">
          {/* <div className="card card-body"> */}
          {features ? (
            <MapTrackFeatures
              onChange={onChange}
              onSliderChange={onSliderChange}
              sliderChanges={sliderChanges}
              features={features}
              reset={() => {
                let newVersion = version + 1;
                setVersion(newVersion);
              }}
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
    </>
  );
}
