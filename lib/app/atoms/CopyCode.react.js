'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Icon = require('../atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ToolTip = require('../atoms/ToolTip.react');

var _ToolTip2 = _interopRequireDefault(_ToolTip);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopyCode = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(CopyCode, _Component);

  function CopyCode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CopyCode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CopyCode.__proto__ || Object.getPrototypeOf(CopyCode)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      copied: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CopyCode, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          inheritedStyles = _props.inheritedStyles,
          source = _props.source;
      var copied = this.state.copied;


      return _react2.default.createElement(
        _reactCopyToClipboard2.default,
        { onCopy: this.onCopy.bind(this), text: source },
        _react2.default.createElement(
          'div',
          { style: [styles.copyCode.innerWrapper, inheritedStyles] },
          copied && _react2.default.createElement(
            _ToolTip2.default,
            { inheritedStyles: styles.tooltip, kind: 'top' },
            'Copied'
          ),
          _react2.default.createElement(
            'div',
            { style: [styles.copyCode.inner, copied && styles.copyCode.copied] },
            _react2.default.createElement(_Icon2.default, {
              color: colors.BLUE,
              kind: 'copy',
              size: 20
            })
          )
        )
      );
    }
  }, {
    key: 'onCopy',
    value: function onCopy() {
      var _this2 = this;

      this.setState({ copied: true });
      setTimeout(function () {
        return _this2.setState({ copied: false });
      }, 3000);
    }
  }]);

  return CopyCode;
}(_component2.default), _class2.propTypes = {
  inheritedStyles: _react.PropTypes.object,
  source: _react.PropTypes.string.isRequired
}, _temp2)) || _class;

exports.default = CopyCode;


var styles = {
  copyCode: {
    innerWrapper: {
      backgroundColor: 'white',
      position: 'absolute',
      padding: '10px',
      top: '1px',
      right: '1px',
      zIndex: 2
    },
    inner: _extends({}, _Font2.default, _Font2.default.bold, {
      color: colors.BLUE,
      textTransform: 'uppercase',
      paddingLeft: '15px',
      borderLeft: '1px solid ' + colors.GRAY_DARKER,
      ':hover': {
        cursor: 'pointer'
      }
    }),
    copied: {
      opacity: '.3',
      ':hover': {
        cursor: 'default'
      }
    }
  },

  tooltip: {
    top: '-24px',
    right: '-24px',
    left: 'auto',
    transform: 'translateX(-50%)'
  }
};