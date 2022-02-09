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

const register = require('@babel/register').default;

register({extensions: ['.ts', '.js']});

// eslint-disable-next-line
if (process.env.MOCK_BROWSER) {
  // eslint-disable-next-line
  console.log('Loading hammer.js with JSDOM...');

  const {JSDOM} = require('jsdom');
  const dom = new JSDOM('');
  /* global global */
  global.window = dom.window;
  global.navigator = dom.window.navigator;
  global.document = dom.window.document;

  const moduleAlias = require('module-alias');
  const {resolve} = require('path');
  moduleAlias.addAliases({
    './utils/hammer': resolve(__dirname, '../src/utils/hammer.browser')
  });
}

// Run the tests
require('./index');
