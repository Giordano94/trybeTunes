import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const { name } = await getUser();
    this.setState({
      userName: name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (
          <h3 data-testid="header-user-name">{`Hello, ${userName}`}</h3>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search">
            <span> SEARCH</span>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <span>FAVORITES</span>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <span>PROFILE</span>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
