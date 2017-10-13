const DOWN_EVENT = 1;
const MOVE_EVENT = 2;
const UP_EVENT = 4;
const MOUSE_EVENTS = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};

/**
 * Extract the involved mouse button from
 * MouseEvent.buttons https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
 * MouseEvent.button https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 * MouseEvent.which https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
 */
export function whichButton(event) {
  const eventType = MOUSE_EVENTS[event.srcEvent.type];
  if (!eventType) {
    // Not a mouse evet
    return null;
  }

  const {buttons, button, which} = event.srcEvent;
  let leftButton = false;
  let middleButton = false;
  let rightButton = false;

  if (
    // button is up, need to find out which one was pressed before
    eventType === UP_EVENT ||
    // moving but does not support `buttons` API
    (eventType === MOVE_EVENT && !Number.isFinite(buttons))
  ) {
    switch (which) {
    case 1:
      leftButton = true;
      break;
    case 2:
      middleButton = true;
      break;
    case 3:
      rightButton = true;
      break;
    default:
    }
  } else if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & 1);
    middleButton = Boolean(buttons & 4);
    rightButton = Boolean(buttons & 2);
  } else if (eventType === DOWN_EVENT) {
    leftButton = button === 0;
    middleButton = button === 1;
    rightButton = button === 2;
  }

  return {leftButton, middleButton, rightButton};
}

/**
 * Calculate event position relative to the root element
 */
export function getOffsetPosition(event, rootElement) {
  const {srcEvent} = event;

  // `center` is a hammer.js event property
  if (!event.center && !Number.isFinite(srcEvent.clientX)) {
    // Not a gestural event
    return null;
  }

  const center = event.center || {
    x: srcEvent.clientX,
    y: srcEvent.clientY
  };

  const rect = rootElement.getBoundingClientRect();

  // Fix scale for map affected by a CSS transform.
  // See https://stackoverflow.com/a/26893663/3528533
  const scaleX = rect.width / rootElement.offsetWidth;
  const scaleY = rect.height / rootElement.offsetHeight;

  // Calculate center relative to the root element
  const offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };

  return {center, offsetCenter};
}
