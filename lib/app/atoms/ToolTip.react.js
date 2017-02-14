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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolTip = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ToolTip, _Component);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    return _possibleConstructorReturn(this, (ToolTip.__proto__ || Object.getPrototypeOf(ToolTip)).apply(this, arguments));
  }

  _createClass(ToolTip, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          inheritedStyles = _props.inheritedStyles,
          kind = _props.kind;


      return _react2.default.createElement(
        'div',
        { style: [styles.wrapper, inheritedStyles] },
        _react2.default.createElement(
          'div',
          { style: styles.container },
          children,
          _react2.default.createElement('i', { style: [styles.arrow, styles[kind]] })
        )
      );
    }
  }]);

  return ToolTip;
}(_component2.default), _class2.propTypes = {
  children: _react.PropTypes.any.isRequired,
  inheritedStyles: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
  kind: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired
}, _class2.defaultProps = {
  kind: 'top'
}, _temp)) || _class;

exports.default = ToolTip;


var styles = {
  wrapper: _extends({}, _Font2.default, _Font2.default.size.small, {
    borderRadius: '3px',
    backgroundColor: _Colors.TOOLTIP,
    color: 'white',
    position: 'absolute',
    zIndex: 2,
    top: '-5px',
    left: 0
  }),

  container: {
    position: 'relative',
    padding: '5px'
  },

  arrow: {
    left: '50%',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderWidth: '5px',
    transition: 'all .1s ease',
    transform: 'translateX(-50%)',
    zIndex: 3
  },

  top: {
    borderTopColor: _Colors.TOOLTIP,
    top: '100%'
  },

  bottom: {
    borderBottomColor: _Colors.TOOLTIP,
    bottom: '100%'
  },

  left: {
    borderLeftColor: _Colors.TOOLTIP,
    left: '100%',
    right: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  },

  right: {
    borderRightColor: _Colors.TOOLTIP,
    right: '100%',
    left: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  }
};