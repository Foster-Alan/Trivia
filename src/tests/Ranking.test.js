import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a tela de ranking', () => {
  test('Testando a tela de ranking', async () => {
    global.fetch = jest.fn(async () => ({
        json: async () => questionsResponse
      }));
    const { history } = renderWithRouterAndRedux(<App />,{ player: {
        name: '',
        assertions: 2,
        score: 50,
        gravatarEmail: '',
        local: [
            {
              name: 'aaa',
              score: 40,
              url: 'https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40'
            }, 
            {
                name: 'bbb',
                score: 60,
                url: 'https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40'
              }
          ],
      }}, '/ranking');
    expect(history.location.pathname).toBe('/ranking');

    const yourTurn = screen.getByText(/sua vez/i);
    const rankingEl = await screen.findByTestId('ranking-title');
    const buttonPlayAgainEl = screen.getByTestId('btn-go-home');
    // const playerScore = screen.getByTestId(/player-score/i);
    // const playerName = screen.getByTestId(/player-name/i);
    
    expect(yourTurn).toBeInTheDocument();
    expect(rankingEl).toBeInTheDocument();
    expect(buttonPlayAgainEl).toBeInTheDocument();
    expect(buttonPlayAgainEl).toBeEnabled();
    // expect(playerScore).toBeInTheDocument();
    // expect(playerName).toBeInTheDocument();


    userEvent.click(buttonPlayAgainEl);

    await screen.findByTestId('input-player-name');
    expect(history.location.pathname).toBe('/');

  });
});