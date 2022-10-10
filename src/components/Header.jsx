import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      url,
    });
  }

  render() {
    const { url } = this.state;
    const { name, score } = this.props;
    console.log(name);
    return (
      <header>
        <img src={ url } alt="Gravatar" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
