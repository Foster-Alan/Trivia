import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const { local } = this.props;
    this.setState({
      ranking: [...local],
    });
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(newGame());
    history.push('/');
  };

  renderRanking = (ranking) => ranking.length > 0 && (ranking
    .sort((a, b) => b.score - a.score)
    .map((item, index) => (
      <div key={ index }>
        <img src={ item.url } alt="imagem" />
        <h1 data-testid={ `player-score-${index}` }>{item.score}</h1>
        <h1 data-testid={ `player-name-${index}` }>{item.name}</h1>
      </div>
    )));

  render() {
    const { ranking } = this.state;
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
        { this.renderRanking(ranking) }
      </div>
    );
  }
}
Ranking.propTypes = {
  local: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  local: state.player.local,
});

export default connect(mapStateToProps)(Ranking);
