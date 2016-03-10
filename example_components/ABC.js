'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
  * Example component description
  */
var Component = function Component(props) {
  return _react2['default'].createElement('div', null);
};
Component.displayName = 'ABC';
Component.defaultProps = {
  foo: true,
  bar: 'String'
};
Component.propTypes = {
  /**
  * Example prop description
  */
  foo: _react.PropTypes.bool
};
exports['default'] = Component;
module.exports = exports['default'];
