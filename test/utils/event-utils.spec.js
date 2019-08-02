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
import {whichButtons} from 'mjolnir.js/utils/event-utils';

test('EventUtils#whichButtons', t => {
  const TESTS = [
    {
      srcEvent: {
        type: 'mouseup',
        which: 1
      },
      leftButton: true,
      middleButton: false,
      rightButton: false
    },
    {
      srcEvent: {
        type: 'mousemove',
        which: 3
      },
      leftButton: false,
      middleButton: false,
      rightButton: true
    },
    {
      srcEvent: {
        type: 'pointermove',
        buttons: 1
      },
      leftButton: true,
      middleButton: false,
      rightButton: false
    },
    {
      srcEvent: {
        type: 'pointerdown',
        button: 2
      },
      leftButton: false,
      middleButton: false,
      rightButton: true
    },
    {
      srcEvent: {
        type: 'pointerup'
      },
      leftButton: false,
      middleButton: false,
      rightButton: false
    }
  ];

  for (const testCase of TESTS) {
    t.is(whichButtons(testCase).leftButton, testCase.leftButton, 'returns left button flag');
    t.is(whichButtons(testCase).middleButton, testCase.middleButton, 'returns middle button flag');
    t.is(whichButtons(testCase).rightButton, testCase.rightButton, 'returns right button flag');
  }

  t.end();
});
