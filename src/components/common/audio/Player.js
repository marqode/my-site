import React from "react";
import Sound from "react-sound";
import PlayerControls from "./PlayerControls";
import SongSelector from "./SongSelector";
import songs from "./songs";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlled: true,
      currentSong: songs[2],
      position: 0,
      volume: 100,
      playbackRate: 1,
      loop: false,
      playStatus: Sound.status.PLAYING,
    };
    this.onRateChange = this.props.onRateChange
      ? this.props.onRateChange
      : () => {};
    this.changePlayback = this.changePlayback.bind(this);
  }

  changePlayback = (value) => {
    this.onRateChange(value);
    this.setState({
      playbackRate: value,
    });
  };

  getStatusText() {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return "playing";
      case Sound.status.PAUSED:
        return "paused";
      case Sound.status.STOPPED:
        return "stopped";
      default:
        return "(unknown)";
    }
  }

  handleSongSelected = (song) => {
    this.setState({ currentSong: song, position: 0 });
  };

  handleControlledComponentChange = (ev) => {
    this.setState({
      controlled: ev.target.checked,
      position: 0,
    });
  };

  renderCurrentSong() {
    return (
      <div className="align-bottom mt-5">
        Current song {this.state.currentSong.title}. Song is{" "}
        {this.getStatusText()}
      </div>
    );
  }

  render() {
    const { volume, playbackRate, loop } = this.state;

    return (
      <div className="player bg-info">
        <div className="row">
          <div className="col-md-6">
            <SongSelector
              songs={songs}
              selectedSong={this.state.currentSong}
              onSongSelected={this.handleSongSelected}
            />
          </div>
          <div className="col-md-6">
            {this.state.currentSong && this.renderCurrentSong()}
          </div>
        </div>
        {/* <div className="row"> */}
        <PlayerControls
          playStatus={this.state.playStatus}
          loop={loop}
          showLoop={this.props.showLoop}
          showPlayback={this.props.showPlayback}
          onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
          onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onStop={() =>
            this.setState({ playStatus: Sound.status.STOPPED, position: 0 })
          }
          onSeek={(position) => this.setState({ position })}
          // onVolumeUp={() =>
          //   this.setState({ volume: volume >= 100 ? volume : volume + 10 })
          // }
          // onVolumeDown={() =>
          //   this.setState({ volume: volume <= 0 ? volume : volume - 10 })
          // }
          volume={this.state.volume}
          changeVolume={(value) => this.setState({ volume: value })}
          changePlayback={this.changePlayback}
          onPlaybackRateDown={() =>
            this.setState({
              playbackRate:
                playbackRate <= 0.5 ? playbackRate : playbackRate - 0.5,
            })
          }
          onToggleLoop={(e) => this.setState({ loop: e.target.checked })}
          duration={
            this.state.currentSong ? this.state.currentSong.duration : 0
          }
          position={this.state.position}
          playbackRate={playbackRate}
        />
        {this.state.currentSong && (
          <Sound
            url={this.state.currentSong.url}
            playStatus={this.state.playStatus}
            position={this.state.position}
            volume={volume}
            playbackRate={playbackRate}
            loop={loop}
            onLoading={({ bytesLoaded, bytesTotal }) =>
              console.log(`${(bytesLoaded / bytesTotal) * 100}% loaded`)
            }
            onLoad={() => console.log("Loaded")}
            onPlaying={({ position }) => this.setState({ position })}
            onPause={() => console.log("Paused")}
            onResume={() => console.log("Resumed")}
            onStop={() => console.log("Stopped")}
            onFinishedPlaying={() =>
              this.setState({ playStatus: Sound.status.STOPPED })
            }
          />
        )}
        {/* </div> */}
      </div>
    );
  }
}
