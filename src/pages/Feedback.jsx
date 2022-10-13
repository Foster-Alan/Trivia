import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineReload } from 'react-icons/ai';
import { connect } from 'react-redux';
import { newGame, save } from '../redux/actions';
import '../Styles/Feedback.css';

class Feedback extends Component {
  state = {
    urlFeedback: '',
    nameFeedback: '',
    scoreFeedback: 0,
  };

  componentDidMount() {
    const { gravatarEmail, name, score, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(save({ name, score, url }));
    localStorage.setItem('ranking', JSON.stringify([{ name, score, url }]));
    this.getFeedback();
  }

  getFeedback = () => {
    const result = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      urlFeedback: result[0].url,
      nameFeedback: result[0].name,
      scoreFeedback: result[0].score,
    });
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(newGame());
    history.push('/');
  };

  seeRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { urlFeedback, nameFeedback, scoreFeedback } = this.state;
    const { assertions, score } = this.props;
    const three = 3;
    let message = '';
    console.log(assertions, 'acertos');
    if (assertions >= three) {
      message = 'Well Done!';
    } if (assertions < three) {
      message = 'Could be better...';
    }

    return (
      <div className="feedback-content">
        <div
          className="feedback"
          data-testid="feedback-text"
        >
          <img data-testid="header-profile-picture" src={ urlFeedback } alt="foto" />
          <h4 data-testid="header-player-name">{ nameFeedback }</h4>
          <h4>Sua pontuação:</h4>
          {/* <h4 data-testid="header-score">{ scoreFeedback }</h4> */}
          <h4 data-testid="feedback-total-score">{ score }</h4>
          <h4>Acertos:</h4>
          <h4 data-testid="feedback-total-question">{ assertions }</h4>
          <h4>{ message }</h4>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
            {/* <AiOutlineReload /> */}

          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.seeRanking }
          >
            Ranking

          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
