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
  // const [track, setTrack] = useState();
  let track = null;
  let trackFeatures = null;
  const [features, setFeatures] = useState(null);
  const [playing, setPlaying] = useState(false);
  let selectors = [];
  // const [selectors, setSelectors] = useState([]);
  //   };

  //   this.handleChange.bind(this);
  // }
  // add handling for expired token

  if (hash.access_token) {
    let _token = hash.access_token;
    console.log("token=" + _token);
    setToken(_token);
    localStorage.setItem("token", _token);
    setFeatures(getData(_token));
  } else if (token && !trackFeatures && !features) {
    debugger;
    setFeatures(getData(token));
  }

  console.log("token=" + token);

  function handleChange() {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    setSketch((prevSketch) => ({
      ...prevSketch,
      [name]: name === "sketchID" ? parseInt(value, 10) : value,
    }));
  }

  async function getData(token) {
    try {
      let newData = await SpotifyApi.getCurrentlyPlaying(token);
      track = newData.item;
      // setTrack(newData.item);
      setPlaying(true);
      return await displayTrackFeatures();
    } catch (e) {
      try {
        let newData = await SpotifyApi.getLastPlayed(token);
        track = newData.items[0].track;
        // setTrack(newData.items[0].track);
        setPlaying(false);
        return await displayTrackFeatures();
      } catch (e) {
        console.log("Bad token, erasing from state, ", e);
        setToken(null);
      }
    }
  }

  async function displayTrackFeatures() {
    let features = await SpotifyApi.getTrackFeatures(token, track.id);
    // Object.keys(features).map((key) => {
    debugger;
    // setFeatures(features);
    trackFeatures = features;
    selectors = [{ speed: "tempo" }, { color: "key" }];
    return features;
    // setSelectors([{ speed: "tempo" }, { color: "key" }]);
    // });
  }

  // render() {
  return (
    <SinesthesiaContent
      track={track}
      features={trackFeatures}
      playing={playing}
      selectors={selectors}
      onChange={handleChange}
      getData={() => (token ? getData() : SpotifyApi.getToken())}
    />
  );
  // }
};

export default Sinesthesia;
