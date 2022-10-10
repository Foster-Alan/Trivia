import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        Ranking
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Ranking

        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
