import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../ Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      searchButtonDisabled: true,
      singersName: '',
      albums: [],
    };
  }

  handleSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { searchArtist } = this.state;
      const MAX_CHARACTER = 2;
      const buttonIsDisabled = searchArtist.length < MAX_CHARACTER;
      this.setState({ searchButtonDisabled: buttonIsDisabled });
    });
  };

  handleSearchClick = async () => {
    const { searchArtist } = this.state;
    const getAlbums = await searchAlbumsAPI(searchArtist);
    this.setState({
      searchArtist: '',
      singersName: searchArtist,
      albums: getAlbums,
    });
  };

  render() {
    const { searchArtist, searchButtonDisabled, singersName, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form action="">
            <label htmlFor="artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                name="searchArtist"
                value={ searchArtist }
                onChange={ this.handleSearch }
              />
            </label>
            <button
              type="button"
              disabled={ searchButtonDisabled }
              data-testid="search-artist-button"
              onClick={ this.handleSearchClick }
            >
              Pesquisar
            </button>
          </form>
          <div>
            <h2>{`Resultado de álbuns de: ${singersName}`}</h2>
            {albums.length === 0 ? (
              <h3>Nenhum álbum foi encontrado</h3>
            ) : (
              <div>
                {albums.map(
                  ({
                    collectionId,
                    collectionName,
                    artworkUrl100,
                    artistName,
                  }) => (
                    <div key={ collectionId }>
                      <Link
                        to={ `album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <img src={ artworkUrl100 } alt={ collectionName } />
                      </Link>
                      <h3>{collectionName}</h3>
                      <h4>{artistName}</h4>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
