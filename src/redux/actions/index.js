export const LOGIN = 'LOGIN';
export const ASSERTIONS = 'ASSERTIONS';
export const SCORE = 'SCORE';

export const login = (payload) => ({ type: LOGIN, payload });

export const assertionValue = (payload) => ({ type: ASSERTIONS, payload });

export const scoreValue = (payload) => ({ type: SCORE, payload });
