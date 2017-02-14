'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2, _arrow;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Icon = require('./Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _MediaQueries = require('../styles/MediaQueries');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.handleDocumentClick = function (evt) {
      var area = _reactDom2.default.findDOMNode(_this.refs.dropdown);

      if (!area.contains(evt.target) && _this.props.visible && _this.props.handleIconClick) {
        _this.props.handleIconClick();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }

    /* using fat arrow to bind to instance */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          handleIconClick = _props.handleIconClick,
          handleResetLocalStorage = _props.handleResetLocalStorage,
          handleResetProps = _props.handleResetProps,
          handleToggleProps = _props.handleToggleProps,
          simplePropsSelected = _props.simplePropsSelected,
          visible = _props.visible;

      var hovered = _radium2.default.getState(this.state, 'dropdown-option1', ':hover');

      return _react2.default.createElement(
        'div',
        { ref: 'dropdown', style: styles.wrapper },
        _react2.default.createElement(
          'i',
          {
            onClick: handleIconClick,
            style: styles.iconWrapper
          },
          _react2.default.createElement(_Icon2.default, { color: colors.BLUE, kind: 'settings', size: 21 })
        ),
        _react2.default.createElement(
          'div',
          {
            style: [styles.dropdownWrapper, visible && styles.dropdownWrapper.visible]
          },
          _react2.default.createElement(
            'ul',
            { style: styles.list },
            _react2.default.createElement(
              'li',
              {
                key: 'dropdown-option1',
                onClick: handleToggleProps,
                style: [styles.list.option, _Font2.default]
              },
              simplePropsSelected ? 'Preset all props' : 'Preset only required props'
            ),
            _react2.default.createElement(
              'li',
              {
                key: 'dropdown-option2',
                onClick: handleResetProps,
                style: [styles.list.option, _Font2.default]
              },
              'Reset props to default'
            ),
            _react2.default.createElement(
              'li',
              {
                key: 'dropdown-option3',
                onClick: handleResetLocalStorage,
                style: [styles.list.option, _Font2.default]
              },
              'Reset local storage'
            )
          ),
          _react2.default.createElement('i', { style: [styles.arrow, hovered && styles.arrow.hovered] }),
          _react2.default.createElement('i', { style: styles.arrow.bordered })
        )
      );
    }
  }]);

  return Dropdown;
}(_component2.default), _class2.propTypes = {
  handleIconClick: _react.PropTypes.func,
  handleResetLocalStorage: _react.PropTypes.func,
  handleResetProps: _react.PropTypes.func,
  handleToggleProps: _react.PropTypes.func,
  simplePropsSelected: _react.PropTypes.bool,
  visible: _react.PropTypes.bool.isRequired
}, _class2.defaultProps = {
  visible: false
}, _temp2)) || _class;

exports.default = Dropdown;


var styles = {
  wrapper: {
    position: 'relative',
    textAlign: 'right'
  },

  dropdownWrapper: _defineProperty({
    backgroundColor: 'white',
    width: '200px',
    border: '1px solid ' + colors.GRAY_DARKER,
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 'calc(100% + -25px)',
    boxSizing: 'border-box',
    display: 'none',
    textAlign: 'left',
    zIndex: 10,
    visible: {
      display: 'block'
    }
  }, _MediaQueries.mediaQueries.breakpointTablet, {
    left: 'auto',
    right: 0
  }),

  iconWrapper: {
    ':hover': {
      cursor: 'pointer'
    }
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    option: {
      color: colors.BLACK_BRIGHT,
      padding: '8px 8px 8px 32px',
      transition: 'all .1s ease',
      ':hover': {
        backgroundColor: colors.BLUE,
        color: 'white',
        cursor: 'pointer'
      }
    }
  },

  arrow: (_arrow = {
    bottom: '100%',
    left: '13px',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: 'white',
    borderWidth: '6px',
    transform: 'translateX(-50%)',
    transition: 'all .1s ease',
    zIndex: 3,
    hovered: {
      borderBottomColor: colors.BLUE
    }
  }, _defineProperty(_arrow, _MediaQueries.mediaQueries.breakpointTablet, {
    right: '-2px',
    left: 'auto'
  }), _defineProperty(_arrow, 'bordered', _defineProperty({
    bottom: '100%',
    left: '6px',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: colors.GRAY_DARKER,
    borderWidth: '7px',
    zIndex: 2
  }, _MediaQueries.mediaQueries.breakpointTablet, {
    right: '3px',
    left: 'auto'
  })), _arrow)
};