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
import EventHandler from 'mjolnir.js/utils/event-handler';
import {createEventRegistrarMock} from '../test-utils';

test('EventHandler#add, remove', t => {
  const eventHandler = new EventHandler();
  const handler1 = () => {};
  const handler2 = () => {};

  t.ok(eventHandler.handlers, 'event handler is created');
  t.ok(eventHandler.isEmpty(), 'event handler is empty');
  t.is(eventHandler.handlersByElement.size, 0, 'event elements map is empty');

  eventHandler.add('click', handler1);

  t.notOk(eventHandler.isEmpty(), 'event handler is not empty');
  t.is(eventHandler.handlers.length, 1, 'event handler is added');
  t.deepEquals(
    eventHandler.handlers[0],
    {type: 'click', handler: handler1, srcElement: 'root'},
    'event handler is added'
  );
  t.deepEquals(
    eventHandler.handlersByElement.get('root'),
    [{type: 'click', handler: handler1, srcElement: 'root'}],
    'event elements map is updated'
  );

  eventHandler.add('click', handler2, 'child-0');

  t.is(eventHandler.handlers.length, 2, 'event handler is added');
  t.deepEquals(
    eventHandler.handlers[1],
    {type: 'click', handler: handler2, srcElement: 'child-0'},
    'event handler is added'
  );
  t.deepEquals(
    eventHandler.handlersByElement.get('child-0'),
    [{type: 'click', handler: handler2, srcElement: 'child-0'}],
    'event elements map is updated'
  );

  eventHandler.remove('click', handler1);

  t.is(eventHandler.handlers.length, 1, 'event handler is removed');
  t.deepEquals(
    eventHandler.handlers[0],
    {type: 'click', handler: handler2, srcElement: 'child-0'},
    'event handler is removed'
  );
  t.notOk(eventHandler.handlersByElement.has('root'), 'event elements map is updated');

  eventHandler.remove('click', handler2);

  t.ok(eventHandler.isEmpty(), 'event handler is empty');
  t.notOk(eventHandler.handlersByElement.has('child-0'), 'event elements map is updated');

  t.end();
});

test('EventHandler#normalizeEvent', t => {
  const eventRegistrar = createEventRegistrarMock();
  const eventMock = {
    type: 'foo',
    srcEvent: {
      clientX: 0,
      clientY: 0,
      target: {}
    }
  };

  let normalizedEvent;
  const eventHandler = new EventHandler({element: eventRegistrar});
  eventHandler.add('foo', evt => {
    normalizedEvent = evt;
  });

  eventHandler.handleEvent(eventMock);

  t.is(normalizedEvent.rootElement, eventRegistrar, 'rootElement is set');
  t.ok(normalizedEvent.center, 'center is populated');
  t.ok(normalizedEvent.offsetCenter, 'offsetCenter is populated');
  t.is(normalizedEvent.handled, false, 'event marked as not handled');

  t.end();
});

test('EventHandler#propagation', t => {
  const rootNode = createEventRegistrarMock({
    id: 'root', children: [
      {id: 'child-0', children: [
        {id: 'grandchild-00'},
        {id: 'grandchild-01'}
      ]},
      {id: 'child-1'}
    ]
  });
  const eventHandler = new EventHandler({element: rootNode});

  const handlerCalls = [];

  const fooHandler = (message, stopPropagation = false) => evt => {
    handlerCalls.push(message);
    if (stopPropagation) {
      evt.stopPropagation();
    }
  };

  // Should not be called (propagation stopped)
  eventHandler.add('foo', fooHandler('foo@root'));
  // Should be called
  eventHandler.add('foo', fooHandler('foo@child-0', true), rootNode.find('child-0'));
  eventHandler.add('foo', fooHandler('foo@grandchild-00'), rootNode.find('grandchild-00'));
  eventHandler.add('foo', fooHandler('foo@child-0:2'), rootNode.find('child-0'));
  // Should not be called (not on propagation path)
  eventHandler.add('foo', fooHandler('foo@grandchild-01'), rootNode.find('grandchild-01'));

  const eventMock = {
    type: 'foo',
    srcEvent: {
      target: rootNode.find('grandchild-00')
    }
  };
  eventHandler.handleEvent(eventMock);

  t.deepEquals(handlerCalls, ['foo@grandchild-00', 'foo@child-0', 'foo@child-0:2'],
    'propagated correctly');
  t.end();

});
