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

/* global document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {EventManager} from 'mjolnir.js';

import {EVENTS, INITIAL_OPTIONS} from './constants';

class Root extends Component {

  constructor(props) {
    super(props);

    this._onLoad = this._onLoad.bind(this);
    this._onUpdateOption = this._onUpdateOption.bind(this);
    this._handleEvent = this._handleEvent.bind(this);
    this._renderCheckbox = this._renderCheckbox.bind(this);

    this._eventManager = null;
    this.state = {
      events: [],
      options: INITIAL_OPTIONS
    };
  }

  _onLoad(ref) {
    if (this._eventManager) {
      this._eventManager.destroy();
    }
    if (ref) {
      const eventListeners = {};

      EVENTS.forEach(eventName => {
        if (INITIAL_OPTIONS[eventName]) {
          eventListeners[eventName] = this._handleEvent;
        }
      });

      this._eventManager = new EventManager(ref, {events: eventListeners, rightButton: true});
    }
  }

  _onUpdateOption(evt) {
    const {name, checked} = evt.target;
    if (checked) {
      this._eventManager.on(name, this._handleEvent);
    } else {
      this._eventManager.off(name, this._handleEvent);
    }
    this.setState({
      options: Object.assign({}, this.state.options, {[name]: checked})
    });
  }

  _handleEvent(evt) {
    const events = this.state.events.slice(0, 30);
    events.unshift(evt);
    this.setState({events});
  }

  _renderCheckbox(eventName) {
    const {options} = this.state;
    const id = `input-${eventName}`;

    return (<div key={eventName}>
      <input id={id} type="checkbox" name={eventName}
        checked={options[eventName]}
        onChange={this._onUpdateOption} />
      <label htmlFor={id}>{eventName}</label>
    </div>);
  }

  _renderEvent(evt, index) {
    const fields = [
      evt.type,
      evt.offsetCenter && evt.offsetCenter.x.toFixed(0),
      evt.offsetCenter && evt.offsetCenter.y.toFixed(0),
      evt.key,
      evt.leftButton && 'left',
      evt.middleButton && 'middle',
      evt.rightButton && 'right'
    ].filter(Boolean);

    return (
      <tr key={index}>
        {fields.map((f, i) => <td key={i}>{f}</td>)}
      </tr>
    );
  }

  render() {
    const {events} = this.state;

    return (
      <div id="container" ref={this._onLoad}>
        <table>
          <tbody>
            {events.map(this._renderEvent)}
          </tbody>
        </table>

        <div id="options">
          {EVENTS.map(this._renderCheckbox)}
        </div>
      </div>
    );
  }

}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
