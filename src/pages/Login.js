import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../helpers/API';

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

  handleClick = async () => {
    const { history } = this.props;
    const token = await fetchAPI();
    localStorage.setItem('token', token);
    history.push('/game');

  handleChangeButton = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/configuracoes');

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
            onClick={ this.handleClick }
          >
            Play

          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleChangeButton }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default connect()(Login);

