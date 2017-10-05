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

import {Manager} from './utils/hammer';

import WheelInput from './inputs/wheel-input';
import MoveInput from './inputs/move-input';
import KeyInput from './inputs/key-input';

import {
  BASIC_EVENT_ALIASES,
  EVENT_RECOGNIZER_MAP,
  GESTURE_EVENT_ALIASES,
  RECOGNIZERS
} from './constants';

// Unified API for subscribing to events about both
// basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
// and gestural input (e.g. 'click', 'tap', 'panstart').
// Delegates gesture related event registration and handling to Hammer.js.
export default class EventManager {
  constructor(element, options = {}) {
    this.element = element;
    this._onBasicInput = this._onBasicInput.bind(this);

    const ManagerClass = options.Manager || Manager;

    this.manager = new ManagerClass(element, {recognizers: options.recognizers || RECOGNIZERS})
      .on('hammer.input', this._onBasicInput);

    this.eventHandlers = [];

    // Handle events not handled by Hammer.js:
    // - mouse wheel
    // - pointer/touch/mouse move
    this._onOtherEvent = this._onOtherEvent.bind(this);
    this.wheelInput = new WheelInput(element, this._onOtherEvent, {enable: false});
    this.moveInput = new MoveInput(element, this._onOtherEvent, {enable: false});
    this.keyInput = new KeyInput(element, this._onOtherEvent, {enable: false});

    // Register all passed events.
    const {events} = options;
    if (events) {
      this.on(events);
    }
  }

  // Tear down internal event management implementations.
  destroy() {
    this.wheelInput.destroy();
    this.moveInput.destroy();
    this.keyInput.destroy();
    this.manager.destroy();
  }

  // Register an event handler function to be called on `event`.
  on(event, handler, srcElement) {
    if (typeof event === 'string') {
      this._addEventHandler(event, handler, srcElement);
    } else {
      srcElement = handler;
      // If `event` is a map, call `on()` for each entry.
      for (const eventName in event) {
        this._addEventHandler(eventName, event[eventName], srcElement);
      }
    }
  }

  /**
   * Deregister a previously-registered event handler.
   * @param {string|Object} event   An event name (String) or map of event names to handlers
   * @param {Function} [handler]    The function to be called on `event`.
   */
  off(event, handler) {
    if (typeof event === 'string') {
      this._removeEventHandler(event, handler);
    } else {
      // If `event` is a map, call `off()` for each entry.
      for (const eventName in event) {
        this._removeEventHandler(eventName, event[eventName]);
      }
    }
  }

  /*
   * Enable/disable recognizer for the given event
   */
  _toggleRecognizer(name, enabled) {
    const recognizer = this.manager.get(name);
    if (recognizer) {
      recognizer.set({enable: enabled});
    }
    this.wheelInput.enableEventType(name, enabled);
    this.moveInput.enableEventType(name, enabled);
    this.keyInput.enableEventType(name, enabled);
  }

  /**
   * Process the event registration for a single event + handler.
   */
  _addEventHandler(event, handler, srcElement = null) {
    const wrappedHandler = this._wrapEventHandler(event, handler, srcElement);
    // Alias to a recognized gesture as necessary.
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    // Get recognizer for this event
    const recognizerName = EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;
    // Enable recognizer for this event.
    this._toggleRecognizer(recognizerName, true);

    // Find ancestors
    const ancestorEventHandlers = this.eventHandlers.filter(entry => {
      return entry.eventAlias === eventAlias &&
        entry.srcElement !== srcElement &&
        (!entry.srcElement || entry.srcElement.contains(srcElement));
    });

    // Save wrapped handler
    this.eventHandlers.push({event, eventAlias, recognizerName, srcElement,
      handler, wrappedHandler});

    // Sort handlers by DOM hierarchy
    // So the event will always fire first on child nodes
    ancestorEventHandlers.forEach(entry => this.manager.off(eventAlias, entry.wrappedHandler));
    this.manager.on(eventAlias, wrappedHandler);
    ancestorEventHandlers.forEach(entry => this.manager.on(eventAlias, entry.wrappedHandler));
  }

  /**
   * Process the event deregistration for a single event + handler.
   */
  _removeEventHandler(event, handler) {
    let eventHandlerRemoved = false;

    // Find saved handler if any.
    for (let i = this.eventHandlers.length; i--;) {
      const entry = this.eventHandlers[i];
      if (entry.event === event && entry.handler === handler) {
        // Deregister event handler.
        this.manager.off(entry.eventAlias, entry.wrappedHandler);
        // Delete saved handler
        this.eventHandlers.splice(i, 1);
        eventHandlerRemoved = true;
      }
    }

    if (eventHandlerRemoved) {
      // Alias to a recognized gesture as necessary.
      const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
      // Get recognizer for this event
      const recognizerName = EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;
      // Disable recognizer if no more handlers are attached to its events
      const isRecognizerUsed = this.eventHandlers.find(
        entry => entry.recognizerName === recognizerName
      );
      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }

  /**
   * Returns an event handler that aliases events and add props before passing
   * to the real handler.
   */
  _wrapEventHandler(type, handler, srcElement) {
    return event => {
      let {mjolnirEvent} = event;

      if (!mjolnirEvent) {
        mjolnirEvent = this._normalizeEvent(event);
        event.mjolnirEvent = mjolnirEvent;
      }

      const isStopped = mjolnirEvent.handled && mjolnirEvent.handled !== srcElement;

      if (!isStopped) {
        const isFromDecendant = !srcElement || srcElement.contains(event.srcEvent.target);
        if (isFromDecendant) {
          handler(Object.assign({}, mjolnirEvent, {
            type,
            stopPropagation: () => {
              if (!mjolnirEvent.handled) {
                mjolnirEvent.handled = srcElement;
              }
            }
          }));
        }
      }
    };
  }

  /**
   * Normalizes hammerjs and custom events to have predictable fields.
   */
  _normalizeEvent(event) {
    const {element} = this;
    const {srcEvent} = event;

    const center = event.center || {
      x: srcEvent.clientX,
      y: srcEvent.clientY
    };

    // Calculate center relative to the root element
    const rect = element.getBoundingClientRect();

    // Fix scale for map affected by a CSS transform.
    // See https://stackoverflow.com/a/26893663/3528533
    const scaleX = rect.width / element.offsetWidth;
    const scaleY = rect.height / element.offsetHeight;

    // Calculate center relative to the root element
    const offsetCenter = {
      x: (center.x - rect.left - element.clientLeft) / scaleX,
      y: (center.y - rect.top - element.clientTop) / scaleY
    };

    return Object.assign({}, event, {
      handled: false,
      center,
      offsetCenter,
      rootElement: element
    });
  }

  /**
   * Handle basic events using the 'hammer.input' Hammer.js API:
   * Before running Recognizers, Hammer emits a 'hammer.input' event
   * with the basic event info. This function emits all basic events
   * aliased to the "class" of event received.
   * See constants.BASIC_EVENT_CLASSES basic event class definitions.
   */
  _onBasicInput(event) {
    const {srcEvent} = event;
    const alias = BASIC_EVENT_ALIASES[srcEvent.type];
    if (alias) {
      // fire all events aliased to srcEvent.type
      const emitEvent = Object.assign({}, event, {isDown: true});
      this.manager.emit(alias, emitEvent);
    }
  }

  /**
   * Handle events not supported by Hammer.js,
   * and pipe back out through same (Hammer) channel used by other events.
   */
  _onOtherEvent(event) {
    this.manager.emit(event.type, event);
  }
}
