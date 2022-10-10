import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    urlFeedback: '',
    nameFeedback: '',
    scoreFeedback: 0,
  };

  componentDidMount() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
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

  render() {
    const { urlFeedback, nameFeedback, scoreFeedback } = this.state;
    const { assertions, score } = this.props;
    const three = 3;
    let message = '';
    if (assertions >= three) {
      message = 'Well Done!';
    } if (assertions < three) {
      message = 'Could be better...';
    }

    return (
      <div data-testid="feedback-text">
        Feedback
        <img data-testid="header-profile-picture" src={ urlFeedback } alt="foto" />
        <h4 data-testid="header-player-name">{ nameFeedback }</h4>
        <h4 data-testid="header-score">{ scoreFeedback }</h4>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h4 data-testid="feedback-total-question">{ assertions }</h4>
        <h4>{ message }</h4>
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
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
