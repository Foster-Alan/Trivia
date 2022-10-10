import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TriviaApi from '../helpers/TriviaApi';

const order = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

export default class Game extends Component {
  state = {
    trivia: [],
    indice: 0,
    clicked: false,
    isDisabled: false,
    timer: 30,
  };

  async componentDidMount() {
    const response = await TriviaApi();
    if (response.response_code === 0) {
      this.setState({
        trivia: response.results,
      }, () => {
        this.contTimer();
      });
    } else {
      this.setState({
        trivia: [],
      }, () => {
        const { history } = this.props;
        history.push('/');
      });
    }
  }

  contTimer = () => {
    const num = 1000;
    const intervalue = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      console.log(timer);
      if (timer < 0) {
        this.setState({
          isDisabled: true,
        }, () => clearInterval(intervalue));
      }
    }, num);
  };

  showAnswer = () => {
    this.setState({ clicked: true });
  };

  renderQuestion = (indice, trivia) => {
    const { clicked, isDisabled } = this.state;
    const num = 0.5;
    const result = [trivia[indice].correct_answer, ...trivia[indice].incorrect_answers]
      .sort(() => order[indice] - num);
    return (
      <div>
        <h3 data-testid="question-category">{trivia[indice].category}</h3>
        <h3 data-testid="question-text">{trivia[indice].question}</h3>
        <div data-testid="answer-options">
          {result.map((item, index) => (
            item === trivia[indice].correct_answer
              ? (
                <button
                  type="button"
                  data-testid="correct-answer"
                  disabled={ isDisabled }
                  name="correct"
                  className={ clicked ? 'correct' : 'button' }
                  onClick={ this.showAnswer }
                >
                  {item}
                </button>
              )
              : (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  disabled={ isDisabled }
                  name="incorrect"
                  className={ clicked ? 'incorrect' : 'button' }
                  onClick={ this.showAnswer }
                >
                  {item}
                </button>
              )
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { trivia, indice } = this.state;
    let result = [];
    if (trivia.length > 0) {
      result = this.renderQuestion(indice, trivia);
    } else {
      result = [];
    }
    return (
      <div data-testid="game-title">
        <Header />
        {result}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
