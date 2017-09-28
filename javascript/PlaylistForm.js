import React, { Component } from 'react';

export default class PlaylistForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

      song: [{ user_name: '', artist_band: '', song_title: '', notes: '', favorite_song: false }],
      user_name: '',
      artist_band: '',
      song_title: '',
      notes: '',
    };
  };

  userName(event) {
    this.setState({ user_name: event.target.value });
    console.log(event.target.value);
  };

  artistBand(event) {
    this.setState({ artist_band: event.target.value });
    console.log(event.target.value);
  };

  songTitle(event) {
    this.setState({ song_title: event.target.value });
    console.log(event.target.value);
  };

  notes(event) {
    this.setState({ notes: event.target.value });
    console.log(event.target.value);
  };

  favoriteButton(event) {
    this.setState({ favorite_song: true });
    console.log(event.target.value);
  };

  submitButton(event) {
    if (this.state.favorite_song) {
      this.state.song.push({
        user_name: this.state.user_name,
        artist_band: this.state.artist_band,
        song_title: this.state.song_title,
        notes: this.state.notes,
        favorite_song: true,
      });
    } else
      this.state.favorite_song = false;

    console.log(this.state.song);
  };

  };

  const starterSongs = [{
    user_name: 'Ken',
    artist_band: 'AC/DC',
    song_title: 'Thunderstruck',
    notes: 'Great song',
    favorite_song: true,
  },
  {
    user_name: 'Ericka',
    artist_band: 'Frank Sinatra',
    song_title: 'Ain\'t that a kick in the head',
    notes: 'A classic',
    favorite_song: true,
  },
  {
  user_name: 'Mike',
  artist_band: 'John Williams',
  song_title: 'Superman Theme',
  notes: 'Well Written',
  favorite_song: true,
  }];

  render() {
    return (
      <div>
        <input type ="text" placeholder = "Name or User Name"
          onChange={(event) => this.userName(event)}
          value={this.state.user_name} />
          <input type ="text" placeholder = "Artist or Band Name"
            onChange={(event) => this.artistBand(event)}
            value={this.state.artist_band} />
            <input type ="text" placeholder = "Song Title"
              onChange={(event) => this.songTitle(event)}
              value={(this.state.song_title)} />
              <textarea cols="40" rows="6"
                onChange={(event) => this.notes(event)}
                value={this.state.notes} />
                <button name ="favorite"
                  onClick={(event) =>this.favoriteButton(event)}>It's my Favorite</button>
                <button
                  onClick={(event) =>this.submitButton(event)}>Submit </button>
      </div>
);
  }
};
