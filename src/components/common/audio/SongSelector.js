import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../SelectInput";

export default class SongSelector extends React.Component {
  render() {
    return (
      <SelectInput
        value={this.props.songs.indexOf(this.props.selectedSong)}
        onChange={this.handleSongChange.bind(this)}
        name="song"
        options={this.props.songs.map((song, index) => ({
          value: index,
          text: song.title,
        }))}
        label={"Select a song: "}
      />
    );
  }

  renderSongOptions() {
    return this.props.songs.map((song, index) => {
      return (
        <option key={index} value={index}>
          {song.title}
        </option>
      );
    });
  }

  handleSongChange(ev) {
    this.props.onSongSelected(this.props.songs[ev.target.value]);
  }
}

SongSelector.propTypes = {
  songs: PropTypes.array.isRequired,
  selectedSong: PropTypes.object,
  onSongSelected: PropTypes.func,
};
