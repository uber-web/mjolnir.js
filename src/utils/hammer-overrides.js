/**
 * This file contains overrides the default
 * hammer.js functions to add our own utility
 */

/**
 * Helper function that returns true if any element in an array meets given criteria.
 * Because older browsers do not support `Array.prototype.some`
 * @params array {Array}
 * @params predict {Function}
 */
function inArray(array, predict) {
  for (let i = 0; i < array.length; i++) {
    if (predict(array[i])) {
      return true;
    }
  }
  return false;
}

/* eslint-disable no-invalid-this */
// overrides PointerEventInput.handler to accept right mouse button
export function enhancePointerEventHandler(oldHandler) {

  return function handler(ev) {
    const store = this.store;

    // Allow non-left mouse buttons through
    if (ev.button > 0) {
      if (!inArray(store, e => e.pointerId === ev.pointerId)) {
        store.push(ev);
      }
    }

    oldHandler.call(this, ev);
  };
}
