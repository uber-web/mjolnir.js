# Get Started

## Installation

```bash
npm install mjolnir.js
```

# Usage

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

## Using with React

The `EventManager` can be initialized with an empty root:

```js
import EventManager from 'mjolnir.js';

const eventManager = new EventManager();
// Events can be registered now, but they will have no effect until
// the event manager is attached to a DOM element
eventManager.on('dblclick', onDblClick);
```

We may set the root element later to a DOM node that's rendered by React:

```jsx
import React, {useRef, useEffect} from 'react';

function App() {
  const ref = useRef(null);
  useEffect(() => {
    // did mount
    eventManager.setElement(ref.current);
    // unmount
    return () => eventManager.setElement(null);
  }, []);

  return (
    <div ref={ref}>
      <Child />
    </div>
  );
}
```

Or add/remove event listeners when a React component is rendered:

```js
function Child() {
  const ref = useRef(null);
  useEffect(() => {
    // did mount
    eventManager.on('panstart', onDragChild, ref.current);
    // unmount
    return () => eventManager.off('panstart', onDragChild);
  }, []);

  return <div ref={ref}>Child node</div>;
}
```

Note that React's event chain is independent from that of mjolnir.js'. Therefore, a `click` event handler registered with mjolnir.js cannot be blocked by calling `stopPropagation` on a React `onClick` event.
