# Event

Event handlers subscribed via [`EventManager.on()`](/docs/api-reference/event-manager.md#on) will be called with one parameter. This event parameter always has the following properties:

- `type` (string) - The event type to which the event handler is subscribed, e.g. `'click'` or `'pointermove'`
- `center` (Object `{x, y}`) - The center of the event location (e.g. the centroid of a touch) relative to the viewport (basically, [`clientX/Y`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX))
- `offsetCenter` (Object `{x, y}`) - The center of the event location (e.g. the centroid of a touch)
- `target` (Object) - The target of the event, as specified by the original `srcEvent`
- `srcEvent` (Object) - The original event object dispatched by the browser to the JS runtime
- `preventDefault` (Function) - Equivalent to `srcEvent.preventDefault`.
- `stopPropagation` (Function) - Do not invoke handlers registered for any ancestors in the DOM tree.
- `stopImmediatePropagation` (Function) - Do not invoke any other handlers registered for the same element or its ancestors.

Additionally, event objects for different event types contain a subset of the following properties:

- `key` (number) - The keycode of the keyboard event
- `leftButton` (boolean) - Flag indicating whether the left button is involved during the event
- `middleButton` (boolean) - Flag indicating whether the middle button is involved during the event
- `rightButton` (boolean) - Flag indicating whether the right button is involved during the event
- `pointerType` (string) - A string indicating the type of input (e.g. `'mouse'`, `'touch'`, `'pointer'`)
- `delta` (number) - The scroll magnitude/distance of a wheel event
