import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      loginName: '',
      isLoading: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { loginName } = this.state;
      const MAX_CHARACTER = 3;
      const buttonIsDisabled = loginName.length < MAX_CHARACTER;
      this.setState({ isButtonDisabled: buttonIsDisabled });
    });
  };

  handleClick = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: loginName });
    history.push('./search');
  };

  render() {
    const { isLoading, loginName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h1>Login</h1>
            <form action="">
              <div>
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    name="loginName"
                    value={ loginName }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  disabled={ isButtonDisabled }
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
