'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2, _color;

var _ColorPicker = require('../atoms/ColorPicker.react');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Dropdown = require('../atoms/Dropdown.react');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Headings = require('../styles/Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _Icon = require('../atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _MediaQueries = require('../styles/MediaQueries');

var _PropsTable = require('./PropsTable.react');

var _PropsTable2 = _interopRequireDefault(_PropsTable);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Spaces = require('../styles/Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropsSidebar = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(PropsSidebar, _Component);

  function PropsSidebar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PropsSidebar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PropsSidebar.__proto__ || Object.getPrototypeOf(PropsSidebar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeProps: 'preview',
      displayColorPicker: false,
      dropdownOpened: false
    }, _this.handleDocumentClick = function (evt) {
      var area = _reactDom2.default.findDOMNode(_this.refs.colorpicker);
      var pickerButton = _reactDom2.default.findDOMNode(_this.refs.pickerButton);

      if (!area.contains(evt.target) && !pickerButton.contains(evt.target) && _this.state.displayColorPicker) {
        _this.setState({ displayColorPicker: false });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PropsSidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _context = this.context,
          toggleProps = _context.toggleProps,
          setSourceBackground = _context.setSourceBackground;
      var _props = this.props,
          atom = _props.atom,
          currentProps = _props.currentProps,
          simplePropsSelected = _props.simplePropsSelected,
          sortedProps = _props.sortedProps,
          sourceBackground = _props.sourceBackground,
          triggeredProps = _props.triggeredProps;
      var _state = this.state,
          activeProps = _state.activeProps,
          displayColorPicker = _state.displayColorPicker,
          dropdownOpened = _state.dropdownOpened;


      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(
          'div',
          { ref: 'controlsHeader', style: styles.controls.header },
          _react2.default.createElement(
            'h1',
            { style: styles.heading },
            atom.get('componentName')
          ),
          _react2.default.createElement(
            'div',
            { style: styles.dropdown },
            _react2.default.createElement(_Dropdown2.default, {
              handleIconClick: this.handleDropdownIconClick.bind(this),
              handleResetLocalStorage: this.resetLocalStorage.bind(this),
              handleResetProps: this.resetPropsToDefault.bind(this),
              handleToggleProps: toggleProps,
              simplePropsSelected: simplePropsSelected,
              visible: dropdownOpened
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.description },
            atom.get('description')
          ),
          _react2.default.createElement(
            'div',
            { style: styles.clearfix },
            _react2.default.createElement(
              'h3',
              {
                style: [styles.propName, activeProps === 'component-preview' && styles.propName.active]
              },
              _react2.default.createElement(
                'a',
                { href: '#component-preview', onClick: function onClick() {
                    return _this2.handlePropsNameClick('component-preview');
                  }, style: styles.propName.link },
                'Preview'
              )
            ),
            _react2.default.createElement(
              'div',
              { style: styles.bgWrapper },
              _react2.default.createElement(
                'div',
                { style: styles.bg },
                'Background'
              ),
              _react2.default.createElement(
                'div',
                { style: styles.bg.options },
                _react2.default.createElement(
                  'div',
                  {
                    key: 'whiteColor',
                    onClick: function onClick() {
                      return setSourceBackground('#ffffff');
                    },
                    style: styles.bg.color
                  },
                  this.renderActiveSourceBg('#ffffff')
                ),
                _react2.default.createElement(
                  'div',
                  {
                    key: 'blackColor',
                    onClick: function onClick() {
                      return setSourceBackground('#000000');
                    },
                    style: [styles.bg.color, styles.bg.color.black]
                  },
                  this.renderActiveSourceBg('#000000')
                ),
                _react2.default.createElement(_Icon2.default, {
                  key: 'interactiveColor',
                  kind: 'colorpicker',
                  onClick: this.handleColorPickerClick.bind(this),
                  ref: 'pickerButton',
                  size: 20,
                  style: [styles.bg.color, styles.bg.color.interactive]
                }),
                _react2.default.createElement(
                  'div',
                  {
                    style: [styles.colorPicker, displayColorPicker && styles.colorPicker.visible]
                  },
                  _react2.default.createElement(_ColorPicker2.default, {
                    color: sourceBackground,
                    onChangeComplete: this.handleColorPickerChange.bind(this),
                    ref: 'colorpicker',
                    visible: displayColorPicker
                  })
                )
              ),
              _react2.default.createElement('div', { style: styles.separator })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.controls.body },
          _react2.default.createElement(_PropsTable2.default, {
            activeProps: activeProps,
            atom: atom,
            commonStyles: styles,
            componentProps: currentProps,
            handlePropsNameClick: this.handlePropsNameClick.bind(this),
            sortedProps: sortedProps,
            triggeredProps: triggeredProps
          })
        )
      );
    }
  }, {
    key: 'resetLocalStorage',
    value: function resetLocalStorage() {
      var resetLocalStorage = this.context.resetLocalStorage;


      this.setState({ dropdownOpened: false });
      resetLocalStorage();
    }
  }, {
    key: 'resetPropsToDefault',
    value: function resetPropsToDefault() {
      var resetPropsToDefault = this.context.resetPropsToDefault;


      this.setState({ dropdownOpened: false });
      resetPropsToDefault();
    }
  }, {
    key: 'handleColorPickerClick',
    value: function handleColorPickerClick() {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  }, {
    key: 'handleColorPickerChange',
    value: function handleColorPickerChange(color) {
      var setSourceBackground = this.context.setSourceBackground;


      setSourceBackground(('#' + color.hex).replace(/#+/, '#'));
    }
  }, {
    key: 'handleDropdownIconClick',
    value: function handleDropdownIconClick() {
      var dropdownOpened = this.state.dropdownOpened;


      this.setState({ dropdownOpened: !dropdownOpened });
    }
  }, {
    key: 'handlePropsNameClick',
    value: function handlePropsNameClick(key) {
      var toggleMobileProps = this.context.toggleMobileProps;


      this.setState({ activeProps: key });
      toggleMobileProps();
    }
  }, {
    key: 'renderActiveSourceBg',
    value: function renderActiveSourceBg(color) {
      var sourceBackground = this.props.sourceBackground;


      return _react2.default.createElement('div', {
        style: [styles.bg.color.active, sourceBackground === color && styles.bg.color.active.visible]
      });
    }
  }]);

  return PropsSidebar;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object,
  currentProps: _react.PropTypes.object,
  simplePropsSelected: _react.PropTypes.bool,
  sortedProps: _react.PropTypes.object,
  sourceBackground: _react.PropTypes.string,
  triggeredProps: _react.PropTypes.object
}, _class2.contextTypes = {
  resetLocalStorage: _react.PropTypes.func,
  resetPropsToDefault: _react.PropTypes.func,
  setSourceBackground: _react.PropTypes.func,
  toggleMobileProps: _react.PropTypes.func,
  toggleProps: _react.PropTypes.func
}, _temp2)) || _class;

exports.default = PropsSidebar;


var styles = {
  controls: {
    header: {
      paddingTop: _Spaces2.default.normal,
      flex: '0 0 auto'
    },
    body: {
      flex: '1 1 auto',
      overflow: 'auto',
      paddingTop: '12px'
    }
  },

  colorPicker: _defineProperty({
    display: 'none',
    position: 'absolute',
    zIndex: 2,
    left: 'calc(100% - 20px)',
    top: 'calc(100% + 5px)',
    visible: {
      display: 'block'
    }
  }, _MediaQueries.mediaQueries.breakpointTablet, {
    left: 'auto',
    right: 0
  }),

  bg: _extends({}, _Font2.default, {
    float: 'left',
    width: '40%',
    paddingBottom: _Spaces2.default.normal,
    color: (_color = {
      boxSizing: 'border-box',
      display: 'inline-block',
      position: 'relative',
      width: '22px',
      height: '22px',
      marginRight: '7px',
      border: '1px solid ' + colors.GRAY_DARKER,
      backgroundColor: '#ffffff',
      ':hover': {
        cursor: 'pointer'
      }
    }, _defineProperty(_color, _MediaQueries.mediaQueries.breakpointTablet, {
      marginRight: '20px'
    }), _defineProperty(_color, 'black', {
      backgroundColor: '#000000'
    }), _defineProperty(_color, 'gray', {
      backgroundColor: '#aaaaaa'
    }), _defineProperty(_color, 'interactive', _defineProperty({
      backgroundColor: 'transparent',
      border: 0,
      marginRight: 0
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      marginRight: 0
    })), _defineProperty(_color, 'active', {
      opacity: 0,
      backgroundColor: colors.BLUE,
      height: '3px',
      position: 'absolute',
      top: 'calc(100% + 1px)',
      left: 0,
      right: 0,
      transition: 'opacity .1s linear',
      visible: {
        opacity: 1
      }
    }), _color),
    options: {
      display: 'inline-block',
      width: '60%',
      position: 'relative',
      top: '-5px',
      textAlign: 'right'
    }
  }),

  clearfix: {
    clear: 'both'
  },

  dropdown: {
    float: 'left',
    width: '25%',
    textAlign: 'right',
    paddingRight: '20px',
    boxSizing: 'border-box',
    position: 'relative'
  },

  heading: _extends({}, _Headings2.default, {
    boxSizing: 'border-box',
    color: 'black',
    float: 'left',
    padding: '0 ' + _Spaces2.default.normal,
    width: '75%',
    wordBreak: 'break-all'
  }),

  description: _extends({
    clear: 'both'
  }, _Font2.default, {
    color: colors.BLACK_BRIGHT,
    padding: _Spaces2.default.small + ' ' + _Spaces2.default.normal + ' 0',
    margin: 0,
    whiteSpace: 'pre-line'
  }),

  bgWrapper: {
    padding: _Spaces2.default.small + ' ' + _Spaces2.default.normal + ' 0 ' + _Spaces2.default.normal
  },

  propName: {
    margin: 0,
    borderLeft: '5px solid transparent',
    padding: _Spaces2.default.small + ' ' + _Spaces2.default.normal + ' ' + _Spaces2.default.small + ' 15px',
    boxSizing: 'border-box',
    link: _extends({}, _Font2.default, _Font2.default.size.normal, {
      color: colors.BLUE
    }),
    active: {
      borderLeft: '5px solid ' + colors.BLUE
    }
  },

  separator: {
    backgroundColor: colors.GRAY_DARKER,
    clear: 'both',
    height: '1px'
  },

  wrapper: {
    position: 'relative',
    backgroundColor: colors.GRAY,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  }
};