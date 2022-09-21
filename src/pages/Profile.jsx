import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from '../ Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.setUsers();
  }

  setUsers = async () => {
    this.setState({ isLoading: true });
    const getUserData = await getUser();
    this.setState({ userData: getUserData }, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { userData, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <Link to="/profile/edit">Editar perfil</Link>
            <img
              data-testid="profile-image"
              src={ userData.image }
              alt={ userData.name }
            />
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p>{userData.description}</p>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
