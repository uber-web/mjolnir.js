const noop = () => {};

// Hammer.Manager mock for use in environments without `document` / `window`.
export class HammerManagerMock {

  constructor(element) {
    this.handlers = {};
  }

  get() {
    return {
      options: {},
      set: noop,
      recognizeWith: noop,
      dropRecognizeWith: noop,
      requireFailure: noop,
      dropRequireFailure: noop
    };
  }

  set() {
    return this;
  }

  on(event, handler) {
    const {handlers} = this;

    handlers[event] = handlers[event] || [];
    handlers[event].push(handler);

    return this;
  }

  off(event, handler) {
    const {handlers} = this;
    const handlersArray = handlers[event];

    if (!handler) {
      delete handlers[event];
    } else if (handlersArray) {
      for (let i = handlersArray.length - 1; i >= 0; i--) {
        if (handlersArray[i] === handler) {
          handlersArray.splice(i, 1);
        }
      }
    }
    return this;
  }

  destroy() {
    return this;
  }

  emit(event, data) {

    const handlersArray = this.handlers[event] && this.handlers[event].slice();
    if (!handlersArray || !handlersArray.length) {
      return;
    }

    handlersArray.forEach(handler => handler(data));
  }

}
