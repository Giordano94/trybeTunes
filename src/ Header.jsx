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
    const { name } = await getUser();
    this.setState({
      userName: name,
      isLoading: true,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{`Hello, ${userName}`}</p>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search" />
          <Link to="/favorites" data-testid="link-to-favorites" />
          <Link to="/profile" data-testid="link-to-profile" />
        </nav>
      </header>
    );
  }
}

export default Header;
