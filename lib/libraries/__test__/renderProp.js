'use strict';

var _renderProp = require('../renderProp');

var _renderProp2 = _interopRequireDefault(_renderProp);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('passed func', function (t) {
  var result = (0, _renderProp2.default)('key', 'func', 'value');
  t.true(result === 'key={() => alert(\'INSERT YOUR key function\')}');
});

(0, _ava2.default)('passed object', function (t) {
  var result = (0, _renderProp2.default)('key', 'object', { object: 'objectKey' });
  t.true(result === 'key={{\"object\":\"objectKey\"}}');
});

(0, _ava2.default)('passed bool', function (t) {
  var result = (0, _renderProp2.default)('key', 'bool', true);
  t.true(result === 'key={true}');
});

(0, _ava2.default)('passed element', function (t) {
  var result = (0, _renderProp2.default)('key', 'element', 'value');
  t.true(result === 'key={value}');
});

(0, _ava2.default)('passed node', function (t) {
  var result = (0, _renderProp2.default)('key', 'node', 'value');
  t.true(result === 'key={value}');
});

(0, _ava2.default)('passed number', function (t) {
  var result = (0, _renderProp2.default)('key', 'number', 6);
  t.true(result === 'key={6}');
});

(0, _ava2.default)('passed everything else', function (t) {
  var result = (0, _renderProp2.default)('key', 'number', 'value');
  t.true(result === 'key=\"value\"');
});