'user strict';

import { List } from 'immutable';

export function messageReducer(state = {}, action) {

  if (action.type === 'MESSAGE') {

    return action.message;
  }


  return state;
}
