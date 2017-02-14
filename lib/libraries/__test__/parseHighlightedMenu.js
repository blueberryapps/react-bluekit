'use strict';

var _parseHighlightedMenu = require('../parseHighlightedMenu');

var _parseHighlightedMenu2 = _interopRequireDefault(_parseHighlightedMenu);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('parse highlighted', function (t) {
  var result = (0, _parseHighlightedMenu2.default)('<bstyle=\"color:red\">Text</b>');
  t.true(result === '<b style=\"color:red\">Text</b>');
});