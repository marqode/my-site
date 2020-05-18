import React from "react";
import Player from "../common/audio/Player";

export default function AudioControls({ onRateChange }) {
  return (
    <div className="row justify-content-center controls-inner">
      <Player showLoop={true} showPlayback={true} onRateChange={onRateChange} />
    </div>
  );
}
