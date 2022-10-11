import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a tela de feedback', () => {
  test('Testando a tela de feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {player: {
        name: '',
        assertions: 4,
        score: 0,
        gravatarEmail: '',
        local: [],
      }}, '/feedback');
    expect(history.location.pathname).toBe('/feedback');

    const yourTurn = screen.getByText(/sua vez/i);
    const photoEl = screen.getByTestId('header-profile-picture');
    const nameEl = screen.getByTestId('header-player-name');
    const headerEl = screen.getByTestId('header-score');
    const scoreEl = screen.getByTestId('feedback-total-score');
    const assertionsEl = screen.getByTestId('feedback-total-question');
    const buttonPlayAgainEl = screen.getByRole('button', {
        name: /play again/i
      });
    
    expect(yourTurn).toBeInTheDocument();
    expect(photoEl).toBeInTheDocument();
    expect(nameEl).toBeInTheDocument();
    expect(headerEl).toBeInTheDocument();
    expect(scoreEl).toBeInTheDocument();
    expect(assertionsEl).toBeInTheDocument();
    expect(buttonPlayAgainEl).toBeInTheDocument();
    expect(buttonPlayAgainEl).toBeEnabled();

    await screen.findByText('Well Done!');
    expect(screen.getByText('Well Done!')).toBeInTheDocument();

    userEvent.click(buttonPlayAgainEl);

    await screen.findByTestId('input-player-name');
    expect(history.location.pathname).toBe('/');


  });
  test('Testando o botão ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {player: {
        name: '',
        assertions: 2,
        score: 0,
        gravatarEmail: '',
        local: [],
      }}, '/feedback');
    
    const buttonRankingEl = screen.getByRole('button', {
        name: /ranking/i
      });
    
    expect(buttonRankingEl).toBeInTheDocument();
    expect(buttonRankingEl).toBeEnabled();

    await screen.findByText('Could be better...');
    expect(screen.getByText('Could be better...')).toBeInTheDocument();

    userEvent.click(buttonRankingEl);

    await screen.findByTestId('ranking-title');

    expect(history.location.pathname).toBe('/ranking');
  });
});