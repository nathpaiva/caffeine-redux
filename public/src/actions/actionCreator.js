'use strict';

export function allCapsules(capsules) {
  return { type: 'CAPSULES', capsules };
}

export function showMessage(message) {
  return { type: 'MESSAGE', message };
}
