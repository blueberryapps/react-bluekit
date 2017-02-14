'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapReactLifecycleMethodsWithTryCatch;

var _Error = require('../app/atoms/Error.react');

var _Error2 = _interopRequireDefault(_Error);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapWithTryCatch = function wrapWithTryCatch(component, method) {
  var unsafe = component[method];

  component[method] = function lifecycleWithRescue() {
    try {
      return unsafe.apply(this, arguments);
    } catch (err) {
      var errorReport = {
        component: component.constructor.name,
        method: method,
        props: this.props,
        error: err
      };
      if (arguments.length > 0) {
        errorReport.arguments = arguments;
      }
      if (method === 'render') {
        return _react2.default.createElement(_Error2.default, { error: err });
      }
    }
  };
};

function wrapReactLifecycleMethodsWithTryCatch(ComponentConstructor) {
  ['render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'].forEach(function (method) {
    return ComponentConstructor.prototype[method] && wrapWithTryCatch(ComponentConstructor.prototype, method);
  });

  return ComponentConstructor;
};