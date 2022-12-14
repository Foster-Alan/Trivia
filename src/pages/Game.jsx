import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BiTime } from 'react-icons/bi';

import Header from '../components/Header';
import TriviaApi from '../helpers/TriviaApi';
import { assertionValue, scoreValue } from '../redux/actions';
import multiplyFunc from '../helpers/multiply';
import '../Styles/Game.css';

const order = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

class Game extends Component {
  state = {
    trivia: [],
    indice: 0,
    clicked: false,
    isDisabled: false,
    timer: 30,
    assertions: 0,
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
      console.log('entrou no else, token invalido');
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
    this.intervalue = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 }, () => {
        const { timer: timer1 } = this.state;
        if (timer1 <= 0) {
          this.setState({
            isDisabled: true,
          }, () => clearInterval(this.intervalue));
        }
      });
    }, num);
  };

  showAnswer = (item) => {
    this.setState({ clicked: true });
    const { trivia, timer } = this.state;
    // console.log(item, trivia, 'item');
    let dificultyValue = 0;
    if (typeof item !== 'undefined') {
      this.setState((state) => ({ assertions: state.assertions + 1 }));
      dificultyValue = multiplyFunc(trivia, item, timer);
    }
    const { dispatch } = this.props;
    dispatch(scoreValue(dificultyValue));
    this.setState({
      isDisabled: true,
    });
    clearInterval(this.intervalue);
  };

  nextButton = () => {
    const { indice } = this.state;
    const numberOfQuestions = 4;
    const control = indice < numberOfQuestions ? indice + 1 : indice;
    this.setState({
      timer: 30,
      isDisabled: false,
      clicked: false,
      indice: control }, () => { this.contTimer(); });
    if (indice >= numberOfQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  handleButton = () => {
    const { isDisabled } = this.state;
    if (isDisabled) {
      return (
        <button
          className="css-button-arrow--black"
          type="button"
          data-testid="btn-next"
          onClick={ this.nextButton }
        >
          Next

        </button>);
    }
  };

  renderQuestion = (indice, trivia) => {
    const { clicked, isDisabled } = this.state;
    const num = 0.5;
    const result = [trivia[indice].correct_answer, ...trivia[indice].incorrect_answers]
      .sort(() => order[indice] - num);

    return (
      <div className="content-question-game">
        <div className="quest-game">
          <h3 data-testid="question-category">{trivia[indice].category}</h3>
          <h3 data-testid="question-text">{trivia[indice].question}</h3>
        </div>
        <div data-testid="answer-options" className="answer-options">
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
      <>
        <Header />
        <div data-testid="game-title" className="geral-page-game">
          <div className="content-page-game">
            <h1 className="timer">
              <BiTime />
              {' '}
              {timer}

            </h1>
            {result}
            {this.handleButton()}
          </div>
        </div>
      </>
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
