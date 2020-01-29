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

import test from 'tape-catch';
import EventManager from 'mjolnir.js/event-manager';
import {spy, createEventRegistrarMock, HammerManagerMock} from './test-utils';

test('eventManager#constructor', t => {
  const eventRegistrar = createEventRegistrarMock();
  let eventManager = new EventManager(eventRegistrar);
  const onSpy = spy();
  const origOn = EventManager.prototype.on;
  EventManager.prototype.on = onSpy;

  t.ok(eventManager, 'EventManager created');
  t.ok(eventManager.manager, 'Hammer.Manager created');
  t.ok(eventManager.wheelInput, 'WheelInput created');
  t.ok(eventManager.moveInput, 'MoveInput created');
  t.ok(eventManager.keyInput, 'MoveInput created');
  t.notOk(onSpy.called, 'on() not called if options.events not passed');

  eventManager = new EventManager(eventRegistrar, {
    events: {foo: () => {}},
    Manager: HammerManagerMock,
    recognizerOptions: {
      tap: {
        threshold: 10
      }
    }
  });
  t.ok(onSpy.called, 'on() is called if options.events is passed');
  EventManager.prototype.on = origOn;

  // construct without element
  eventManager = new EventManager();
  t.ok(eventManager, 'EventManager created');
  t.notOk(eventManager.manager, 'Hammer.Manager should not be created');

  t.end();
});

test('eventManager#destroy', t => {
  const eventManager = new EventManager(createEventRegistrarMock());
  const {manager, moveInput, wheelInput, keyInput} = eventManager;

  spy(manager, 'destroy');
  spy(moveInput, 'destroy');
  spy(wheelInput, 'destroy');
  spy(keyInput, 'destroy');
  eventManager.destroy();

  t.equal(manager.destroy.callCount, 1, 'Manager.destroy() should be called once');
  t.equal(moveInput.destroy.callCount, 1, 'MoveInput.destroy() should be called once');
  t.equal(wheelInput.destroy.callCount, 1, 'WheelInput.destroy() should be called once');
  t.equal(keyInput.destroy.callCount, 1, 'KeyInput.destroy() should be called once');

  eventManager.destroy();
  t.pass('EventManager does not throw error on destroyed twice');

  const emptyEventManager = new EventManager();
  emptyEventManager.destroy();
  t.pass('EventManager without elements can be destroyed');

  t.end();
});

test('eventManager#setElement', t => {
  const events = {
    foo: () => {}
  };
  spy(events, 'foo');
  const eventManager = new EventManager(null, {
    Manager: HammerManagerMock,
    events
  });
  spy(eventManager, 'destroy');

  eventManager.setElement(createEventRegistrarMock());
  t.ok(eventManager.manager, 'Hammer.Manager created');
  t.equal(eventManager.destroy.callCount, 0, 'Manager.destroy() should not be called');
  eventManager.manager.emit('foo', {type: 'foo', srcEvent: {}});
  t.equal(events.foo.callCount, 1, 'event is transfered');

  const oldManager = eventManager.manager;
  eventManager.setElement(createEventRegistrarMock());
  t.ok(eventManager.manager, 'Hammer.Manager created');
  t.notEqual(eventManager.manager, oldManager, 'manager has changed');
  t.equal(eventManager.destroy.callCount, 1, 'Manager.destroy() should be called once');
  eventManager.manager.emit('foo', {type: 'foo', srcEvent: {}});
  t.equal(events.foo.callCount, 2, 'event is transfered');

  t.end();
});

test('eventManager#on', t => {
  const eventManager = new EventManager(createEventRegistrarMock());
  const toggleRecSpy = spy(eventManager, '_toggleRecognizer');

  eventManager.on('dblclick', () => {});
  t.ok(eventManager.events.get('doubletap'), 'event doubletap is registered');
  t.equal(
    toggleRecSpy.callCount,
    1,
    '_toggleRecognizer should be called once when passing a single event and handler'
  );

  toggleRecSpy.reset();
  eventManager.on({
    click: () => {},
    dblclick: () => {}
  });
  t.equal(
    toggleRecSpy.callCount,
    2,
    '_toggleRecognizer should be called once for each entry in an event:handler map'
  );
  t.end();
});

test('eventManager#watch', t => {
  const eventManager = new EventManager(createEventRegistrarMock());
  const toggleRecSpy = spy(eventManager, '_toggleRecognizer');

  eventManager.watch('dblclick', () => {});
  t.equal(toggleRecSpy.callCount, 0, '_toggleRecognizer should not be called for passive handler');

  t.end();
});

test('eventManager#once', t => {
  const eventManager = new EventManager(createEventRegistrarMock());
  const toggleRecSpy = spy(eventManager, '_toggleRecognizer');

  eventManager.once('dblclick', () => {});
  t.ok(eventManager.events.get('doubletap'), 'event doubletap is registered');
  t.equal(
    toggleRecSpy.callCount,
    1,
    '_toggleRecognizer should be called once when passing a single event and handler'
  );

  toggleRecSpy.reset();
  eventManager.once({
    click: () => {},
    dblclick: () => {}
  });
  t.equal(
    toggleRecSpy.callCount,
    2,
    '_toggleRecognizer should be called once for each entry in an event:handler map'
  );
  t.end();
});

test('eventManager#off', t => {
  const eventManager = new EventManager(createEventRegistrarMock());

  const handler1 = () => {};
  const handler2 = () => {};

  eventManager.on('click', handler1);
  eventManager.on('tap', handler2);
  eventManager.on('dblclick', handler1);
  eventManager.on('panstart', handler1);
  eventManager.on('panmove', handler2);

  const toggleRecSpy = spy(eventManager, '_toggleRecognizer');

  eventManager.off('foo', () => {});
  t.equal(
    toggleRecSpy.callCount,
    0,
    '_toggleRecognizer should not be called on an unrecognized event'
  );

  eventManager.off({
    tap: handler1,
    panstart: handler1,
    dblclick: handler1
  });
  t.equal(
    toggleRecSpy.callCount,
    1,
    '_toggleRecognizer should be called once for each event that has no more handlers'
  );
  t.end();
});

test('eventManager#eventHandling', t => {
  const eventRegistrar = createEventRegistrarMock();
  const eventMock = {type: 'foo'};
  const eventManager = new EventManager(eventRegistrar, {
    Manager: HammerManagerMock
  });
  const emitSpy = spy(eventManager.manager, 'emit');

  eventManager._onOtherEvent(eventMock);
  t.ok(emitSpy.called, 'manager.emit() should be called from _onOtherEvent()...');
  // TODO - fix spy
  // t.ok(emitSpy.calledWith(eventMock.type, eventMock),
  //   '...and should be called with correct params');

  t.end();
});

test('eventManager#normalizeEvent', t => {
  const eventRegistrar = createEventRegistrarMock();
  const eventMock = {
    type: 'foo',
    srcEvent: {
      clientX: 0,
      clientY: 0,
      target: {}
    }
  };
  const eventManager = new EventManager(eventRegistrar, {
    Manager: HammerManagerMock
  });

  let normalizedEvent;

  eventManager.on('foo', evt => {
    normalizedEvent = evt;
  });

  eventManager._onOtherEvent(eventMock);

  t.is(normalizedEvent.rootElement, eventRegistrar, 'rootElement is set');
  t.ok(normalizedEvent.center, 'center is populated');
  t.ok(normalizedEvent.offsetCenter, 'offsetCenter is populated');
  t.is(normalizedEvent.handled, false, 'event marked as not handled');

  t.end();
});

test('eventManager#propagation', t => {
  const rootNode = createEventRegistrarMock({
    id: 'root',
    children: [
      {
        id: 'child-0',
        children: [{id: 'grandchild-00'}, {id: 'grandchild-01'}]
      },
      {id: 'child-1'}
    ]
  });
  const eventManager = new EventManager(rootNode, {
    Manager: HammerManagerMock
  });

  const handlerCalls = [];

  const fooHandler = (message, stopPropagation = false) => evt => {
    handlerCalls.push(message);
    if (stopPropagation) {
      evt.stopPropagation();
    }
  };

  // Should not be called (propagation stopped)
  eventManager.on('foo', fooHandler('foo@root'), rootNode);
  // Should be called
  eventManager.on('foo', fooHandler('foo@child-0', true), rootNode.find('child-0'));
  eventManager.on('foo', fooHandler('foo@grandchild-00'), rootNode.find('grandchild-00'));
  // Should not be called (not on propagation path)
  eventManager.on('foo', fooHandler('foo@grandchild-01'), rootNode.find('grandchild-01'));

  eventManager.on(
    {
      // Should be called
      foo: fooHandler('foo@child-0:2'),
      // Should not be called (wrong event type)
      bar: fooHandler('bar@child-0')
    },
    rootNode.find('child-0')
  );

  const eventMock = {
    type: 'foo',
    srcEvent: {
      target: rootNode.find('grandchild-00')
    }
  };
  eventManager._onOtherEvent(eventMock);

  t.deepEquals(
    handlerCalls,
    ['foo@grandchild-00', 'foo@child-0', 'foo@child-0:2'],
    'propagated correctly'
  );
  t.end();
});
