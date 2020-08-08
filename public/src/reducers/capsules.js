'use strict';

import { List } from 'immutable';

export function capsulesReducer(state = new List(), action) {

  if (action.type === 'CAPSULES') {

    return new List(action.capsules);
  }


  return state;
}
