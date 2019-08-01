# Upgrade Guide

## From 1.x to 2.0

- The `legacyBlockScroll` option to `EventManager` is removed. Use `eventManager.on('wheel', evt => evt.preventDefault())` to block scrolling.
- The `rightButton` option to `EventManager` is removed. Use `eventManager.on('contextmenu', evt => evt.preventDefault())` to enable right-button clicking and dragging.
