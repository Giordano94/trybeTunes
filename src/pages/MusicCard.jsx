import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.setFavorites();
  }

  setFavorites = async () => {
    const getSongs = await getFavoriteSongs();
    this.setState({ favoritesSongs: getSongs });
  };

  handleFavoriteSong = () => {
    const { song } = this.props;
    this.setState({ isLoading: true }, async () => {
      await addSong(song);
      await this.setFavorites();
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { song } = this.props;
    const { isLoading, favoritesSongs } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h4>{song.trackName}</h4>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="inputFavorite" id="inputFavorite">
              Favorita
              <input
                type="checkbox"
                name="favoriteIsChecked"
                data-testid={ `checkbox-music-${song.trackId}` }
                checked={ favoritesSongs.some((music) => music.trackId === song.trackId) }
                onChange={ this.handleFavoriteSong }
              />
            </label>
          </div>
        )}
      </section>
    );
  }
}
MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
export default MusicCard;
