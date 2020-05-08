import React, { useState } from "react";
import * as SpotifyApi from "./spotify/spotifyApi";
import SinesthesiaContent from "./sinesthesiaContent";
import hash from "./spotify/hash";

const Sinesthesia = () => {
  // constructor() {
  //   super();
  //   this.state = {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [sketch, setSketch] = useState({ sketchID: 0 });
  const [track, setTrack] = useState();
  const [features, setFeatures] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [selectors, setSelectors] = useState([]);
  //   };

  //   this.handleChange.bind(this);
  // }
  // add handling for expired token

  if (!token && hash.access_token) {
    let _token = hash.access_token;
    console.log("token=" + _token);
    setToken(_token);
    localStorage.setItem("token", _token);
    getData(_token);
  } else if (token && !features) {
    debugger;
    getData(token);
  }

  console.log("token=" + token);

  function handleChange() {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    debugger;
    setSketch((prevParams) => ({
      ...prevParams,
      [name]: name === "sketchID" ? parseInt(value, 10) : value,
    }));
  }

  async function getData(token) {
    try {
      let newData = await SpotifyApi.getCurrentlyPlaying(token);
      setTrack(newData.item);
      displayTrackFeatures();
      setPlaying(true);
    } catch (e) {
      try {
        let newData = await SpotifyApi.getLastPlayed(token);
        setTrack(newData.items[0].track);
        setPlaying(false);
        displayTrackFeatures();
      } catch (e) {
        console.log("Bad token, erasing from state");
        setToken("");
      }
    }
  }

  async function displayTrackFeatures() {
    let features = await SpotifyApi.getTrackFeatures(token, track.id);
    // Object.keys(features).map((key) => {
    debugger;
    setFeatures(features);
    setSelectors([{ speed: "tempo" }, { color: "key" }]);
    // });
  }

  // render() {
  return (
    <SinesthesiaContent
      track={track}
      features={features}
      playing={playing}
      selectors={selectors}
      onChange={handleChange}
      getData={() => (token ? getData() : SpotifyApi.getToken())}
    />
  );
  // }
};

export default Sinesthesia;
