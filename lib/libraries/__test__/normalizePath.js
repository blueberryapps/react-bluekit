'use strict';

var _normalizePath = require('../normalizePath');

var _normalizePath2 = _interopRequireDefault(_normalizePath);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('replace with \'\\\'', function (t) {
  var text = '\\folder\\folder\\file.js';
  var result = (0, _normalizePath2.default)(text, '\\');
  t.true(result === '/folder/folder/file.js');
});

(0, _ava2.default)('replace without \'\\\'', function (t) {
  var text = 'folder/folder/file.js';
  var result = (0, _normalizePath2.default)(text);
  t.true(result === 'folder/folder/file.js');
});