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

var _Font = require('./styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Icon = require('./atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Spaces = require('./styles/Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _Colors = require('./styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsivePropsNav = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ResponsivePropsNav, _Component);

  function ResponsivePropsNav() {
    _classCallCheck(this, ResponsivePropsNav);

    return _possibleConstructorReturn(this, (ResponsivePropsNav.__proto__ || Object.getPrototypeOf(ResponsivePropsNav)).apply(this, arguments));
  }

  _createClass(ResponsivePropsNav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          showMobileProps = _props.showMobileProps,
          toggleMobileProps = _props.toggleMobileProps;


      return _react2.default.createElement(
        'div',
        { onClick: toggleMobileProps.bind(this), style: styles.wrapper },
        _react2.default.createElement(
          'strong',
          { style: styles.text },
          'Props and Navigation'
        ),
        _react2.default.createElement(_Icon2.default, {
          color: colors.BLUE,
          kind: 'arrow',
          size: 12,
          style: [styles.icon, showMobileProps && styles.icon.opened]
        })
      );
    }
  }]);

  return ResponsivePropsNav;
}(_component2.default), _class2.propTypes = {
  showMobileProps: _react.PropTypes.bool,
  toggleMobileProps: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = ResponsivePropsNav;


var styles = {
  wrapper: {
    position: 'relative',
    zIndex: 8,
    backgroundColor: colors.GRAY,
    padding: '6px 50px 6px ' + _Spaces2.default.normal,
    borderBottom: '1px solid ' + colors.GRAY_DARKER,
    ':hover': {
      cursor: 'pointer'
    }
  },

  icon: {
    position: 'absolute',
    top: '50%',
    right: _Spaces2.default.normal,
    transform: 'translateY(-50%)',
    transition: 'translate .1s ease-in',
    opened: {
      transform: 'translateY(-50%) rotate(180deg)'
    }
  },

  text: _extends({}, _Font2.default, _Font2.default.bold, {
    fontSize: '16px',
    display: 'inline-block',
    padding: '6px 0'
  })
};