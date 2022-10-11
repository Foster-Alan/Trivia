import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';

describe('Testando a tela de game', () => {
  test('Testando a tela de game', async () => {
    global.fetch = jest.fn(async () => ({
        json: async () => questionsResponse
      }));
    const { history } = renderWithRouterAndRedux(<App />,{player: {
        name: '',
        assertions: 2,
        score: 0,
        gravatarEmail: '',
        local: [],
      }}, '/game');
    expect(history.location.pathname).toBe('/game');

    const yourTurn = screen.getByText(/sua vez/i);
    const categoryEl = await screen.findByTestId('question-category');
    const questTextEl = screen.getByTestId('question-text');
    const nameEl = screen.getByTestId('header-player-name');
    const headerEl = screen.getByTestId('header-score');
    const answerOptEl = screen.getByTestId('answer-options');
    const correctEl = screen.getByTestId('correct-answer');
    const wrongEl = screen.getByTestId(/wrong-answer/i);
    
    expect(yourTurn).toBeInTheDocument();
    expect(categoryEl).toBeInTheDocument();
    expect(questTextEl).toBeInTheDocument();
    expect(nameEl).toBeInTheDocument();
    expect(headerEl).toBeInTheDocument();
    expect(answerOptEl).toBeInTheDocument();
    
    expect(correctEl).toBeInTheDocument();
    expect(correctEl).toBeEnabled();
    expect(wrongEl).toBeInTheDocument();
    expect(wrongEl).toBeEnabled();
    
    expect(screen.queryByTestId('btn-next')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('correct-answer'));
    
    const btnNextEl = await screen.findByTestId('btn-next');
    expect(btnNextEl).toBeEnabled();
    // userEvent.click(btnNextEl);

    const firstQuestion = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide/i);
    expect(firstQuestion).toBeInTheDocument();

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    const secondQuestion = await screen.findByText(/In quantum physics, which of these theorised sub-atomic particles has yet to be observed/i);
    expect(secondQuestion).toBeInTheDocument();

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    const thirdQuestion = await screen.findByText(/Generally, which component of a computer draws the most power/i);
    expect(thirdQuestion).toBeInTheDocument();

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    const fourthQuestion = await screen.findByText(/What is the most expensive weapon in Counter-Strike: Global Offensive/i);
    expect(fourthQuestion).toBeInTheDocument();

    userEvent.click(screen.getByTestId('wrong-answer-1'));
    userEvent.click(await screen.findByTestId('btn-next'));
    const fifthQuestion = await screen.findByText(/Who was the Author of the manga Uzumaki/i);
    expect(fifthQuestion).toBeInTheDocument();

    // userEvent.click(screen.getByTestId('correct-answer'));
    // userEvent.click(await screen.findByTestId('btn-next'));
    // await screen.findByTestId('feedback-text');
    // expect(history.location.pathname).toBe('/feedback');
    // await waitFor(() => {
    //     expect(history.location.pathname).toBe('/feedback');
    //   })
  });
  test('Testando o token', async () => {
    global.fetch = jest.fn(async (endpoint) => ({
        json: async () => {
            if (endpoint.includes('https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN')) {
                return {
                    response_code: 3,
                    results: [],
                  }
            }
            return             {
                "response_code": 0,
                "response_message": "Token Generated Successfully!",
                "token": "INVALID_TOKEN"
              }
        }

      }));
    const { history } = renderWithRouterAndRedux(<App />,{ player: {
        name: '',
        assertions: 2,
        score: 0,
        gravatarEmail: '',
        local: [],
      }}, '/');

      const nameInputEl = screen.getByTestId('input-player-name');
      const emailInputEl = screen.getByTestId('input-gravatar-email');
      const buttonPlayEl = screen.getByTestId('btn-play');
  
      userEvent.type(nameInputEl, 'name');
      userEvent.type(emailInputEl, 'email@email.com');  
      userEvent.click(buttonPlayEl);
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN');
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
      })
  });
  
});