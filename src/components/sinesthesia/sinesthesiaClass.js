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
      features: null,
      sketchID: 2,
      color: "acousticness",
      speed: "tempo",
      variance: "energy",
      // selectors: [{ speed: "tempo" }, { color: "key" }],
    };

    this.handleChange = this.handleChange.bind(this);
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
    // let sketch = this.state.sketch;
    this.setState((sketch) => ({
      ...sketch,
      [name]: name === "sketchID" ? parseInt(value, 10) : value,
    }));
  }

  render() {
    return (
      <SinesthesiaContent
        sketchID={this.state.sketchID}
        selectors={[this.state.speed, this.state.color, this.state.variance]}
        track={this.state.track}
        features={this.state.features}
        onChange={this.handleChange}
        getData={() =>
          this.state.token ? this.getData() : SpotifyApi.getToken()
        }
      />
    );
  }
}

export default Sinesthesia;
