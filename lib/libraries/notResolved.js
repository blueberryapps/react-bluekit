'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (data) {
  return function () {
    return _react2.default.createElement(
      'div',
      null,
      'Unable to resolve: ',
      JSON.stringify(data)
    );
  };
};