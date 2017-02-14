'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _reactColor = require('react-color');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = (_temp = _class = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker() {
    _classCallCheck(this, ColorPicker);

    return _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).apply(this, arguments));
  }

  _createClass(ColorPicker, [{
    key: 'render',
    value: function render() {
      var onChangeComplete = this.props.onChangeComplete;


      return _react2.default.createElement(_reactColor.CompactPicker, {
        color: this.props.color,
        onChangeComplete: onChangeComplete
      });
    }
  }]);

  return ColorPicker;
}(_react.Component), _class.propTypes = {
  color: _react.PropTypes.string,
  onChangeComplete: _react.PropTypes.func,
  visible: _react.PropTypes.bool.isRequired
}, _temp);
exports.default = ColorPicker;