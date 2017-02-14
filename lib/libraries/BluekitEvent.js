'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function BluekitEvent(event, params) {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

if (typeof window !== 'undefined') {
  BluekitEvent.prototype = window.Event.prototype;
  window.BluekitEvent = BluekitEvent;
}

exports.default = BluekitEvent;