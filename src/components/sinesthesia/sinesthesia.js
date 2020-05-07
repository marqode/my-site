import React from "react";
import * as SpotifyApi from "./spotify/spotifyApi";
import SinesthesiaContent from "./sinesthesiaContent";
import hash from "./spotify/hash";

class Sinesthesia extends React.Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null,
      // items: [],
      sketch: { sketchID: 0 },
      track: null,
      features: null,
      playing: false,
    };

    this.handleChange.bind(this);
  }

  handleChange() {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    this.setState(() => ({
      ...this.state.sketch,
      [name]: parseInt(value, 10),
    }));
  }

  async componentDidMount() {
    let _token = hash.access_token || this.state.token;
    // add handling for expired token

    if (_token) {
      console.log("token=" + _token);
      this.setState({
        token: _token,
      });
      localStorage.setItem("token", _token);
      this.getData(_token);
    }
  }

  async getData(token) {
    try {
      let newData = await SpotifyApi.getCurrentlyPlaying(token);
      this.setState({
        track: newData.item,
      });
      this.displayTrackFeatures();
      this.setState({ playing: true });
    } catch (e) {
      try {
        let newData = await SpotifyApi.getLastPlayed(token);
        this.setState({
          track: newData.items[0].track,
          playing: false,
        });
        this.displayTrackFeatures();
      } catch (e) {
        console.log("Bad token, erasing from state");
        this.setState({ token: "" });
      }
    }
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

  render() {
    return (
      <SinesthesiaContent
        track={this.state.track}
        features={this.state.features}
        playing={this.state.playing}
        onChange={this.handleChange}
        getToken={() =>
          this.state.token ? this.getData() : SpotifyApi.getToken()
        }
      />
    );
  }
}

export default Sinesthesia;
