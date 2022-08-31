import React, { Component } from 'react';
import Header from '../ Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      searchButtonDisabled: true,
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

  render() {
    const { searchArtist, searchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
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
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
