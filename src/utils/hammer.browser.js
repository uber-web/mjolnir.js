import {enhancePointerEventInput, enhanceMouseInput} from './hammer-overrides';

if (typeof window === 'undefined') {
  // Avoid crash if imported in a web worker
  /* global self */
  self.window = self;
  self.document = {
    createElement: () => ({style: {}})
  };
}
const hammerjs = require('hammerjs');

enhancePointerEventInput(hammerjs.PointerEventInput);
enhanceMouseInput(hammerjs.MouseInput);

export const Manager = hammerjs.Manager;

export default hammerjs;
