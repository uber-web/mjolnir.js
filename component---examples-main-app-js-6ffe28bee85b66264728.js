(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(19);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);
var inheritsLoose_default = /*#__PURE__*/__webpack_require__.n(inheritsLoose);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__(198);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.to-string.js
var es6_object_to_string = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.map.js
var es6_map = __webpack_require__(197);

// CONCATENATED MODULE: ../src/utils/hammer.js
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// This is replaced with hammer.browser.js when bundled in a browser environment
// See `browser` field in package.json
/* harmony default export */ var hammer = (null);
// CONCATENATED MODULE: ../src/utils/hammer-manager-mock.js
// Hammer.Manager mock for use in environments without `document` / `window`.
function HammerManagerMock(m) {
  var instance = {};

  var chainedNoop = function chainedNoop() {
    return instance;
  };

  instance.get = function () {
    return null;
  };

  instance.set = chainedNoop;
  instance.on = chainedNoop;
  instance.off = chainedNoop;
  instance.destroy = chainedNoop;
  instance.emit = chainedNoop;
  return instance;
}
// CONCATENATED MODULE: ../src/constants.js
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
 // This module contains constants that must be conditionally required
// due to `window`/`document` references downstream.

var RECOGNIZERS = hammer ? [[hammer.Rotate, {
  enable: false
}], [hammer.Pinch, {
  enable: false
}], [hammer.Swipe, {
  enable: false
}], [hammer.Pan, {
  threshold: 0,
  enable: false
}], [hammer.Press, {
  enable: false
}], [hammer.Tap, {
  event: 'doubletap',
  taps: 2,
  enable: false
}], // TODO - rename to 'tap' and 'singletap' in the next major release
[hammer.Tap, {
  event: 'anytap',
  enable: false
}], [hammer.Tap, {
  enable: false
}]] : null; // Recognize the following gestures even if a given recognizer succeeds

var RECOGNIZER_COMPATIBLE_MAP = {
  rotate: ['pinch'],
  pan: ['press', 'doubletap', 'anytap', 'tap'],
  doubletap: ['anytap'],
  anytap: ['tap']
}; // Recognize the folling gestures only if a given recognizer fails

var RECOGNIZER_FALLBACK_MAP = {
  doubletap: ['tap']
};
/**
 * Only one set of basic input events will be fired by Hammer.js:
 * either pointer, touch, or mouse, depending on system support.
 * In order to enable an application to be agnostic of system support,
 * alias basic input events into "classes" of events: down, move, and up.
 * See `_onBasicInput()` for usage of these aliases.
 */

var BASIC_EVENT_ALIASES = {
  pointerdown: 'pointerdown',
  pointermove: 'pointermove',
  pointerup: 'pointerup',
  touchstart: 'pointerdown',
  touchmove: 'pointermove',
  touchend: 'pointerup',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup'
};
var INPUT_EVENT_TYPES = {
  KEY_EVENTS: ['keydown', 'keyup'],
  MOUSE_EVENTS: ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'mouseleave'],
  WHEEL_EVENTS: [// Chrome, Safari
  'wheel', // IE
  'mousewheel', // legacy Firefox
  'DOMMouseScroll']
};
/**
 * "Gestural" events are those that have semantic meaning beyond the basic input event,
 * e.g. a click or tap is a sequence of `down` and `up` events with no `move` event in between.
 * Hammer.js handles these with its Recognizer system;
 * this block maps event names to the Recognizers required to detect the events.
 */

var EVENT_RECOGNIZER_MAP = {
  tap: 'tap',
  anytap: 'anytap',
  doubletap: 'doubletap',
  press: 'press',
  pinch: 'pinch',
  pinchin: 'pinch',
  pinchout: 'pinch',
  pinchstart: 'pinch',
  pinchmove: 'pinch',
  pinchend: 'pinch',
  pinchcancel: 'pinch',
  rotate: 'rotate',
  rotatestart: 'rotate',
  rotatemove: 'rotate',
  rotateend: 'rotate',
  rotatecancel: 'rotate',
  pan: 'pan',
  panstart: 'pan',
  panmove: 'pan',
  panup: 'pan',
  pandown: 'pan',
  panleft: 'pan',
  panright: 'pan',
  panend: 'pan',
  pancancel: 'pan',
  swipe: 'swipe',
  swipeleft: 'swipe',
  swiperight: 'swipe',
  swipeup: 'swipe',
  swipedown: 'swipe'
};
/**
 * Map gestural events typically provided by browsers
 * that are not reported in 'hammer.input' events
 * to corresponding Hammer.js gestures.
 */

var GESTURE_EVENT_ALIASES = {
  click: 'tap',
  anyclick: 'anytap',
  dblclick: 'doubletap',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup',
  mouseover: 'pointerover',
  mouseout: 'pointerout',
  mouseleave: 'pointerleave'
};
// EXTERNAL MODULE: ../src/utils/globals.js
var globals = __webpack_require__(207);

// CONCATENATED MODULE: ../src/inputs/wheel-input.js

 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



var firefox = globals["b" /* userAgent */].indexOf('firefox') !== -1;
var WHEEL_EVENTS = INPUT_EVENT_TYPES.WHEEL_EVENTS;
var EVENT_TYPE = 'wheel'; // Constants for normalizing input delta

var WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
var WHEEL_DELTA_PER_LINE = 40; // Slow down zoom if shift key is held for more precise zooming

var SHIFT_MULTIPLIER = 0.25;

var wheel_input_WheelInput =
/*#__PURE__*/
function () {
  function WheelInput(element, callback, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.events = WHEEL_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent, globals["a" /* passiveSupported */] ? {
        passive: false
      } : false);
    });
  }

  var _proto = WheelInput.prototype;

  _proto.destroy = function destroy() {
    var _this2 = this;

    this.events.forEach(function (event) {
      return _this2.element.removeEventListener(event, _this2.handleEvent);
    });
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  ;

  _proto.enableEventType = function enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE) {
      this.options.enable = enabled;
    }
  }
  /* eslint-disable complexity, max-statements */
  ;

  _proto.handleEvent = function handleEvent(event) {
    if (!this.options.enable) {
      return;
    }

    var value = event.deltaY;

    if (globals["c" /* window */].WheelEvent) {
      // Firefox doubles the values on retina screens...
      if (firefox && event.deltaMode === globals["c" /* window */].WheelEvent.DOM_DELTA_PIXEL) {
        value /= globals["c" /* window */].devicePixelRatio;
      }

      if (event.deltaMode === globals["c" /* window */].WheelEvent.DOM_DELTA_LINE) {
        value *= WHEEL_DELTA_PER_LINE;
      }
    }

    var wheelPosition = {
      x: event.clientX,
      y: event.clientY
    };

    if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
      // This one is definitely a mouse wheel event.
      // Normalize this value to match trackpad.
      value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
    }

    if (event.shiftKey && value) {
      value = value * SHIFT_MULTIPLIER;
    }

    this._onWheel(event, -value, wheelPosition);
  };

  _proto._onWheel = function _onWheel(srcEvent, delta, position) {
    this.callback({
      type: EVENT_TYPE,
      center: position,
      delta: delta,
      srcEvent: srcEvent,
      pointerType: 'mouse',
      target: srcEvent.target
    });
  };

  return WheelInput;
}();


// CONCATENATED MODULE: ../src/inputs/move-input.js

 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


var MOUSE_EVENTS = INPUT_EVENT_TYPES.MOUSE_EVENTS;
var MOVE_EVENT_TYPE = 'pointermove';
var OVER_EVENT_TYPE = 'pointerover';
var OUT_EVENT_TYPE = 'pointerout';
var LEAVE_EVENT_TYPE = 'pointerleave';
/**
 * Hammer.js swallows 'move' events (for pointer/touch/mouse)
 * when the pointer is not down. This class sets up a handler
 * specifically for these events to work around this limitation.
 * Note that this could be extended to more intelligently handle
 * move events across input types, e.g. storing multiple simultaneous
 * pointer/touch events, calculating speed/direction, etc.
 */

var MoveInput =
/*#__PURE__*/
function () {
  function MoveInput(element, callback, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.element = element;
    this.callback = callback;
    this.pressed = false;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableMoveEvent = this.options.enable;
    this.enableLeaveEvent = this.options.enable;
    this.enableOutEvent = this.options.enable;
    this.enableOverEvent = this.options.enable;
    this.events = MOUSE_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent);
    });
  }

  var _proto = MoveInput.prototype;

  _proto.destroy = function destroy() {
    var _this2 = this;

    this.events.forEach(function (event) {
      return _this2.element.removeEventListener(event, _this2.handleEvent);
    });
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  ;

  _proto.enableEventType = function enableEventType(eventType, enabled) {
    if (eventType === MOVE_EVENT_TYPE) {
      this.enableMoveEvent = enabled;
    }

    if (eventType === OVER_EVENT_TYPE) {
      this.enableOverEvent = enabled;
    }

    if (eventType === OUT_EVENT_TYPE) {
      this.enableOutEvent = enabled;
    }

    if (eventType === LEAVE_EVENT_TYPE) {
      this.enableLeaveEvent = enabled;
    }
  };

  _proto.handleEvent = function handleEvent(event) {
    this.handleOverEvent(event);
    this.handleOutEvent(event);
    this.handleLeaveEvent(event);
    this.handleMoveEvent(event);
  };

  _proto.handleOverEvent = function handleOverEvent(event) {
    if (this.enableOverEvent) {
      if (event.type === 'mouseover') {
        this.callback({
          type: OVER_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  };

  _proto.handleOutEvent = function handleOutEvent(event) {
    if (this.enableOutEvent) {
      if (event.type === 'mouseout') {
        this.callback({
          type: OUT_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  };

  _proto.handleLeaveEvent = function handleLeaveEvent(event) {
    if (this.enableLeaveEvent) {
      if (event.type === 'mouseleave') {
        this.callback({
          type: LEAVE_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  };

  _proto.handleMoveEvent = function handleMoveEvent(event) {
    if (this.enableMoveEvent) {
      switch (event.type) {
        case 'mousedown':
          if (event.button >= 0) {
            // Button is down
            this.pressed = true;
          }

          break;

        case 'mousemove':
          // Move events use `which` to track the button being pressed
          if (event.which === 0) {
            // Button is not down
            this.pressed = false;
          }

          if (!this.pressed) {
            // Drag events are emitted by hammer already
            // we just need to emit the move event on hover
            this.callback({
              type: MOVE_EVENT_TYPE,
              srcEvent: event,
              pointerType: 'mouse',
              target: event.target
            });
          }

          break;

        case 'mouseup':
          this.pressed = false;
          break;

        default:
      }
    }
  };

  return MoveInput;
}();


// CONCATENATED MODULE: ../src/inputs/key-input.js

 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


var KEY_EVENTS = INPUT_EVENT_TYPES.KEY_EVENTS;
var DOWN_EVENT_TYPE = 'keydown';
var UP_EVENT_TYPE = 'keyup';

var KeyInput =
/*#__PURE__*/
function () {
  function KeyInput(element, callback, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    this.events = KEY_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    element.tabIndex = 1;
    element.style.outline = 'none';
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent);
    });
  }

  var _proto = KeyInput.prototype;

  _proto.destroy = function destroy() {
    var _this2 = this;

    this.events.forEach(function (event) {
      return _this2.element.removeEventListener(event, _this2.handleEvent);
    });
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  ;

  _proto.enableEventType = function enableEventType(eventType, enabled) {
    if (eventType === DOWN_EVENT_TYPE) {
      this.enableDownEvent = enabled;
    }

    if (eventType === UP_EVENT_TYPE) {
      this.enableUpEvent = enabled;
    }
  };

  _proto.handleEvent = function handleEvent(event) {
    // Ignore if focused on text input
    var targetElement = event.target || event.srcElement;

    if (targetElement.tagName === 'INPUT' && targetElement.type === 'text' || targetElement.tagName === 'TEXTAREA') {
      return;
    }

    if (this.enableDownEvent && event.type === 'keydown') {
      this.callback({
        type: DOWN_EVENT_TYPE,
        srcEvent: event,
        key: event.key,
        target: event.target
      });
    }

    if (this.enableUpEvent && event.type === 'keyup') {
      this.callback({
        type: UP_EVENT_TYPE,
        srcEvent: event,
        key: event.key,
        target: event.target
      });
    }
  };

  return KeyInput;
}();


// CONCATENATED MODULE: ../src/inputs/contextmenu-input.js

 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var contextmenu_input_EVENT_TYPE = 'contextmenu';

var ContextmenuInput =
/*#__PURE__*/
function () {
  function ContextmenuInput(element, callback, options) {
    if (options === void 0) {
      options = {};
    }

    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.handleEvent = this.handleEvent.bind(this);
    element.addEventListener('contextmenu', this.handleEvent);
  }

  var _proto = ContextmenuInput.prototype;

  _proto.destroy = function destroy() {
    this.element.removeEventListener('contextmenu', this.handleEvent);
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  ;

  _proto.enableEventType = function enableEventType(eventType, enabled) {
    if (eventType === contextmenu_input_EVENT_TYPE) {
      this.options.enable = enabled;
    }
  };

  _proto.handleEvent = function handleEvent(event) {
    if (!this.options.enable) {
      return;
    }

    this.callback({
      type: contextmenu_input_EVENT_TYPE,
      center: {
        x: event.clientX,
        y: event.clientY
      },
      srcEvent: event,
      pointerType: 'mouse',
      target: event.target
    });
  };

  return ContextmenuInput;
}();


// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js
var es6_number_is_finite = __webpack_require__(202);

// CONCATENATED MODULE: ../src/utils/event-utils.js




/* Constants */

var DOWN_EVENT = 1;
var MOVE_EVENT = 2;
var UP_EVENT = 4;
var event_utils_MOUSE_EVENTS = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
}; // MouseEvent.which https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which

var MOUSE_EVENT_WHICH_LEFT = 1;
var MOUSE_EVENT_WHICH_MIDDLE = 2;
var MOUSE_EVENT_WHICH_RIGHT = 3; // MouseEvent.button https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button

var MOUSE_EVENT_BUTTON_LEFT = 0;
var MOUSE_EVENT_BUTTON_MIDDLE = 1;
var MOUSE_EVENT_BUTTON_RIGHT = 2; // MouseEvent.buttons https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons

var MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
var MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
var MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;
/**
 * Extract the involved mouse button
 */

function whichButtons(event) {
  var eventType = event_utils_MOUSE_EVENTS[event.srcEvent.type];

  if (!eventType) {
    // Not a mouse evet
    return null;
  }

  var _event$srcEvent = event.srcEvent,
      buttons = _event$srcEvent.buttons,
      button = _event$srcEvent.button,
      which = _event$srcEvent.which;
  var leftButton = false;
  var middleButton = false;
  var rightButton = false;

  if ( // button is up, need to find out which one was pressed before
  eventType === UP_EVENT || // moving but does not support `buttons` API
  eventType === MOVE_EVENT && !Number.isFinite(buttons)) {
    leftButton = which === MOUSE_EVENT_WHICH_LEFT;
    middleButton = which === MOUSE_EVENT_WHICH_MIDDLE;
    rightButton = which === MOUSE_EVENT_WHICH_RIGHT;
  } else if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else if (eventType === DOWN_EVENT) {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }

  return {
    leftButton: leftButton,
    middleButton: middleButton,
    rightButton: rightButton
  };
}
/**
 * Calculate event position relative to the root element
 */

function getOffsetPosition(event, rootElement) {
  var srcEvent = event.srcEvent; // `center` is a hammer.js event property

  if (!event.center && !Number.isFinite(srcEvent.clientX)) {
    // Not a gestural event
    return null;
  }

  var center = event.center || {
    x: srcEvent.clientX,
    y: srcEvent.clientY
  };
  var rect = rootElement.getBoundingClientRect(); // Fix scale for map affected by a CSS transform.
  // See https://stackoverflow.com/a/26893663/3528533

  var scaleX = rect.width / rootElement.offsetWidth;
  var scaleY = rect.height / rootElement.offsetHeight; // Calculate center relative to the root element

  var offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return {
    center: center,
    offsetCenter: offsetCenter
  };
}
// CONCATENATED MODULE: ../src/utils/event-registrar.js














var event_registrar_EventRegistrar =
/*#__PURE__*/
function () {
  function EventRegistrar(eventManager) {
    this.eventManager = eventManager;
    this.handlers = []; // Element -> handler map

    this.handlersByElement = new Map();
    this.handleEvent = this.handleEvent.bind(this);
  }

  var _proto = EventRegistrar.prototype;

  _proto.isEmpty = function isEmpty() {
    return this.handlers.length === 0;
  };

  _proto.add = function add(type, handler, srcElement) {
    if (srcElement === void 0) {
      srcElement = 'root';
    }

    var handlers = this.handlers,
        handlersByElement = this.handlersByElement;

    if (!handlersByElement.has(srcElement)) {
      handlersByElement.set(srcElement, []);
    }

    var entry = {
      type: type,
      handler: handler,
      srcElement: srcElement
    };
    handlers.push(entry);
    handlersByElement.get(srcElement).push(entry);
  };

  _proto.remove = function remove(type, handler) {
    var handlers = this.handlers,
        handlersByElement = this.handlersByElement;

    for (var i = handlers.length - 1; i >= 0; i--) {
      var entry = handlers[i];

      if (entry.type === type && entry.handler === handler) {
        handlers.splice(i, 1);
        var entries = handlersByElement.get(entry.srcElement);
        entries.splice(entries.indexOf(entry), 1);

        if (entries.length === 0) {
          handlersByElement.delete(entry.srcElement);
        }
      }
    }
  }
  /**
   * Handles hammerjs event
   */
  ;

  _proto.handleEvent = function handleEvent(event) {
    if (this.isEmpty()) {
      return;
    }

    var mjolnirEvent = this._normalizeEvent(event);

    var target = event.srcEvent.target;

    while (target && target !== mjolnirEvent.rootElement) {
      this._emit(mjolnirEvent, target);

      if (mjolnirEvent.handled) {
        return;
      }

      target = target.parentNode;
    }

    this._emit(mjolnirEvent, 'root');
  }
  /**
   * Invoke handlers on a particular element
   */
  ;

  _proto._emit = function _emit(event, srcElement) {
    var entries = this.handlersByElement.get(srcElement);

    if (entries) {
      var immediatePropagationStopped = false; // Prevents the current event from bubbling up

      var stopPropagation = function stopPropagation() {
        event.handled = true;
      }; // Prevent any remaining listeners from being called


      var stopImmediatePropagation = function stopImmediatePropagation() {
        event.handled = true;
        immediatePropagationStopped = true;
      };

      for (var i = 0; i < entries.length; i++) {
        var _entries$i = entries[i],
            type = _entries$i.type,
            handler = _entries$i.handler;
        handler(Object.assign({}, event, {
          type: type,
          stopPropagation: stopPropagation,
          stopImmediatePropagation: stopImmediatePropagation
        }));

        if (immediatePropagationStopped) {
          break;
        }
      }
    }
  }
  /**
   * Normalizes hammerjs and custom events to have predictable fields.
   */
  ;

  _proto._normalizeEvent = function _normalizeEvent(event) {
    var rootElement = this.eventManager.element;
    return Object.assign({}, event, whichButtons(event), getOffsetPosition(event, rootElement), {
      handled: false,
      rootElement: rootElement
    });
  };

  return EventRegistrar;
}();


// CONCATENATED MODULE: ../src/event-manager.js



















 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.









var DEFAULT_OPTIONS = {
  // event handlers
  events: null,
  // custom recognizers
  recognizers: null,
  recognizerOptions: {},
  // Manager class
  Manager: hammer ? hammer.Manager : HammerManagerMock,
  // allow browser default touch action
  // https://github.com/uber/react-map-gl/issues/506
  touchAction: 'none'
}; // Unified API for subscribing to events about both
// basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
// and gestural input (e.g. 'click', 'tap', 'panstart').
// Delegates gesture related event registration and handling to Hammer.js.

var event_manager_EventManager =
/*#__PURE__*/
function () {
  function EventManager(element, options) {
    if (element === void 0) {
      element = null;
    }

    if (options === void 0) {
      options = {};
    }

    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.events = new Map();
    this._onBasicInput = this._onBasicInput.bind(this);
    this._onOtherEvent = this._onOtherEvent.bind(this);
    this.setElement(element); // Register all passed events.

    var _options = options,
        events = _options.events;

    if (events) {
      this.on(events);
    }
  }

  var _proto = EventManager.prototype;

  _proto.setElement = function setElement(element) {
    var _this = this;

    if (this.element) {
      // unregister all events
      this.destroy();
    }

    this.element = element;

    if (!element) {
      return;
    }

    var options = this.options;
    var ManagerClass = options.Manager;
    this.manager = new ManagerClass(element, {
      touchAction: options.touchAction,
      recognizers: options.recognizers || RECOGNIZERS
    }).on('hammer.input', this._onBasicInput);

    if (!options.recognizers) {
      // Set default recognize withs
      // http://hammerjs.github.io/recognize-with/
      Object.keys(RECOGNIZER_COMPATIBLE_MAP).forEach(function (name) {
        var recognizer = _this.manager.get(name);

        if (recognizer) {
          RECOGNIZER_COMPATIBLE_MAP[name].forEach(function (otherName) {
            recognizer.recognizeWith(otherName);
          });
        }
      });
    } // Set recognizer options


    for (var recognizerName in options.recognizerOptions) {
      var recognizer = this.manager.get(recognizerName);

      if (recognizer) {
        var recognizerOption = options.recognizerOptions[recognizerName]; // `enable` is managed by the event registrations

        delete recognizerOption.enable;
        recognizer.set(recognizerOption);
      }
    } // Handle events not handled by Hammer.js:
    // - mouse wheel
    // - pointer/touch/mouse move


    this.wheelInput = new wheel_input_WheelInput(element, this._onOtherEvent, {
      enable: false
    });
    this.moveInput = new MoveInput(element, this._onOtherEvent, {
      enable: false
    });
    this.keyInput = new KeyInput(element, this._onOtherEvent, {
      enable: false
    });
    this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
      enable: false
    }); // Register all existing events

    for (var _iterator = this.events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref,
          eventAlias = _ref2[0],
          eventRegistrar = _ref2[1];

      if (!eventRegistrar.isEmpty()) {
        // Enable recognizer for this event.
        this._toggleRecognizer(eventRegistrar.recognizerName, true);

        this.manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
  } // Tear down internal event management implementations.
  ;

  _proto.destroy = function destroy() {
    if (this.element) {
      // wheelInput etc. are created in setElement() and therefore
      // cannot exist if there is no element
      this.wheelInput.destroy();
      this.moveInput.destroy();
      this.keyInput.destroy();
      this.contextmenuInput.destroy();
      this.manager.destroy();
      this.wheelInput = null;
      this.moveInput = null;
      this.keyInput = null;
      this.contextmenuInput = null;
      this.manager = null;
      this.element = null;
    }
  } // Register an event handler function to be called on `event`.
  ;

  _proto.on = function on(event, handler, srcElement) {
    if (typeof event === 'string') {
      this._addEventHandler(event, handler, srcElement);
    } else {
      srcElement = handler; // If `event` is a map, call `on()` for each entry.

      for (var eventName in event) {
        this._addEventHandler(eventName, event[eventName], srcElement);
      }
    }
  }
  /**
   * Deregister a previously-registered event handler.
   * @param {string|Object} event   An event name (String) or map of event names to handlers
   * @param {Function} [handler]    The function to be called on `event`.
   */
  ;

  _proto.off = function off(event, handler) {
    if (typeof event === 'string') {
      this._removeEventHandler(event, handler);
    } else {
      // If `event` is a map, call `off()` for each entry.
      for (var eventName in event) {
        this._removeEventHandler(eventName, event[eventName]);
      }
    }
  }
  /*
   * Enable/disable recognizer for the given event
   */
  ;

  _proto._toggleRecognizer = function _toggleRecognizer(name, enabled) {
    var manager = this.manager;

    if (!manager) {
      return;
    }

    var recognizer = manager.get(name);

    if (recognizer && recognizer.options.enable !== enabled) {
      recognizer.set({
        enable: enabled
      });
      var fallbackRecognizers = RECOGNIZER_FALLBACK_MAP[name];

      if (fallbackRecognizers && !this.options.recognizers) {
        // Set default require failures
        // http://hammerjs.github.io/require-failure/
        fallbackRecognizers.forEach(function (otherName) {
          var otherRecognizer = manager.get(otherName);

          if (enabled) {
            // Wait for this recognizer to fail
            otherRecognizer.requireFailure(name);
            /**
             * This seems to be a bug in hammerjs:
             * requireFailure() adds both ways
             * dropRequireFailure() only drops one way
             * https://github.com/hammerjs/hammer.js/blob/master/src/recognizerjs/
               recognizer-constructor.js#L136
             */

            recognizer.dropRequireFailure(otherName);
          } else {
            // Do not wait for this recognizer to fail
            otherRecognizer.dropRequireFailure(name);
          }
        });
      }
    }

    this.wheelInput.enableEventType(name, enabled);
    this.moveInput.enableEventType(name, enabled);
    this.keyInput.enableEventType(name, enabled);
    this.contextmenuInput.enableEventType(name, enabled);
  }
  /**
   * Process the event registration for a single event + handler.
   */
  ;

  _proto._addEventHandler = function _addEventHandler(event, handler, srcElement) {
    var manager = this.manager,
        events = this.events; // Alias to a recognized gesture as necessary.

    var eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    var eventRegistrar = events.get(eventAlias);

    if (!eventRegistrar) {
      eventRegistrar = new event_registrar_EventRegistrar(this);
      events.set(eventAlias, eventRegistrar); // Enable recognizer for this event.

      eventRegistrar.recognizerName = EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias; // Listen to the event

      if (manager) {
        manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }

    this._toggleRecognizer(eventRegistrar.recognizerName, true);

    eventRegistrar.add(event, handler, srcElement);
  }
  /**
   * Process the event deregistration for a single event + handler.
   */
  ;

  _proto._removeEventHandler = function _removeEventHandler(event, handler) {
    var events = this.events; // Alias to a recognized gesture as necessary.

    var eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    var eventRegistrar = events.get(eventAlias);

    if (!eventRegistrar) {
      return;
    }

    eventRegistrar.remove(event, handler);

    if (eventRegistrar.isEmpty()) {
      var recognizerName = eventRegistrar.recognizerName; // Disable recognizer if no more handlers are attached to its events

      var isRecognizerUsed = false;

      for (var _iterator2 = events.values(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var eh = _ref3;

        if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
          isRecognizerUsed = true;
          break;
        }
      }

      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }
  /**
   * Handle basic events using the 'hammer.input' Hammer.js API:
   * Before running Recognizers, Hammer emits a 'hammer.input' event
   * with the basic event info. This function emits all basic events
   * aliased to the "class" of event received.
   * See constants.BASIC_EVENT_CLASSES basic event class definitions.
   */
  ;

  _proto._onBasicInput = function _onBasicInput(event) {
    var srcEvent = event.srcEvent;
    var alias = BASIC_EVENT_ALIASES[srcEvent.type];

    if (alias) {
      // fire all events aliased to srcEvent.type
      this.manager.emit(alias, event);
    }
  }
  /**
   * Handle events not supported by Hammer.js,
   * and pipe back out through same (Hammer) channel used by other events.
   */
  ;

  _proto._onOtherEvent = function _onOtherEvent(event) {
    // console.log('onotherevent', event.type, event)
    this.manager.emit(event.type, event);
  };

  return EventManager;
}();


// CONCATENATED MODULE: ../src/index.js
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// EXTERNAL MODULE: ../examples/main/style.css
var style = __webpack_require__(192);

// CONCATENATED MODULE: ../examples/main/constants.js
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var EVENTS = ['click', 'anyclick', 'contextmenu', 'pointerdown', 'pointermove', 'pointerup', 'pointerover', 'pointerout', 'pointerleave', 'doubletap', 'pinchin', 'pinchout', 'pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'rotatestart', 'rotatemove', 'rotateend', 'rotatecancel', 'panstart', 'panmove', 'panend', 'pancancel', 'panup', 'pandown', 'panleft', 'panright', 'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'keydown', 'keyup', 'wheel'];
var INITIAL_OPTIONS = {
  click: true,
  doubletap: true,
  pinchstart: true,
  pinchmove: true,
  pinchend: true,
  rotatestart: true,
  rotatemove: true,
  rotateend: true,
  panstart: true,
  panmove: true,
  panend: true,
  wheel: true
};
// CONCATENATED MODULE: ../examples/main/app.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return app_App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderToDOM", function() { return renderToDOM; });





 // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.







var app_App =
/*#__PURE__*/
function (_Component) {
  inheritsLoose_default()(App, _Component);

  function App(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this._onLoad = _this._onLoad.bind(assertThisInitialized_default()(_this));
    _this._onLoadRedBox = _this._onLoadRedBox.bind(assertThisInitialized_default()(_this));
    _this._onUpdateOption = _this._onUpdateOption.bind(assertThisInitialized_default()(_this));
    _this._handleEvent = _this._handleEvent.bind(assertThisInitialized_default()(_this));
    _this._renderCheckbox = _this._renderCheckbox.bind(assertThisInitialized_default()(_this));
    _this.eventListeners = {};
    EVENTS.forEach(function (eventName) {
      if (INITIAL_OPTIONS[eventName]) {
        _this.eventListeners[eventName] = _this._handleEvent;
      }
    });
    _this._eventManager = new event_manager_EventManager(null, {
      events: _this.eventListeners
    });
    _this.state = {
      events: [],
      options: INITIAL_OPTIONS
    };
    return _this;
  }

  var _proto = App.prototype;

  _proto._onLoad = function _onLoad(ref) {
    this._eventManager.setElement(ref);
  };

  _proto._onLoadRedBox = function _onLoadRedBox(ref) {
    if (ref) {
      this._eventManager.on(this.eventListeners, ref);
    }

    this._redBox = ref;
  };

  _proto._onUpdateOption = function _onUpdateOption(evt) {
    var _Object$assign;

    var _evt$target = evt.target,
        name = _evt$target.name,
        checked = _evt$target.checked;

    if (checked) {
      this.eventListeners[name] = this._handleEvent;

      this._eventManager.on(name, this._handleEvent);

      this._eventManager.on(name, this._handleEvent, this._redBox);
    } else {
      delete this.eventListeners[name];

      this._eventManager.off(name, this._handleEvent);

      this._eventManager.off(name, this._handleEvent, this._redBox);
    }

    this.setState({
      options: Object.assign({}, this.state.options, (_Object$assign = {}, _Object$assign[name] = checked, _Object$assign))
    });
  };

  _proto._handleEvent = function _handleEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var events = this.state.events.slice(0, 30);
    events.unshift(evt);
    this.setState({
      events: events
    });
  };

  _proto._renderCheckbox = function _renderCheckbox(eventName) {
    var options = this.state.options;
    var id = "input-" + eventName;
    return react_default.a.createElement("div", {
      key: eventName
    }, react_default.a.createElement("input", {
      id: id,
      type: "checkbox",
      name: eventName,
      checked: options[eventName],
      onChange: this._onUpdateOption
    }), react_default.a.createElement("label", {
      htmlFor: id
    }, eventName));
  };

  _proto._renderEvent = function _renderEvent(evt, index) {
    var fields = [evt.type, evt.offsetCenter && evt.offsetCenter.x.toFixed(0), evt.offsetCenter && evt.offsetCenter.y.toFixed(0), evt.key, evt.leftButton && 'left', evt.middleButton && 'middle', evt.rightButton && 'right', evt.target.id].filter(Boolean);
    return react_default.a.createElement("tr", {
      key: index
    }, fields.map(function (f, i) {
      return react_default.a.createElement("td", {
        key: i
      }, f);
    }));
  };

  _proto.render = function render() {
    var events = this.state.events;
    return react_default.a.createElement("div", {
      id: "container",
      ref: this._onLoad
    }, react_default.a.createElement("div", {
      id: "red-box",
      ref: this._onLoadRedBox
    }), react_default.a.createElement("table", null, react_default.a.createElement("tbody", null, events.map(this._renderEvent))), react_default.a.createElement("div", {
      id: "options"
    }, EVENTS.map(this._renderCheckbox)));
  };

  return App;
}(react["Component"]);


function renderToDOM(container) {
  Object(react_dom["render"])(react_default.a.createElement(app_App, null), container);
}

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(204);
var validate = __webpack_require__(199);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(205)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(41);
var $keys = __webpack_require__(40);

__webpack_require__(203)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var setPrototypeOf = __webpack_require__(206).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(8);
var has = __webpack_require__(28);
var cof = __webpack_require__(33);
var inheritIfRequired = __webpack_require__(200);
var toPrimitive = __webpack_require__(58);
var fails = __webpack_require__(26);
var gOPN = __webpack_require__(84).f;
var gOPD = __webpack_require__(126).f;
var dP = __webpack_require__(22).f;
var $trim = __webpack_require__(208).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(78)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(17) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(27)(global, NUMBER, $Number);
}


/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(15);
var _isFinite = __webpack_require__(8).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(15);
var core = __webpack_require__(34);
var fails = __webpack_require__(26);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(22).f;
var create = __webpack_require__(78);
var redefineAll = __webpack_require__(124);
var ctx = __webpack_require__(38);
var anInstance = __webpack_require__(122);
var forOf = __webpack_require__(123);
var $iterDefine = __webpack_require__(83);
var step = __webpack_require__(129);
var setSpecies = __webpack_require__(127);
var DESCRIPTORS = __webpack_require__(17);
var fastKey = __webpack_require__(125).fastKey;
var validate = __webpack_require__(199);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(8);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(27);
var redefineAll = __webpack_require__(124);
var meta = __webpack_require__(125);
var forOf = __webpack_require__(123);
var anInstance = __webpack_require__(122);
var isObject = __webpack_require__(14);
var fails = __webpack_require__(26);
var $iterDetect = __webpack_require__(128);
var setToStringTag = __webpack_require__(47);
var inheritIfRequired = __webpack_require__(200);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(38)(Function.call, __webpack_require__(126).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return userAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return window_; });
/* unused harmony export global */
/* unused harmony export document */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return passiveSupported; });
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// Purpose: include this in your module to avoids adding dependencies on
// micro modules like 'global'

/* global window, global, document, navigator */
var userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
var window_ = typeof window !== 'undefined' ? window : global;
var global_ = typeof global !== 'undefined' ? global : window;
var document_ = typeof document !== 'undefined' ? document : {};

/*
 * Detect whether passive option is supported by the current browser.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   #Safely_detecting_option_support
 */

var passiveSupported = false;
/* eslint-disable accessor-pairs, no-empty */

try {
  var options = {
    // This function will be called when the browser
    // attempts to access the passive property.
    get passive() {
      passiveSupported = true;
      return true;
    }

  };
  window_.addEventListener('test', options, options);
  window_.removeEventListener('test', options, options);
} catch (err) {}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(81)))

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
var defined = __webpack_require__(39);
var fails = __webpack_require__(26);
var spaces = __webpack_require__(209);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ 209:
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

}]);
//# sourceMappingURL=component---examples-main-app-js-6ffe28bee85b66264728.js.map