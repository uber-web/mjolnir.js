# EventManager

Provides a unified API for subscribing to events about both basic input events (e.g. 'mousemove', 'touchstart', 'wheel') and gestural input (e.g. 'click', 'tap', 'panstart').



## Usage

```
import EventManager from 'mjolnir.js';

const eventManager = new EventManager(domElement);
function onClick (event) {}
function onPointerMove (event) {}

eventManager.on({
  click: onClick,
  pointermove: onPointerMove
});

// ...
eventManager.destroy();
```

__Note:__ While EventManager supports mouse and touch events, we recommend the use of [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) when possible for the broadest input device compatibility.



## Methods

### constructor

Creates a new `EventManager` instance.

`new EventManager(element, {events, recognizers})`

*  `element` {DOM Element, optional} - DOM element on which event handlers will be registered.
*  `options` {Object, optional} -  Options
*  `options.events` {Object} -  Map of {event name: handler} to register on init.
*  `options.recognizers` - {Object}  Gesture recognizers from Hammer.js to register, as an Array in [Hammer.Recognizer format](http://hammerjs.github.io/api/#hammermanager)
*  `options.rightButton` - {Boolean}  Recognizes click and drag from pressing the right mouse button. Default `false`. If turned on, the context menu will be disabled.


### destroy

Tears down internal event management implementations.

`eventManager.destroy()`

Note: It is important to call `destroy` when done since `EventManager` adds event listeners to `window`.


### setElement

Set the DOM element on which event handlers will be registered. If element has been set, events will be unregistered from the previous element.

`eventManager.setElement(element)`

*  `element` {DOM Element, optional} - DOM element on which event handlers will be registered.


### on

Register an event handler function to be called on `event`.

`eventManager.on(event, handler, srcElement)`

* `event` {string|Object} - An event name (`String`) or map of event names to handlers.
* `[handler]` {Function} - The function to be called on `event`.
* `[srcElement]` {Node} - The source element of this event. If provided, only events that are targeting this element or its decendants will invoke the handler. If ignored, default to the whole document. Events are propagated up the DOM tree.

** Note: Unlike the DOM event system, developers are responsible of deregistering event handlers when `srcElement` is removed. **

### off

* Deregister a previously-registered event handler.

`eventManager.off(event, handler)`

* `event` {string|Object} - An event name (String) or map of event names to handlers
* `[handler]` {Function} - The function to be called on `event`.



## Event objects

Event handlers subscribed via [`EventManager.on()`](#user-content-on) will be called with one parameter. This event parameter always has the following properties:

* `type` (string) -  The event type to which the event handler is subscribed, e.g. `'click'` or `'pointermove'`
* `center` (Object `{x, y}`) - The center of the event location (e.g. the centroid of a touch) relative to the viewport (basically, [`clientX/Y`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX))
* `offsetCenter` (Object `{x, y}`) - The center of the event location (e.g. the centroid of a touch)
* `target` (Object) - The target of the event, as specified by the original `srcEvent`
* `srcEvent` (Object) - The original event object dispatched by the browser to the JS runtime
* `stopPropagation` (Function) - Do not invoke handlers registered for any ancestors in the DOM tree.

Additionally, event objects for different event types contain a subset of the following properties:

* `key` (number) - The keycode of the keyboard event
* `leftButton` (boolean) - Flag indicating whether the left button is involved during the event
* `middleButton` (boolean) - Flag indicating whether the middle button is involved during the event
* `rightButton` (boolean) - Flag indicating whether the right button is involved during the event
* `pointerType` (string) - A string indicating the type of input (e.g. `'mouse'`, `'touch'`, `'pointer'`)
* `delta` (number) - The scroll magnitude/distance of a wheel event



## Supported Events and Gestures

### Basic input events
Keyboard events are fired when focus is on the EventManager's target element or its decendants, unless typing into a text input.
- `'keydown'`
- `'keyup'`

Mouse event and pointer event names are interchangeable.
- `'mousedown'` | `pointerdown`
- `'mousemove'` | `pointermove`
- `'mouseup'` | `pointerup`
- `'mouseleave'` | `pointerleave`
- `'wheel'`


### Gesture events
See [hammer.js](http://hammerjs.github.io/) for documentation of the following events.
- `'tap'` | `click`
- `'doubletap'` | `dblclick`
- `'press'`
- `'pan'`
- `'panstart'`
- `'panmove'`
- `'panup'`
- `'pandown'`
- `'panleft'`
- `'panright'`
- `'panend'`
- `'pancancel'`
- `'pinch'`
- `'pinchin'`
- `'pinchout'`
- `'pinchstart'`
- `'pinchmove'`
- `'pinchend'`
- `'pinchcancel'`
- `'rotate'`
- `'rotatestart'`
- `'rotatemove'`
- `'rotateend'`
- `'rotatecancel'`
- `'swipe'`
- `'swipeleft'`
- `'swiperight'`
- `'swipeup'`
- `'swipedown'`



## Event handling shims

`EventManager` currently uses Hammer.js for gesture and touch support, but Hammer.js does not support all input event types out of the box. Therefore, `EventManager` employs the following modules to shim the missing functionality:


### KeyInput

Handles keyboard events.


### MoveInput

Handles pointer/touch/mouse move events while no button pressed, and leave events (for when the cursor leaves the DOM element registered with `EventManager`).


### WheelInput

Handles mouse wheel events and trackpad events that emulate mouse wheel events. Note that this module is stateful: it tracks time elapsed between events in order to determine the magnitude/scroll distance of an event.



## Remarks

* Current implementation delegates touch and gesture event registration and handling to Hammer.js. Includes shims for handling event not supported by Hammer.js, such as keyboard input, mouse move, and wheel input. This dependency structure may change in the future.

* Hammer.js unsafely references `window` and `document`, and so will fail in environments without these constructs (e.g. Node). To mitigate this, Hammer.js modules are conditionally `require()`d, and replaced with mocks in non-browser environments.
