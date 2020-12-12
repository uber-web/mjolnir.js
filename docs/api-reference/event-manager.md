# EventManager

Provides a unified API for subscribing to events about both basic input events (e.g. 'mousemove', 'touchstart', 'wheel') and gestural input (e.g. 'click', 'tap', 'panstart').

## Usage

```js
import EventManager from 'mjolnir.js';

const eventManager = new EventManager(document.getElementById('container'));
function onClick(event) {}
function onPinch(event) {}

eventManager.on({
  click: onClick,
  pinch: onPinch
});

// ...
eventManager.destroy();
```

**Note:** While EventManager supports mouse and touch events, we recommend the use of [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) when possible for the broadest input device compatibility.

## Methods

### constructor

Creates a new `EventManager` instance.

`new EventManager(element, {events, recognizers})`

- `element` {DOM Element, optional} - DOM element on which event handlers will be registered. Default `null`.
- `options` {Object, optional} - Options
  - `events` {Object} - A map from event names to their handler functions, to register on init.
  - `recognizers` - {Object} Gesture recognizers from Hammer.js to register, as an Array in [Hammer.Recognizer format](http://hammerjs.github.io/api/#hammermanager). If not provided, a default set of recognizers will be used. See "Gesture Events" section below for more details.
  - `recognizerOptions` - {Object} Override the default options of `recognizers`. Keys are recognizer names and values are recognizer options. For a list of default recognizers, see "Gesture Events" section below.
  - `rightButton` - {Boolean} Recognizes click and drag from pressing the right mouse button. Default `false`. If turned on, the context menu will be disabled.
  - `touchAction` - {String} Allow browser default touch actions. Default `none`. See [hammer.js doc](http://hammerjs.github.io/touch-action/).
  - `tabIndex` - {Number} The [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the root element. Default `0`.

### destroy

Tears down internal event management implementations.

`eventManager.destroy()`

Note: It is important to call `destroy` when done since `EventManager` adds event listeners to `window`.

### setElement

Set the DOM element on which event handlers will be registered. If element has been set, events will be unregistered from the previous element.

`eventManager.setElement(element)`

- `element` {DOM Element, optional} - DOM element on which event handlers will be registered.

### on

Register an event handler function to be called on `event`.

```js
eventManager.on(event, handler, options);
eventManager.on(eventMap, options);
```

- `event` {String} - An event name
- `handler` {Function} - The function to be called on `event`.
- `eventMap` {Object} - A map from event names to their handler functions
- `options` {Object, optional}
  - `srcElement` {Node} - The source element of this event. If provided, only events that are targeting this element or its decendants will invoke the handler. If ignored, default to the root element of the event manager. Events are propagated up the DOM tree.
  - `priority` {Number} - Handlers targeting the same `srcElement` will be executed by their priorities (higher numbers first). Handlers with the same priority will be executed in the order of registration. Default `0`.

** Note: Unlike the DOM event system, developers are responsible of deregistering event handlers when `srcElement` is removed. **

### once

Register a one-time event handler function to be called on `event`. The handler is removed once it has been called.

```js
eventManager.once(event, handler, options);
eventManager.once(eventMap, options);
```

Expects the same arguments as [on](#on).

### watch

Register an event handler function to be called on `event`. This handler does not ask the event to be recognized from user input; rather, it "intercepts" the event if some other handler is getting it.

```js
eventManager.watch(event, handler, options);
eventManager.watch(eventMap, options);
```

Expects the same arguments as [on](#on).

For example, we want a child element to block any `dblclick` event from bubbling up to root. The root may or may not be actually listening to `dblclick`. If the root did not register a handler, and we use

```js
eventManager.on('dblClick', evt => evt.stopPropagation(), {srcElement: <child>});
```

It will enable the `DoubleTapRecognizer`. Recognizers for gestures add additional overhead, and may cause subtle behavioral changes. In this case, recognizing `dblclick` events will cause the `click` events to be fired with a small delay. Since we only want to be notified _if_ a `dblclick` event is fired, it is safer to use:

```js
eventManager.watch('dblClick', evt => evt.stopPropagation(), {srcElement: <child>});
```

### off

- Deregister a previously-registered event handler.

`eventManager.off(event, handler)`
`eventManager.off(eventMap)`

- `event` {String} - An event name
- `handler` {Function} - The function to be called on `event`.
- `eventMap` {Object} - A map from event names to their handler functions

## Supported Events and Gestures

### Basic input events

Keyboard events are fired when focus is on the EventManager's target element or its decendants, unless typing into a text input.

- `'keydown'`
- `'keyup'`

Mouse event and pointer event names are interchangeable.

- `'mousedown'` | `'pointerdown'`
- `'mousemove'` | `'pointermove'`
- `'mouseup'` | `'pointerup'`
- `'mouseover'` | `'pointerover'`
- `'mouseout'` | `'pointerout'`
- `'mouseleave'` | `'pointerleave'`
- `'wheel'`
- `'contextmenu'`

### Gesture events

The following events are generated with [hammer.js](http://hammerjs.github.io/)recognizers. You may fine-tune the behavior of these events by supplying `recognizerOptions` to the `EventManager` constructor.

- The following events are controlled by the `rotate` ([Hammer.Rotate](https://hammerjs.github.io/recognizer-rotate/)) recognizer:
  - `'rotate'`
  - `'rotatestart'`
  - `'rotatemove'`
  - `'rotateend'`
  - `'rotatecancel'`
- The following events are controlled by the `pinch` ([Hammer.Pinch](https://hammerjs.github.io/recognizer-pinch/)) recognizer:
  - `'pinch'`
  - `'pinchin'`
  - `'pinchout'`
  - `'pinchstart'`
  - `'pinchmove'`
  - `'pinchend'`
  - `'pinchcancel'`
- The following events are controlled by the `swipe` ([Hammer.Swipe](https://hammerjs.github.io/recognizer-swipe/)) recognizer:
  - `'swipe'`
  - `'swipeleft'`
  - `'swiperight'`
  - `'swipeup'`
  - `'swipedown'`
- The following events are controlled by the `tripan` ([Hammer.Pan](https://hammerjs.github.io/recognizer-pan/)) recognizer (3-finger pan):
  - `'tripan'`
  - `'tripanstart'`
  - `'tripanmove'`
  - `'tripanup'`
  - `'tripandown'`
  - `'tripanleft'`
  - `'tripanright'`
  - `'tripanend'`
  - `'tripancancel'`
- The following events are controlled by the `pan` ([Hammer.Pan](https://hammerjs.github.io/recognizer-pan/)) recognizer:
  - `'pan'`
  - `'panstart'`
  - `'panmove'`
  - `'panup'`
  - `'pandown'`
  - `'panleft'`
  - `'panright'`
  - `'panend'`
  - `'pancancel'`
- The following events are controlled by the `Press` ([Hammer.Pan](https://hammerjs.github.io/recognizer-press/)) recognizer:
  - `'press'`
- The following events are controlled by the `doubletap` ([Hammer.Pan](https://hammerjs.github.io/recognizer-tap/)) recognizer:
  - `'doubletap'`
  - `'dblclick'` - alias of `doubletap`
- The following events are controlled by the `tap` ([Hammer.Pan](https://hammerjs.github.io/recognizer-tap/)) recognizer:
  - `'tap'` - a single click. Not fired if double clicking.
  - `'click'` - alias of `tap`
- The following events are controlled by the `anytap` ([Hammer.Pan](https://hammerjs.github.io/recognizer-tap/)) recognizer:
  - `'anytap'` - like `click`, but fired twice if double clicking.
  - `'anyclick'` - alias of `anytap`

## Event handling shims

`EventManager` currently uses Hammer.js for gesture and touch support, but Hammer.js does not support all input event types out of the box. Therefore, `EventManager` employs the following modules to shim the missing functionality:

### KeyInput

Handles keyboard events.

### MoveInput

Handles pointer/touch/mouse move events while no button pressed, and leave events (for when the cursor leaves the DOM element registered with `EventManager`).

### WheelInput

Handles mouse wheel events and trackpad events that emulate mouse wheel events. Note that this module is stateful: it tracks time elapsed between events in order to determine the magnitude/scroll distance of an event.

## Remarks

- Current implementation delegates touch and gesture event registration and handling to Hammer.js. Includes shims for handling event not supported by Hammer.js, such as keyboard input, mouse move, and wheel input. This dependency structure may change in the future.

- Hammer.js unsafely references `window` and `document`, and so will fail in environments without these constructs (e.g. Node). To mitigate this, Hammer.js modules are conditionally `require()`d, and replaced with mocks in non-browser environments.
