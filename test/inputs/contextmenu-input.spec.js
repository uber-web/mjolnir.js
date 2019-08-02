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
import ContextmenuInput from 'mjolnir.js/inputs/contextmenu-input';
import {spy, createEventRegistrarMock} from '../test-utils';

test('contextmenuInput#constructor', t => {
  const eventRegistrar = createEventRegistrarMock();
  let contextmenuInput = new ContextmenuInput(eventRegistrar);
  t.ok(contextmenuInput, 'ContextmenuInput created without optional params');

  const addELSpy = spy(eventRegistrar, 'addEventListener');
  contextmenuInput = new ContextmenuInput(eventRegistrar, {
    rightButton: true
  });
  t.equal(addELSpy.callCount, 1, 'should call addEventListener once');
  t.end();
});

test('contextmenuInput#destroy', t => {
  const eventRegistrar = createEventRegistrarMock();
  const removeELSpy = spy(eventRegistrar, 'removeEventListener');
  const contextmenuInput = new ContextmenuInput(eventRegistrar);
  contextmenuInput.destroy();
  t.equal(removeELSpy.callCount, 1, 'should call removeEventListener once');
  t.end();
});

test('contextmenuInput#handleEvent', t => {
  const eventRegistrar = createEventRegistrarMock();
  const callbackSpy = spy();
  const contextmenuEventMock = {
    type: 'foo',
    preventDefault: () => {},
    clientX: 123,
    clientY: 456,
    target: eventRegistrar
  };
  const contextmenuInput = new ContextmenuInput(eventRegistrar, callbackSpy);
  contextmenuInput.handleEvent(contextmenuEventMock);

  t.is(callbackSpy.callCount, 1, 'callback should be called once');

  contextmenuInput.enableEventType('contextmenu');
  contextmenuInput.handleEvent(contextmenuEventMock);

  t.is(callbackSpy.callCount, 1, 'callback should not be called on disabled input');

  t.end();
});
