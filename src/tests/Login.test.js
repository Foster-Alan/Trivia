import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a aplicação', () => {
  test('Testando a tela inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInputEl = screen.getByTestId('input-player-name');
    const emailInputEl = screen.getByTestId('input-gravatar-email');
    const buttonPlayEl = screen.getByTestId('btn-play');
    const buttonConfiEl = screen.getByTestId('btn-settings');

    expect(history.location.pathname).toBe('/');
    expect(nameInputEl).toBeInTheDocument();
    expect(emailInputEl).toBeInTheDocument();
    expect(buttonPlayEl).toBeInTheDocument();
    expect(buttonConfiEl).toBeInTheDocument();
    expect(buttonPlayEl).toBeDisabled();

    userEvent.type(nameInputEl, 'name');
    userEvent.type(emailInputEl, 'email@email.com');

    expect(buttonPlayEl).toBeEnabled();

    userEvent.click(buttonPlayEl);

    await screen.findByTestId('game-title');
    expect(history.location.pathname).toBe('/game');

  });
  test('Testando o botão config', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const buttonConfiEl = screen.getByTestId('btn-settings');

    expect(buttonConfiEl).toBeInTheDocument();

    expect(buttonConfiEl).toBeEnabled();

    userEvent.click(buttonConfiEl);

    await screen.findByTestId('settings-title');

    expect(history.location.pathname).toBe('/config');
  });
});