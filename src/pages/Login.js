import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyButton());
  };

  verifyButton = () => {
    const { email, name } = this.state;
    const number = 1;
    const verifyEmail = email.length >= number;
    const verifyName = name.length >= number;
    this.setState({ isDisabled: !(verifyEmail && verifyName) });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
