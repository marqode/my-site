import React from "react";
import Sound from "react-sound";
import FlexSlider from "../slider";

function control(text, clickHandler) {
  const onClick = (ev) => {
    ev.preventDefault();
    clickHandler();
  };
  return (
    <a href="#" className="btn btn-secondary" onClick={onClick}>
      {text}
    </a>
  );
}

const numberFormat = new Intl.NumberFormat([], { minimumFractionDigits: 2 });

export default class PlayerControls extends React.Component {
  render() {
    return <div>{this.renderControls()}</div>;
  }

  renderControls() {
    const controls = {
      play: this.props.playStatus === Sound.status.STOPPED,
      stop: this.props.playStatus !== Sound.status.STOPPED,
      pause: this.props.playStatus === Sound.status.PLAYING,
      resume: this.props.playStatus === Sound.status.PAUSED,
    };

    return (
      <div className="controls form-group">
        {/* <button onClick={this.props.onVolumeDown}>-</button>
        <button onClick={this.props.onVolumeUp}>+</button> */}
        <div className="row">
          <div className="col-md-6 controls">
            {controls.play && control("Play", this.props.onPlay)}
            {controls.stop && control("Stop", this.props.onStop)}
            {controls.pause && control("Pause", this.props.onPause)}
            {controls.resume && control("Resume", this.props.onResume)}
            {this.props.showLoop ? (
              <>
                Loop{" "}
                <input
                  type="checkbox"
                  checked={this.props.loop}
                  onChange={this.props.onToggleLoop}
                />
              </>
            ) : (
              ""
            )}
          </div>
          {this.props.showPlayback ? (
            ""
          ) : (
            <div className="col-md-6">
              Volume:
              <FlexSlider
                min={0}
                max={100}
                defaultValue={100}
                value={this.props.volume}
                onChange={this.props.changeVolume}
                marks={{ 0: "0", 50: "50", 100: "100" }}
              />
            </div>
          )}
        </div>
        {this.props.showPlayback ? (
          <div className="row">
            <div className="col-md-6">
              Volume:
              <FlexSlider
                min={0}
                max={100}
                defaultValue={100}
                value={this.props.volume}
                onChange={this.props.changeVolume}
                marks={{ 0: "0", 50: "50", 100: "100" }}
              />
            </div>
            <div className="col-md-6">
              Playback Rate:
              <FlexSlider
                defaultValue={1}
                min={0.25}
                max={4}
                step={0.25}
                value={this.props.playbackRate}
                onChange={this.props.changePlayback}
                marks={{
                  0.25: "x1/4",
                  0.5: "x1/2",
                  1: "x1",
                  2: "x2",
                  4: "x4",
                }}
              />
              {/* <button onClick={this.props.onPlaybackRateDown}>-</button>{" "}
          {numberFormat.format(this.props.playbackRate)}{" "}
          <button onClick={this.props.onPlaybackRateUp}>+</button> */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      // </div>
    );
  }
}
