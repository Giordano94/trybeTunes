import React, { Component } from 'react';
import Loading from './Loading';
import Header from '../ Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
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
    this.setState({ isLoading: true });
    const getSongs = await getFavoriteSongs();
    this.setState({ favoritesSongs: getSongs }, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { favoritesSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {favoritesSongs.map((song) => (
              <div key={ song.trackId }>
                <MusicCard
                  song={ song }
                  updateFavoriteSongs={ this.setFavorites }
                />
              </div>
            ))}
          </div>
        )}
        ;
      </div>
    );
  }
}

export default Favorites;
