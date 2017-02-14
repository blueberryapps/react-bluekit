'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _Colors = require('../styles/Colors');

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Icon = require('./Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Error = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Error, _Component);

  function Error() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Error);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Error.__proto__ || Object.getPrototypeOf(Error)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      stackShowed: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Error, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var error = this.props.error;
      var stackShowed = this.state.stackShowed;


      if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) !== 'object') return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(_Icon2.default, { color: styles.icon.color, kind: 'error', size: 16, style: styles.icon }),
        error
      );

      return _react2.default.createElement(
        'div',
        {
          onClick: function onClick() {
            return _this2.setState({ stackShowed: !stackShowed });
          },
          style: styles.wrapper
        },
        _react2.default.createElement(_Icon2.default, { color: styles.icon.color, kind: 'error', size: 16, style: styles.icon }),
        _react2.default.createElement(_Icon2.default, {
          color: _Colors.BLACK_BRIGHT,
          kind: 'arrow',
          size: 10,
          style: [styles.arrowIcon, !stackShowed && styles.arrowIcon.closed],
          wrapperStyle: styles.arrowIconWrapper
        }),
        error.message,
        error.stack && !stackShowed && '...',
        error.stack && stackShowed && _react2.default.createElement(
          'pre',
          { style: styles.code },
          _react2.default.createElement(
            'code',
            null,
            error.stack
          )
        )
      );
    }
  }]);

  return Error;
}(_component2.default), _class2.propTypes = {
  error: _react.PropTypes.any
}, _temp2)) || _class;

exports.default = Error;
;

var styles = {
  wrapper: {
    color: 'red',
    cursor: 'pointer',
    backgroundColor: 'rgba(255,0,0,.1)',
    padding: '3px',
    border: '1px solid rgba(255,0,0,.3)',
    overflow: 'auto'
  },

  arrowIconWrapper: {
    marginRight: '5px',
    display: 'inline-block'
  },

  arrowIcon: {
    transition: 'transform .1s linear',
    closed: {
      transform: 'rotate(-90deg)'
    }
  },

  icon: {
    color: 'red',
    paddingRight: '5px',
    position: 'relative',
    top: '2px'
  },

  code: {
    padding: '0 3px',
    marginBottom: '8px'
  }
};