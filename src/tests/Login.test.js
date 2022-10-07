import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

describe('Testando a aplicação', () => {
  test('Testando a tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;

    const nameInputEl = screen.getByTestId('input-player-name');
    const emailInputEl = screen.getByTestId('input-gravatar-email');
    const buttonEl = screen.getByTestId('btn-play');
    const buttonEl2 = screen.getByTestId('btn-settings');

    expect(pathname).toBe('/');
    expect(nameInputEl).toBeInTheDocument();
    expect(emailInputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl2).toBeInTheDocument();
    expect(buttonEl).toBeDisabled();

    userEvent.type(nameInputEl, 'name');
    userEvent.type(emailInputEl, 'email@email.com');

    expect(buttonEl).toBeEnabled();
    expect(buttonEl2).toBeEnabled();

    userEvent.click(buttonEl);
    userEvent.click(buttonEl2);
  });
});