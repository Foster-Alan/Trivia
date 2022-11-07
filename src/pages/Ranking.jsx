import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions';
import '../Styles/Ranking.css';

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
      <div className="player-ranking" key={ index }>
        <img src={ item.url } alt="imagem" />
        <h1 data-testid={ `player-score-${index}` }>{item.score}</h1>
        <span data-testid={ `player-name-${index}` }>{item.name}</span>
      </div>
    )));

  render() {
    const { ranking } = this.state;
    return (
      <div
        className="ranking"
        data-testid="ranking-title"
      >
        Ranking
        { this.renderRanking(ranking) }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Play Again
          {/* <AiOutlineReload /> */}

        </button>
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
