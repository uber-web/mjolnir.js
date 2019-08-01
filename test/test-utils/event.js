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

class NodeMock {
  constructor({id, children = []}, parentNode = null) {
    this.id = id;
    this.style = {};
    this.parentNode = parentNode;
    this.children = children.map(child => new NodeMock(child, this));
  }

  contains(otherNode) {
    if (this === otherNode) {
      return true;
    }
    return this.children.some(child => child.contains(otherNode));
  }

  find(id) {
    if (this.id === id) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i].find(id);
      if (node) {
        return node;
      }
    }
    return undefined;
  }

  addEventListener() {}

  removeEventListener() {}

  getBoundingClientRect() {
    return {left: 0, top: 0, width: 1, height: 1};
  }
}

export function createEventRegistrarMock(tree = {id: ''}) {
  return new NodeMock(tree);
}
