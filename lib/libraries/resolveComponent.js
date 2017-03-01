'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = resolveComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidComponent = function (_Component) {
  _inherits(InvalidComponent, _Component);

  function InvalidComponent() {
    _classCallCheck(this, InvalidComponent);

    return _possibleConstructorReturn(this, (InvalidComponent.__proto__ || Object.getPrototypeOf(InvalidComponent)).apply(this, arguments));
  }

  _createClass(InvalidComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Invalid component exported'
      );
    }
  }]);

  return InvalidComponent;
}(_react.Component);

function canBeReactComponent(component) {
  return typeof component === 'string' || typeof component === 'function' || component && component.prototype === _react.Component;
}

function isInDefault(component) {
  return !canBeReactComponent(component) && canBeReactComponent(component.default);
}

function resolveComponent(component) {
  if (!component) return InvalidComponent;

  return isInDefault(component) ? component.default : component;
}