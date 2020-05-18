import React from "react";
import * as SpotifyApi from "./spotify/spotifyApi";
import SinesthesiaContent from "./sinesthesiaContent";
import hash from "./spotify/hash";

class Sinesthesia extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      track: null,
      playing: false,
      features: null,
      sketchID: 2,
      color: "acousticness",
      speed: "tempo",
      variance: "energy",
      flex: [1, 1, 1],
      // selectors: [{ speed: "tempo" }, { color: "key" }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    // this.sliderChanges = this.sliderChanges.bind(this);
    this.sliderChanges.map((func) => {
      func.bind(this);
    });
  }

  async componentDidMount() {
    let _token = hash.access_token || localStorage.getItem("token");

    if (_token && _token !== "undefined") {
      console.log("token=" + _token);
      this.setState({
        token: _token,
      });
      if (this.getData(_token)) {
        localStorage.setItem("token", _token);
      }
    }
  }

  async getData(token) {
    try {
      let newData = await SpotifyApi.getCurrentlyPlaying(token);
      this.setState({
        playing: true,
        track: newData.item,
      });
      this.displayTrackFeatures();
    } catch (e) {
      try {
        let newData = await SpotifyApi.getLastPlayed(token);
        this.setState({
          track: newData.items[0].track,
        });
        this.displayTrackFeatures();
      } catch (e) {
        console.log("Get Data failed with error: " + e);
        this.setState({ token: null });
        return false;
      }
    }
    return true;
  }

  async displayTrackFeatures() {
    let features = await SpotifyApi.getTrackFeatures(
      this.state.token,
      this.state.track.id
    );
    // Object.keys(features).map((key) => {
    this.setState({
      features,
    });
    // });
  }

  // right now this only allows changing an entire state variable, instead of an object property
  handleChange() {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    // let sketch = this.state.sketch
    this.setState((sketch) => ({
      ...sketch,
      [name]: name === "sketchID" ? parseInt(value, 10) : value,
    }));
  }

  handleSliderChange(index, value) {
    this.setState((state) => ({
      flex: state.flex.map((item, i) => {
        if (i == index) return value;
        else return item;
      }),
    }));
  }

  sliderChanges = [
    (value) => {
      this.handleSliderChange(0, value);
    },

    (value) => {
      this.handleSliderChange(1, value);
    },
    (value) => {
      this.handleSliderChange(2, value);
    },
  ];

  render() {
    return (
      <SinesthesiaContent
        sketchID={this.state.sketchID}
        selectors={[this.state.speed, this.state.color, this.state.variance]}
        track={this.state.track}
        playing={this.state.playing}
        features={this.state.features}
        flex={this.state.flex}
        onChange={this.handleChange}
        // resetSketch={() => {this.setState(this.state => {sket})}}
        sliderChanges={this.sliderChanges}
        getData={() =>
          this.state.token ? this.getData() : SpotifyApi.getToken()
        }
      />
    );
  }
}

export default Sinesthesia;
