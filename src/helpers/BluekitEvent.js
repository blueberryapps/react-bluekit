function BluekitEvent(event, params) {
  params = params || {bubbles: false, cancelable: false, detail: undefined};
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

BluekitEvent.prototype = window.Event.prototype;
window.BluekitEvent = BluekitEvent;
export default BluekitEvent;
