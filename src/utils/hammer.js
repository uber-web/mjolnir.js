import {isBrowser} from './globals';

let hammerjs;
if (isBrowser) {
  hammerjs = require('hammerjs');
}

// Hammer.Manager mock for use in environments without `document` / `window`.
function HammerManagerMock(m) {
  const instance = {};
  const chainedNoop = () => instance;
  instance.get = () => null;
  instance.set = chainedNoop;
  instance.on = chainedNoop;
  instance.off = chainedNoop;
  instance.destroy = chainedNoop;
  instance.emit = chainedNoop;
  return instance;
}

export const Manager = hammerjs ? hammerjs.Manager : HammerManagerMock;

export default hammerjs;
