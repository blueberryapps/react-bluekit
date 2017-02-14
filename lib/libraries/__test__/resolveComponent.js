'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Logo = require('../../app/atoms/Logo.react');

var _Logo2 = _interopRequireDefault(_Logo);

var _resolveComponent = require('../resolveComponent');

var _resolveComponent2 = _interopRequireDefault(_resolveComponent);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('passed nothing', function (t) {
  var result = (0, _resolveComponent2.default)().name === 'InvalidComponent';
  t.true(result);
});

(0, _ava2.default)('passed string', function (t) {
  var result = (0, _resolveComponent2.default)('test') === 'test';
  t.true(result);
});

(0, _ava2.default)('passed function', function (t) {
  var result = (0, _resolveComponent2.default)(function testFunction() {}).name === 'testFunction';
  t.true(result);
});

(0, _ava2.default)('passed component', function (t) {
  var result = (0, _resolveComponent2.default)(_Logo2.default) === _Logo2.default;
  t.true(result);
});

(0, _ava2.default)('passed object', function (t) {
  var result = _typeof((0, _resolveComponent2.default)({ asd: 'asd' })) === 'object';
  t.true(result);
});

(0, _ava2.default)('passed object with default', function (t) {
  var result = (0, _resolveComponent2.default)({ default: 'asd' }) === 'asd';
  t.true(result);
});