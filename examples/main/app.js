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

      this._eventManager = new EventManager(ref, {events: eventListeners});
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
    return (
      <tr key={index}>
        <td>{evt.type}</td>
        <td>{evt.offsetCenter.x.toFixed(0)}</td>
        <td>{evt.offsetCenter.y}</td>
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
