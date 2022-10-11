export const LOGIN = 'LOGIN';
export const ASSERTIONS = 'ASSERTIONS';
export const SCORE = 'SCORE';
export const SAVE = 'SAVE';
export const NEWGAME = 'NEWGAME';

export const login = (payload) => ({ type: LOGIN, payload });

export const assertionValue = (payload) => ({ type: ASSERTIONS, payload });

export const scoreValue = (payload) => ({ type: SCORE, payload });

export const save = (payload) => ({ type: SAVE, payload });

export const newGame = () => ({ type: NEWGAME });
