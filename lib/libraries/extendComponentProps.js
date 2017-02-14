'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendComponentProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendComponentProps(builtProps, propsDefinition) {
  var immutableBuiltProps = (0, _immutable.fromJS)(builtProps);
  var componentProps = {};

  if (propsDefinition.get('children')) componentProps.children = _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: immutableBuiltProps.get('children') || 'DEFAULT CHILDREN' } });

  propsDefinition.map(function (data, prop) {
    var name = data.getIn(['type', 'name']);
    if (name === 'node' || name === 'element') componentProps[prop] = immutableBuiltProps.get(prop) ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: immutableBuiltProps.get(prop) } }) : '';
  });

  return immutableBuiltProps.mergeDeep((0, _immutable.fromJS)(componentProps));
}