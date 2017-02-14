'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          inheritedStyles = _props.inheritedStyles,
          kind = _props.kind,
          onChange = _props.onChange,
          placeholder = _props.placeholder,
          type = _props.type,
          value = _props.value;


      return _react2.default.createElement('input', {
        onChange: onChange,
        placeholder: placeholder,
        style: [styles.base, styles[kind], inheritedStyles],
        type: type,
        value: value
      });
    }
  }]);

  return Input;
}(_component2.default), _class2.propTypes = {
  inheritedStyles: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
  kind: _react.PropTypes.oneOf(['inputDefault', 'inputSearch']),
  onChange: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
}, _class2.defaultProps = {
  inheritedStyle: {},
  kind: 'inputDefault',
  value: 'Default value'
}, _temp)) || _class;

exports.default = Input;
;

var styles = {
  base: {
    width: '100%',
    height: '30px',
    outline: 'none',
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_DARKER,
    padding: '3px 5px',
    ':focus': {
      borderColor: colors.BLUE_LIGHT
    }
  },

  inputDefault: {
    backgroundColor: 'white'
  },

  inputSearch: _extends({}, _Font2.default, {
    fontSize: '13px',
    padding: '10px',
    height: '40px',
    backgroundColor: colors.GRAY
  })
};