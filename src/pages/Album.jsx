import React, { Component } from 'react';
import Header from '../ Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}

export default Album;
