import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../helpers/API';
import { login } from '../redux/actions';

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
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    const resultApi = await fetchAPI();
    localStorage.setItem('token', resultApi);
    dispatch(login({ name, email }));
    history.push('/game');
  };

  handleChangeButton = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { isDisabled, email, name } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ this.handleChange }
            value={ name }
          />
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            value={ isDisabled }
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
