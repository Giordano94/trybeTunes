import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../ Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listSongs: [],
      albumName: '',
      singerName: '',
      imageAlbum: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.getSongsAlbum();
    this.setState({ isLoading: false });
  }

  getSongsAlbum = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const responseAPI = await getMusics(id);
    console.log(responseAPI);
    const songsAPI = responseAPI.filter((song) => song.wrapperType === 'track');
    console.log(songsAPI);
    this.setState({
      albumName: responseAPI[0].collectionName,
      singerName: responseAPI[0].artistName,
      imageAlbum: responseAPI[0].artworkUrl100,
      listSongs: songsAPI,
    });
  };

  render() {
    const { listSongs, albumName, singerName, imageAlbum, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <img src={ imageAlbum } alt={ albumName } />
            <h3 data-testid="album-name">{albumName}</h3>
            <h4 data-testid="artist-name">{singerName}</h4>
            <div>
              {listSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  collectionName={ song.collectionName }
                  musicPreview={ song }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
