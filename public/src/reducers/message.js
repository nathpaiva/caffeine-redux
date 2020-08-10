'use strict';

export function messageReducer(state = {}, action) {
  if (action.type === 'MESSAGE') {
    return action.message;
  }

  return state;
}
