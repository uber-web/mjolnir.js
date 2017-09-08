# Get Started

## Installation

```
npm install mjolnir.js
```

# Usage

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
