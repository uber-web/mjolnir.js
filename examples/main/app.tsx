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

import * as React from 'react';
import {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {render} from 'react-dom';
import {EventManager, MjolnirEvent} from 'mjolnir.js';

import './style.css';
import {EVENTS, INITIAL_OPTIONS} from './constants';

export default function App() {
  const rootRef = useRef<HTMLDivElement>();
  const redBoxRef = useRef<HTMLDivElement>();

  const [options, setOptions] = useState<{[eventName: string]: boolean}>(INITIAL_OPTIONS);
  const [eventLog, setEventLog] = useState<MjolnirEvent[]>([]);

  const handleEvent = useCallback((evt: MjolnirEvent) => {
    evt.srcEvent.preventDefault();
    evt.stopPropagation();

    setEventLog(curr => {
      curr = curr.slice(0, 30);
      curr.unshift(evt);
      return curr;
    });
  }, []);

  const eventManager = useMemo(() => {
    const eventListeners = {};
    for (const eventName of EVENTS) {
      if (INITIAL_OPTIONS[eventName]) {
        eventListeners[eventName] = handleEvent;
      }
    }

    return new EventManager(null, {
      events: eventListeners
    });
  }, []);

  useEffect(() => {
    eventManager.setElement(rootRef.current);

    for (const eventName of EVENTS) {
      if (INITIAL_OPTIONS[eventName]) {
        eventManager.on(eventName, handleEvent, {srcElement: redBoxRef.current});
      }
    }

    return () => {
      for (const eventName of EVENTS) {
        eventManager.off(eventName, handleEvent);
      }
    };
  }, []);

  const updateOption = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;
    if (checked) {
      eventManager.on(name, handleEvent);
      eventManager.on(name, handleEvent, {srcElement: redBoxRef.current});
    } else {
      eventManager.off(name, handleEvent);
    }
    setOptions(curr => ({...curr, [name]: checked}));
  }, []);

  return (
    <div id="container">
      <div id="background" ref={rootRef}>
        <div id="red-box" ref={redBoxRef} />
      </div>

      <div id="logs">{eventLog.map(renderEventLogEntry)}</div>

      <div id="options">
        {EVENTS.map(eventName => (
          <Checkbox
            eventName={eventName}
            value={options[eventName] || false}
            onChange={updateOption}
          />
        ))}
      </div>
    </div>
  );
}

function renderEventLogEntry(evt: MjolnirEvent, index: number) {
  return (
    <div key={index}>
      <span key="type">{evt.type}</span>
      <span key="position">
        {evt.offsetCenter
          ? `(${evt.offsetCenter.x.toFixed(0)}, ${evt.offsetCenter.y.toFixed(0)})`
          : ''}
      </span>
      <span key="button">
        {
          // @ts-ignore
          evt.key ||
            (evt.leftButton && 'left button') ||
            (evt.middleButton && 'middle button') ||
            (evt.rightButton && 'right button')
        }
      </span>
      <span key="target">{evt.target.id}</span>
    </div>
  );
}

function Checkbox({
  eventName,
  value,
  onChange
}: {
  eventName: string;
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `input-${eventName}`;

  return (
    <div key={eventName}>
      <input id={id} type="checkbox" name={eventName} checked={value} onChange={onChange} />
      <label htmlFor={id}>{eventName}</label>
    </div>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
