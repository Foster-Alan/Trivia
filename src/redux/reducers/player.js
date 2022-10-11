import { LOGIN, ASSERTIONS, SCORE, NEWGAME, SAVE } from '../actions';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  local: [],
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };

  case ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };

  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };

  case SAVE:
    return {
      ...state,
      local: [...state.local, action.payload],
    };

  case NEWGAME:
    return {
      ...state,
      score: 0,
    };

  default:
    return state;
  }
};

export default player;
