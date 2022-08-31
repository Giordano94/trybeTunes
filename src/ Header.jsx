import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      userName: name,
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{`Hello, ${userName}`}</p>

        <nav>
          <Link to="/search" data-testid="link-to-search">
            SEARCH
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            FAVORITES
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            PROFILE
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
