import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TriviaApi from '../helpers/TriviaApi';
import { assertionValue, scoreValue } from '../redux/actions';

const order = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

class Game extends Component {
  state = {
    trivia: [],
    indice: 0,
    clicked: false,
    isDisabled: false,
    timer: 30,
    assertions: 0,
    // score: 0,
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
      // console.log(timer);
      if (timer <= 0) {
        this.setState({
          isDisabled: true,
        }, () => clearInterval(intervalue));
      }
    }, num);
  };

  showAnswer = (item) => {
    this.setState({ clicked: true });
    const multiplic = 10;
    const numberHard = 3;
    const numberEasy = 1;
    const numberMedium = 2;
    let dificultyValue = 0;
    const { trivia, timer } = this.state;
    if (typeof item !== 'undefined') {
      this.setState((state) => ({ assertions: state.assertions + 1 }));
      const dificulty = trivia[item].difficulty;
      if (dificulty === 'hard') {
        dificultyValue = multiplic + (timer * numberHard);
      } else if (dificulty === 'medium') {
        dificultyValue = multiplic + (timer * numberMedium);
      } else {
        dificultyValue = multiplic + (timer * numberEasy);
      }
    }
    const { dispatch } = this.props;
    dispatch(scoreValue(dificultyValue));
    this.setState({
      timer: 0,
    });
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
                  onClick={ () => this.showAnswer(indice) }
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
                  onClick={ () => this.showAnswer() }
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
    const { trivia, indice, timer, assertions } = this.state;
    const { dispatch } = this.props;
    dispatch(assertionValue(assertions));
    let result = [];
    if (trivia.length > 0) {
      result = this.renderQuestion(indice, trivia);
    } else {
      result = [];
    }
    return (
      <div data-testid="game-title">
        <h1>{timer}</h1>
        <Header />
        {result}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
