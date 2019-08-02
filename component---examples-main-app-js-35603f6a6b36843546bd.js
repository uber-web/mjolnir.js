(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.to-string.js
var es6_object_to_string = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.map.js
var es6_map = __webpack_require__(74);

// CONCATENATED MODULE: ../src/utils/hammer-overrides.js
/**
 * This file contains overrides the default
 * hammer.js functions to add our own utility
 */ /* Hammer.js constants */var INPUT_START=1;var INPUT_MOVE=2;var INPUT_END=4;var MOUSE_INPUT_MAP={mousedown:INPUT_START,mousemove:INPUT_MOVE,mouseup:INPUT_END};/**
 * Helper function that returns true if any element in an array meets given criteria.
 * Because older browsers do not support `Array.prototype.some`
 * @params array {Array}
 * @params predict {Function}
 */function some(array,predict){for(var i=0;i<array.length;i++){if(predict(array[i])){return true;}}return false;}/* eslint-disable no-invalid-this */function enhancePointerEventInput(PointerEventInput){var oldHandler=PointerEventInput.prototype.handler;// overrides PointerEventInput.handler to accept right mouse button
PointerEventInput.prototype.handler=function handler(ev){var store=this.store;// Allow non-left mouse buttons through
if(ev.button>0){if(!some(store,function(e){return e.pointerId===ev.pointerId;})){store.push(ev);}}oldHandler.call(this,ev);};}// overrides MouseInput.handler to accept right mouse button
function enhanceMouseInput(MouseInput){MouseInput.prototype.handler=function handler(ev){var eventType=MOUSE_INPUT_MAP[ev.type];// on start we want to have the mouse button down
if(eventType&INPUT_START&&ev.button>=0){this.pressed=true;}if(eventType&INPUT_MOVE&&ev.which===0){eventType=INPUT_END;}// mouse must be down
if(!this.pressed){return;}if(eventType&INPUT_END){this.pressed=false;}this.callback(this.manager,eventType,{pointers:[ev],changedPointers:[ev],pointerType:'mouse',srcEvent:ev});};}
// CONCATENATED MODULE: ../src/utils/hammer.browser.js
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
var hammerjs=null;if(typeof document!=='undefined'){// Avoid crash if imported in a web worker
hammerjs=__webpack_require__(287);enhancePointerEventInput(hammerjs.PointerEventInput);enhanceMouseInput(hammerjs.MouseInput);}/* harmony default export */ var hammer_browser = (hammerjs);
// CONCATENATED MODULE: ../src/utils/hammer-manager-mock.js
// Hammer.Manager mock for use in environments without `document` / `window`.
function HammerManagerMock(m){var instance={};var chainedNoop=function chainedNoop(){return instance;};instance.get=function(){return null;};instance.set=chainedNoop;instance.on=chainedNoop;instance.off=chainedNoop;instance.destroy=chainedNoop;instance.emit=chainedNoop;return instance;}
// CONCATENATED MODULE: ../src/constants.js
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
// This module contains constants that must be conditionally required
// due to `window`/`document` references downstream.
var RECOGNIZERS=hammer_browser?[[hammer_browser.Rotate,{enable:false}],[hammer_browser.Pinch,{enable:false}],[hammer_browser.Swipe,{enable:false}],[hammer_browser.Pan,{threshold:0,enable:false}],[hammer_browser.Press,{enable:false}],[hammer_browser.Tap,{event:'doubletap',taps:2,enable:false}],// TODO - rename to 'tap' and 'singletap' in the next major release
[hammer_browser.Tap,{event:'anytap',enable:false}],[hammer_browser.Tap,{enable:false}]]:null;// Recognize the following gestures even if a given recognizer succeeds
var RECOGNIZER_COMPATIBLE_MAP={rotate:['pinch'],pan:['press','doubletap','anytap','tap'],doubletap:['anytap'],anytap:['tap']};// Recognize the folling gestures only if a given recognizer fails
var RECOGNIZER_FALLBACK_MAP={doubletap:['tap']};/**
 * Only one set of basic input events will be fired by Hammer.js:
 * either pointer, touch, or mouse, depending on system support.
 * In order to enable an application to be agnostic of system support,
 * alias basic input events into "classes" of events: down, move, and up.
 * See `_onBasicInput()` for usage of these aliases.
 */var BASIC_EVENT_ALIASES={pointerdown:'pointerdown',pointermove:'pointermove',pointerup:'pointerup',touchstart:'pointerdown',touchmove:'pointermove',touchend:'pointerup',mousedown:'pointerdown',mousemove:'pointermove',mouseup:'pointerup'};var INPUT_EVENT_TYPES={KEY_EVENTS:['keydown','keyup'],MOUSE_EVENTS:['mousedown','mousemove','mouseup','mouseover','mouseout','mouseleave'],WHEEL_EVENTS:[// Chrome, Safari
'wheel',// IE
'mousewheel',// legacy Firefox
'DOMMouseScroll']};/**
 * "Gestural" events are those that have semantic meaning beyond the basic input event,
 * e.g. a click or tap is a sequence of `down` and `up` events with no `move` event in between.
 * Hammer.js handles these with its Recognizer system;
 * this block maps event names to the Recognizers required to detect the events.
 */var EVENT_RECOGNIZER_MAP={tap:'tap',anytap:'anytap',doubletap:'doubletap',press:'press',pinch:'pinch',pinchin:'pinch',pinchout:'pinch',pinchstart:'pinch',pinchmove:'pinch',pinchend:'pinch',pinchcancel:'pinch',rotate:'rotate',rotatestart:'rotate',rotatemove:'rotate',rotateend:'rotate',rotatecancel:'rotate',pan:'pan',panstart:'pan',panmove:'pan',panup:'pan',pandown:'pan',panleft:'pan',panright:'pan',panend:'pan',pancancel:'pan',swipe:'swipe',swipeleft:'swipe',swiperight:'swipe',swipeup:'swipe',swipedown:'swipe'};/**
 * Map gestural events typically provided by browsers
 * that are not reported in 'hammer.input' events
 * to corresponding Hammer.js gestures.
 */var GESTURE_EVENT_ALIASES={click:'tap',anyclick:'anytap',dblclick:'doubletap',mousedown:'pointerdown',mousemove:'pointermove',mouseup:'pointerup',mouseover:'pointerover',mouseout:'pointerout',mouseleave:'pointerleave'};
// EXTERNAL MODULE: ../src/utils/globals.js
var globals = __webpack_require__(288);

// CONCATENATED MODULE: ../src/inputs/wheel-input.js
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
var firefox=globals["b" /* userAgent */].indexOf('firefox')!==-1;var WHEEL_EVENTS=INPUT_EVENT_TYPES.WHEEL_EVENTS;var EVENT_TYPE='wheel';// Constants for normalizing input delta
var WHEEL_DELTA_MAGIC_SCALER=4.000244140625;var WHEEL_DELTA_PER_LINE=40;// Slow down zoom if shift key is held for more precise zooming
var SHIFT_MULTIPLIER=0.25;var wheel_input_WheelInput=/*#__PURE__*/function(){function WheelInput(element,callback,options){var _this=this;if(options===void 0){options={};}this.element=element;this.callback=callback;this.options=Object.assign({enable:true},options);this.events=WHEEL_EVENTS.concat(options.events||[]);this.handleEvent=this.handleEvent.bind(this);this.events.forEach(function(event){return element.addEventListener(event,_this.handleEvent,globals["a" /* passiveSupported */]?{passive:false}:false);});}var _proto=WheelInput.prototype;_proto.destroy=function destroy(){var _this2=this;this.events.forEach(function(event){return _this2.element.removeEventListener(event,_this2.handleEvent);});}/**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */;_proto.enableEventType=function enableEventType(eventType,enabled){if(eventType===EVENT_TYPE){this.options.enable=enabled;}}/* eslint-disable complexity, max-statements */;_proto.handleEvent=function handleEvent(event){if(!this.options.enable){return;}var value=event.deltaY;if(globals["c" /* window */].WheelEvent){// Firefox doubles the values on retina screens...
if(firefox&&event.deltaMode===globals["c" /* window */].WheelEvent.DOM_DELTA_PIXEL){value/=globals["c" /* window */].devicePixelRatio;}if(event.deltaMode===globals["c" /* window */].WheelEvent.DOM_DELTA_LINE){value*=WHEEL_DELTA_PER_LINE;}}var wheelPosition={x:event.clientX,y:event.clientY};if(value!==0&&value%WHEEL_DELTA_MAGIC_SCALER===0){// This one is definitely a mouse wheel event.
// Normalize this value to match trackpad.
value=Math.floor(value/WHEEL_DELTA_MAGIC_SCALER);}if(event.shiftKey&&value){value=value*SHIFT_MULTIPLIER;}this._onWheel(event,-value,wheelPosition);};_proto._onWheel=function _onWheel(srcEvent,delta,position){this.callback({type:EVENT_TYPE,center:position,delta:delta,srcEvent:srcEvent,pointerType:'mouse',target:srcEvent.target});};return WheelInput;}();
// CONCATENATED MODULE: ../src/inputs/move-input.js
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
var MOUSE_EVENTS=INPUT_EVENT_TYPES.MOUSE_EVENTS;var MOVE_EVENT_TYPE='pointermove';var OVER_EVENT_TYPE='pointerover';var OUT_EVENT_TYPE='pointerout';var LEAVE_EVENT_TYPE='pointerleave';/**
 * Hammer.js swallows 'move' events (for pointer/touch/mouse)
 * when the pointer is not down. This class sets up a handler
 * specifically for these events to work around this limitation.
 * Note that this could be extended to more intelligently handle
 * move events across input types, e.g. storing multiple simultaneous
 * pointer/touch events, calculating speed/direction, etc.
 */var MoveInput=/*#__PURE__*/function(){function MoveInput(element,callback,options){var _this=this;if(options===void 0){options={};}this.element=element;this.callback=callback;this.pressed=false;this.options=Object.assign({enable:true},options);this.enableMoveEvent=this.options.enable;this.enableLeaveEvent=this.options.enable;this.enableOutEvent=this.options.enable;this.enableOverEvent=this.options.enable;this.events=MOUSE_EVENTS.concat(options.events||[]);this.handleEvent=this.handleEvent.bind(this);this.events.forEach(function(event){return element.addEventListener(event,_this.handleEvent);});}var _proto=MoveInput.prototype;_proto.destroy=function destroy(){var _this2=this;this.events.forEach(function(event){return _this2.element.removeEventListener(event,_this2.handleEvent);});}/**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */;_proto.enableEventType=function enableEventType(eventType,enabled){if(eventType===MOVE_EVENT_TYPE){this.enableMoveEvent=enabled;}if(eventType===OVER_EVENT_TYPE){this.enableOverEvent=enabled;}if(eventType===OUT_EVENT_TYPE){this.enableOutEvent=enabled;}if(eventType===LEAVE_EVENT_TYPE){this.enableLeaveEvent=enabled;}};_proto.handleEvent=function handleEvent(event){this.handleOverEvent(event);this.handleOutEvent(event);this.handleLeaveEvent(event);this.handleMoveEvent(event);};_proto.handleOverEvent=function handleOverEvent(event){if(this.enableOverEvent){if(event.type==='mouseover'){this.callback({type:OVER_EVENT_TYPE,srcEvent:event,pointerType:'mouse',target:event.target});}}};_proto.handleOutEvent=function handleOutEvent(event){if(this.enableOutEvent){if(event.type==='mouseout'){this.callback({type:OUT_EVENT_TYPE,srcEvent:event,pointerType:'mouse',target:event.target});}}};_proto.handleLeaveEvent=function handleLeaveEvent(event){if(this.enableLeaveEvent){if(event.type==='mouseleave'){this.callback({type:LEAVE_EVENT_TYPE,srcEvent:event,pointerType:'mouse',target:event.target});}}};_proto.handleMoveEvent=function handleMoveEvent(event){if(this.enableMoveEvent){switch(event.type){case'mousedown':if(event.button>=0){// Button is down
this.pressed=true;}break;case'mousemove':// Move events use `which` to track the button being pressed
if(event.which===0){// Button is not down
this.pressed=false;}if(!this.pressed){// Drag events are emitted by hammer already
// we just need to emit the move event on hover
this.callback({type:MOVE_EVENT_TYPE,srcEvent:event,pointerType:'mouse',target:event.target});}break;case'mouseup':this.pressed=false;break;default:}}};return MoveInput;}();
// CONCATENATED MODULE: ../src/inputs/key-input.js
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
var KEY_EVENTS=INPUT_EVENT_TYPES.KEY_EVENTS;var DOWN_EVENT_TYPE='keydown';var UP_EVENT_TYPE='keyup';var KeyInput=/*#__PURE__*/function(){function KeyInput(element,callback,options){var _this=this;if(options===void 0){options={};}this.element=element;this.callback=callback;this.options=Object.assign({enable:true},options);this.enableDownEvent=this.options.enable;this.enableUpEvent=this.options.enable;this.events=KEY_EVENTS.concat(options.events||[]);this.handleEvent=this.handleEvent.bind(this);element.tabIndex=1;element.style.outline='none';this.events.forEach(function(event){return element.addEventListener(event,_this.handleEvent);});}var _proto=KeyInput.prototype;_proto.destroy=function destroy(){var _this2=this;this.events.forEach(function(event){return _this2.element.removeEventListener(event,_this2.handleEvent);});}/**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */;_proto.enableEventType=function enableEventType(eventType,enabled){if(eventType===DOWN_EVENT_TYPE){this.enableDownEvent=enabled;}if(eventType===UP_EVENT_TYPE){this.enableUpEvent=enabled;}};_proto.handleEvent=function handleEvent(event){// Ignore if focused on text input
var targetElement=event.target||event.srcElement;if(targetElement.tagName==='INPUT'&&targetElement.type==='text'||targetElement.tagName==='TEXTAREA'){return;}if(this.enableDownEvent&&event.type==='keydown'){this.callback({type:DOWN_EVENT_TYPE,srcEvent:event,key:event.key,target:event.target});}if(this.enableUpEvent&&event.type==='keyup'){this.callback({type:UP_EVENT_TYPE,srcEvent:event,key:event.key,target:event.target});}};return KeyInput;}();
// CONCATENATED MODULE: ../src/inputs/contextmenu-input.js
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
var contextmenu_input_EVENT_TYPE='contextmenu';var ContextmenuInput=/*#__PURE__*/function(){function ContextmenuInput(element,callback,options){if(options===void 0){options={};}this.element=element;this.callback=callback;this.options=Object.assign({enable:true},options);this.handleEvent=this.handleEvent.bind(this);element.addEventListener('contextmenu',this.handleEvent);}var _proto=ContextmenuInput.prototype;_proto.destroy=function destroy(){this.element.removeEventListener('contextmenu',this.handleEvent);}/**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */;_proto.enableEventType=function enableEventType(eventType,enabled){if(eventType===contextmenu_input_EVENT_TYPE){this.options.enable=enabled;}};_proto.handleEvent=function handleEvent(event){if(!this.options.enable){return;}this.callback({type:contextmenu_input_EVENT_TYPE,center:{x:event.clientX,y:event.clientY},srcEvent:event,pointerType:'mouse',target:event.target});};return ContextmenuInput;}();
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js
var es6_number_is_finite = __webpack_require__(279);

// CONCATENATED MODULE: ../src/utils/event-utils.js
/* Constants */var DOWN_EVENT=1;var MOVE_EVENT=2;var UP_EVENT=4;var event_utils_MOUSE_EVENTS={pointerdown:DOWN_EVENT,pointermove:MOVE_EVENT,pointerup:UP_EVENT,mousedown:DOWN_EVENT,mousemove:MOVE_EVENT,mouseup:UP_EVENT};// MouseEvent.which https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
var MOUSE_EVENT_WHICH_LEFT=1;var MOUSE_EVENT_WHICH_MIDDLE=2;var MOUSE_EVENT_WHICH_RIGHT=3;// MouseEvent.button https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
var MOUSE_EVENT_BUTTON_LEFT=0;var MOUSE_EVENT_BUTTON_MIDDLE=1;var MOUSE_EVENT_BUTTON_RIGHT=2;// MouseEvent.buttons https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
var MOUSE_EVENT_BUTTONS_LEFT_MASK=1;var MOUSE_EVENT_BUTTONS_RIGHT_MASK=2;var MOUSE_EVENT_BUTTONS_MIDDLE_MASK=4;/**
 * Extract the involved mouse button
 */function whichButtons(event){var eventType=event_utils_MOUSE_EVENTS[event.srcEvent.type];if(!eventType){// Not a mouse evet
return null;}var _event$srcEvent=event.srcEvent,buttons=_event$srcEvent.buttons,button=_event$srcEvent.button,which=_event$srcEvent.which;var leftButton=false;var middleButton=false;var rightButton=false;if(// button is up, need to find out which one was pressed before
eventType===UP_EVENT||// moving but does not support `buttons` API
eventType===MOVE_EVENT&&!Number.isFinite(buttons)){leftButton=which===MOUSE_EVENT_WHICH_LEFT;middleButton=which===MOUSE_EVENT_WHICH_MIDDLE;rightButton=which===MOUSE_EVENT_WHICH_RIGHT;}else if(eventType===MOVE_EVENT){leftButton=Boolean(buttons&MOUSE_EVENT_BUTTONS_LEFT_MASK);middleButton=Boolean(buttons&MOUSE_EVENT_BUTTONS_MIDDLE_MASK);rightButton=Boolean(buttons&MOUSE_EVENT_BUTTONS_RIGHT_MASK);}else if(eventType===DOWN_EVENT){leftButton=button===MOUSE_EVENT_BUTTON_LEFT;middleButton=button===MOUSE_EVENT_BUTTON_MIDDLE;rightButton=button===MOUSE_EVENT_BUTTON_RIGHT;}return{leftButton:leftButton,middleButton:middleButton,rightButton:rightButton};}/**
 * Calculate event position relative to the root element
 */function getOffsetPosition(event,rootElement){var srcEvent=event.srcEvent;// `center` is a hammer.js event property
if(!event.center&&!Number.isFinite(srcEvent.clientX)){// Not a gestural event
return null;}var center=event.center||{x:srcEvent.clientX,y:srcEvent.clientY};var rect=rootElement.getBoundingClientRect();// Fix scale for map affected by a CSS transform.
// See https://stackoverflow.com/a/26893663/3528533
var scaleX=rect.width/rootElement.offsetWidth;var scaleY=rect.height/rootElement.offsetHeight;// Calculate center relative to the root element
var offsetCenter={x:(center.x-rect.left-rootElement.clientLeft)/scaleX,y:(center.y-rect.top-rootElement.clientTop)/scaleY};return{center:center,offsetCenter:offsetCenter};}
// CONCATENATED MODULE: ../src/utils/event-registrar.js
var event_registrar_EventRegistrar=/*#__PURE__*/function(){function EventRegistrar(eventManager){this.eventManager=eventManager;this.handlers=[];// Element -> handler map
this.handlersByElement=new Map();this.handleEvent=this.handleEvent.bind(this);}var _proto=EventRegistrar.prototype;_proto.isEmpty=function isEmpty(){return this.handlers.length===0;};_proto.add=function add(type,handler,srcElement){if(srcElement===void 0){srcElement='root';}var handlers=this.handlers,handlersByElement=this.handlersByElement;if(!handlersByElement.has(srcElement)){handlersByElement.set(srcElement,[]);}var entry={type:type,handler:handler,srcElement:srcElement};handlers.push(entry);handlersByElement.get(srcElement).push(entry);};_proto.remove=function remove(type,handler){var handlers=this.handlers,handlersByElement=this.handlersByElement;for(var i=handlers.length-1;i>=0;i--){var entry=handlers[i];if(entry.type===type&&entry.handler===handler){handlers.splice(i,1);var entries=handlersByElement.get(entry.srcElement);entries.splice(entries.indexOf(entry),1);if(entries.length===0){handlersByElement.delete(entry.srcElement);}}}}/**
   * Handles hammerjs event
   */;_proto.handleEvent=function handleEvent(event){if(this.isEmpty()){return;}var mjolnirEvent=this._normalizeEvent(event);var target=event.srcEvent.target;while(target&&target!==mjolnirEvent.rootElement){this._emit(mjolnirEvent,target);if(mjolnirEvent.handled){return;}target=target.parentNode;}this._emit(mjolnirEvent,'root');}/**
   * Invoke handlers on a particular element
   */;_proto._emit=function _emit(event,srcElement){var entries=this.handlersByElement.get(srcElement);if(entries){var immediatePropagationStopped=false;// Prevents the current event from bubbling up
var stopPropagation=function stopPropagation(){event.handled=true;};// Prevent any remaining listeners from being called
var stopImmediatePropagation=function stopImmediatePropagation(){event.handled=true;immediatePropagationStopped=true;};for(var i=0;i<entries.length;i++){var _entries$i=entries[i],type=_entries$i.type,handler=_entries$i.handler;handler(Object.assign({},event,{type:type,stopPropagation:stopPropagation,stopImmediatePropagation:stopImmediatePropagation}));if(immediatePropagationStopped){break;}}}}/**
   * Normalizes hammerjs and custom events to have predictable fields.
   */;_proto._normalizeEvent=function _normalizeEvent(event){var rootElement=this.eventManager.element;return Object.assign({},event,whichButtons(event),getOffsetPosition(event,rootElement),{handled:false,rootElement:rootElement});};return EventRegistrar;}();
// CONCATENATED MODULE: ../src/event-manager.js
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
var DEFAULT_OPTIONS={// event handlers
events:null,// custom recognizers
recognizers:null,recognizerOptions:{},// Manager class
Manager:hammer_browser?hammer_browser.Manager:HammerManagerMock,// allow browser default touch action
// https://github.com/uber/react-map-gl/issues/506
touchAction:'none'};// Unified API for subscribing to events about both
// basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
// and gestural input (e.g. 'click', 'tap', 'panstart').
// Delegates gesture related event registration and handling to Hammer.js.
var event_manager_EventManager=/*#__PURE__*/function(){function EventManager(element,options){if(element===void 0){element=null;}if(options===void 0){options={};}this.options=Object.assign({},DEFAULT_OPTIONS,options);this.events=new Map();this._onBasicInput=this._onBasicInput.bind(this);this._onOtherEvent=this._onOtherEvent.bind(this);this.setElement(element);// Register all passed events.
var _options=options,events=_options.events;if(events){this.on(events);}}var _proto=EventManager.prototype;_proto.setElement=function setElement(element){var _this=this;if(this.element){// unregister all events
this.destroy();}this.element=element;if(!element){return;}var options=this.options;var ManagerClass=options.Manager;this.manager=new ManagerClass(element,{touchAction:options.touchAction,recognizers:options.recognizers||RECOGNIZERS}).on('hammer.input',this._onBasicInput);if(!options.recognizers){// Set default recognize withs
// http://hammerjs.github.io/recognize-with/
Object.keys(RECOGNIZER_COMPATIBLE_MAP).forEach(function(name){var recognizer=_this.manager.get(name);if(recognizer){RECOGNIZER_COMPATIBLE_MAP[name].forEach(function(otherName){recognizer.recognizeWith(otherName);});}});}// Set recognizer options
for(var recognizerName in options.recognizerOptions){var recognizer=this.manager.get(recognizerName);if(recognizer){var recognizerOption=options.recognizerOptions[recognizerName];// `enable` is managed by the event registrations
delete recognizerOption.enable;recognizer.set(recognizerOption);}}// Handle events not handled by Hammer.js:
// - mouse wheel
// - pointer/touch/mouse move
this.wheelInput=new wheel_input_WheelInput(element,this._onOtherEvent,{enable:false});this.moveInput=new MoveInput(element,this._onOtherEvent,{enable:false});this.keyInput=new KeyInput(element,this._onOtherEvent,{enable:false});this.contextmenuInput=new ContextmenuInput(element,this._onOtherEvent,{enable:false});// Register all existing events
for(var _iterator=this.events,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var _ref2=_ref,eventAlias=_ref2[0],eventRegistrar=_ref2[1];if(!eventRegistrar.isEmpty()){// Enable recognizer for this event.
this._toggleRecognizer(eventRegistrar.recognizerName,true);this.manager.on(eventAlias,eventRegistrar.handleEvent);}}}// Tear down internal event management implementations.
;_proto.destroy=function destroy(){if(this.element){// wheelInput etc. are created in setElement() and therefore
// cannot exist if there is no element
this.wheelInput.destroy();this.moveInput.destroy();this.keyInput.destroy();this.contextmenuInput.destroy();this.manager.destroy();this.wheelInput=null;this.moveInput=null;this.keyInput=null;this.contextmenuInput=null;this.manager=null;this.element=null;}}// Register an event handler function to be called on `event`.
;_proto.on=function on(event,handler,srcElement){if(typeof event==='string'){this._addEventHandler(event,handler,srcElement);}else{srcElement=handler;// If `event` is a map, call `on()` for each entry.
for(var eventName in event){this._addEventHandler(eventName,event[eventName],srcElement);}}}/**
   * Deregister a previously-registered event handler.
   * @param {string|Object} event   An event name (String) or map of event names to handlers
   * @param {Function} [handler]    The function to be called on `event`.
   */;_proto.off=function off(event,handler){if(typeof event==='string'){this._removeEventHandler(event,handler);}else{// If `event` is a map, call `off()` for each entry.
for(var eventName in event){this._removeEventHandler(eventName,event[eventName]);}}}/*
   * Enable/disable recognizer for the given event
   */;_proto._toggleRecognizer=function _toggleRecognizer(name,enabled){var manager=this.manager;if(!manager){return;}var recognizer=manager.get(name);if(recognizer&&recognizer.options.enable!==enabled){recognizer.set({enable:enabled});var fallbackRecognizers=RECOGNIZER_FALLBACK_MAP[name];if(fallbackRecognizers&&!this.options.recognizers){// Set default require failures
// http://hammerjs.github.io/require-failure/
fallbackRecognizers.forEach(function(otherName){var otherRecognizer=manager.get(otherName);if(enabled){// Wait for this recognizer to fail
otherRecognizer.requireFailure(name);/**
             * This seems to be a bug in hammerjs:
             * requireFailure() adds both ways
             * dropRequireFailure() only drops one way
             * https://github.com/hammerjs/hammer.js/blob/master/src/recognizerjs/
               recognizer-constructor.js#L136
             */recognizer.dropRequireFailure(otherName);}else{// Do not wait for this recognizer to fail
otherRecognizer.dropRequireFailure(name);}});}}this.wheelInput.enableEventType(name,enabled);this.moveInput.enableEventType(name,enabled);this.keyInput.enableEventType(name,enabled);this.contextmenuInput.enableEventType(name,enabled);}/**
   * Process the event registration for a single event + handler.
   */;_proto._addEventHandler=function _addEventHandler(event,handler,srcElement){var manager=this.manager,events=this.events;// Alias to a recognized gesture as necessary.
var eventAlias=GESTURE_EVENT_ALIASES[event]||event;var eventRegistrar=events.get(eventAlias);if(!eventRegistrar){eventRegistrar=new event_registrar_EventRegistrar(this);events.set(eventAlias,eventRegistrar);// Enable recognizer for this event.
eventRegistrar.recognizerName=EVENT_RECOGNIZER_MAP[eventAlias]||eventAlias;// Listen to the event
if(manager){manager.on(eventAlias,eventRegistrar.handleEvent);}}this._toggleRecognizer(eventRegistrar.recognizerName,true);eventRegistrar.add(event,handler,srcElement);}/**
   * Process the event deregistration for a single event + handler.
   */;_proto._removeEventHandler=function _removeEventHandler(event,handler){var events=this.events;// Alias to a recognized gesture as necessary.
var eventAlias=GESTURE_EVENT_ALIASES[event]||event;var eventRegistrar=events.get(eventAlias);if(!eventRegistrar){return;}eventRegistrar.remove(event,handler);if(eventRegistrar.isEmpty()){var recognizerName=eventRegistrar.recognizerName;// Disable recognizer if no more handlers are attached to its events
var isRecognizerUsed=false;for(var _iterator2=events.values(),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[Symbol.iterator]();;){var _ref3;if(_isArray2){if(_i2>=_iterator2.length)break;_ref3=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref3=_i2.value;}var eh=_ref3;if(eh.recognizerName===recognizerName&&!eh.isEmpty()){isRecognizerUsed=true;break;}}if(!isRecognizerUsed){this._toggleRecognizer(recognizerName,false);}}}/**
   * Handle basic events using the 'hammer.input' Hammer.js API:
   * Before running Recognizers, Hammer emits a 'hammer.input' event
   * with the basic event info. This function emits all basic events
   * aliased to the "class" of event received.
   * See constants.BASIC_EVENT_CLASSES basic event class definitions.
   */;_proto._onBasicInput=function _onBasicInput(event){var srcEvent=event.srcEvent;var alias=BASIC_EVENT_ALIASES[srcEvent.type];if(alias){// fire all events aliased to srcEvent.type
this.manager.emit(alias,event);}}/**
   * Handle events not supported by Hammer.js,
   * and pipe back out through same (Hammer) channel used by other events.
   */;_proto._onOtherEvent=function _onOtherEvent(event){// console.log('onotherevent', event.type, event)
this.manager.emit(event.type,event);};return EventManager;}();
// CONCATENATED MODULE: ../src/index.js
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

// EXTERNAL MODULE: ../examples/main/style.css
var style = __webpack_require__(275);

// CONCATENATED MODULE: ../examples/main/constants.js
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
var EVENTS=['click','anyclick','contextmenu','pointerdown','pointermove','pointerup','pointerover','pointerout','pointerleave','doubletap','pinchin','pinchout','pinchstart','pinchmove','pinchend','pinchcancel','rotatestart','rotatemove','rotateend','rotatecancel','panstart','panmove','panend','pancancel','panup','pandown','panleft','panright','swipe','swipeleft','swiperight','swipeup','swipedown','keydown','keyup','wheel'];var INITIAL_OPTIONS={click:true,doubletap:true,pinchstart:true,pinchmove:true,pinchend:true,rotatestart:true,rotatemove:true,rotateend:true,panstart:true,panmove:true,panend:true,wheel:true};
// CONCATENATED MODULE: ../examples/main/app.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return app_App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderToDOM", function() { return renderToDOM; });
function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;subClass.__proto__=superClass;}// Copyright (c) 2017 Uber Technologies, Inc.
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
var app_App=/*#__PURE__*/function(_Component){_inheritsLoose(App,_Component);function App(props){var _this;_this=_Component.call(this,props)||this;_this._onLoad=_this._onLoad.bind(_assertThisInitialized(_this));_this._onLoadRedBox=_this._onLoadRedBox.bind(_assertThisInitialized(_this));_this._onUpdateOption=_this._onUpdateOption.bind(_assertThisInitialized(_this));_this._handleEvent=_this._handleEvent.bind(_assertThisInitialized(_this));_this._renderCheckbox=_this._renderCheckbox.bind(_assertThisInitialized(_this));_this.eventListeners={};EVENTS.forEach(function(eventName){if(INITIAL_OPTIONS[eventName]){_this.eventListeners[eventName]=_this._handleEvent;}});_this._eventManager=new event_manager_EventManager(null,{events:_this.eventListeners});_this.state={events:[],options:INITIAL_OPTIONS};return _this;}var _proto=App.prototype;_proto._onLoad=function _onLoad(ref){this._eventManager.setElement(ref);};_proto._onLoadRedBox=function _onLoadRedBox(ref){if(ref){this._eventManager.on(this.eventListeners,ref);}this._redBox=ref;};_proto._onUpdateOption=function _onUpdateOption(evt){var _Object$assign;var _evt$target=evt.target,name=_evt$target.name,checked=_evt$target.checked;if(checked){this.eventListeners[name]=this._handleEvent;this._eventManager.on(name,this._handleEvent);this._eventManager.on(name,this._handleEvent,this._redBox);}else{delete this.eventListeners[name];this._eventManager.off(name,this._handleEvent);this._eventManager.off(name,this._handleEvent,this._redBox);}this.setState({options:Object.assign({},this.state.options,(_Object$assign={},_Object$assign[name]=checked,_Object$assign))});};_proto._handleEvent=function _handleEvent(evt){evt.preventDefault();evt.stopPropagation();var events=this.state.events.slice(0,30);events.unshift(evt);this.setState({events:events});};_proto._renderCheckbox=function _renderCheckbox(eventName){var options=this.state.options;var id="input-"+eventName;return react_default.a.createElement("div",{key:eventName},react_default.a.createElement("input",{id:id,type:"checkbox",name:eventName,checked:options[eventName]||false,onChange:this._onUpdateOption}),react_default.a.createElement("label",{htmlFor:id},eventName));};_proto._renderEvent=function _renderEvent(evt,index){return react_default.a.createElement("div",{key:index},react_default.a.createElement("span",{key:"type"},evt.type),react_default.a.createElement("span",{key:"position"},evt.offsetCenter?"("+evt.offsetCenter.x.toFixed(0)+", "+evt.offsetCenter.y.toFixed(0)+")":''),react_default.a.createElement("span",{key:"button"},evt.key||evt.leftButton&&'left button'||evt.middleButton&&'middle button'||evt.rightButton&&'right button'),react_default.a.createElement("span",{key:"target"},evt.target.id));};_proto.render=function render(){var events=this.state.events;return react_default.a.createElement(react["Fragment"],null,react_default.a.createElement("div",{id:"container",ref:this._onLoad},react_default.a.createElement("div",{id:"red-box",ref:this._onLoadRedBox})),react_default.a.createElement("div",{id:"logs"},events.map(this._renderEvent)),react_default.a.createElement("div",{id:"options"},EVENTS.map(this._renderCheckbox)));};return App;}(react["Component"]);function renderToDOM(container){Object(react_dom["render"])(react_default.a.createElement(app_App,null),container);}

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return userAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return window_; });
/* unused harmony export global */
/* unused harmony export document */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return passiveSupported; });
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
// Purpose: include this in your module to avoids adding dependencies on
// micro modules like 'global'
/* global window, global, document, navigator */var userAgent=typeof navigator!=='undefined'&&navigator.userAgent?navigator.userAgent.toLowerCase():'';var window_=typeof window!=='undefined'?window:global;var global_=typeof global!=='undefined'?global:window;var document_=typeof document!=='undefined'?document:{};/*
 * Detect whether passive option is supported by the current browser.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   #Safely_detecting_option_support
 */var passiveSupported=false;/* eslint-disable accessor-pairs, no-empty */try{var options={// This function will be called when the browser
// attempts to access the passive property.
get passive(){passiveSupported=true;return true;}};window_.addEventListener('test',options,options);window_.removeEventListener('test',options,options);}catch(err){}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(97)))

/***/ })

}]);
//# sourceMappingURL=component---examples-main-app-js-35603f6a6b36843546bd.js.map