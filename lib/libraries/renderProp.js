'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = renderProp;
function renderProp(key, type, value) {
  if (type === 'func') {
    return key + '={() => alert(\'INSERT YOUR ' + key + ' function\')}';
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'boolean') {
    return key + '={' + JSON.stringify(value) + '}';
  } else if (type === 'element' || type === 'node') return key + '={' + value + '}';else if (typeof value === 'number') return key + '={' + value + '}';else return key + '="' + value + '"';
}