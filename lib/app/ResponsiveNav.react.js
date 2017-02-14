'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _MediaQueries = require('./styles/MediaQueries');

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Font = require('./styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Icon = require('./atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveNav = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ResponsiveNav, _Component);

  function ResponsiveNav() {
    _classCallCheck(this, ResponsiveNav);

    return _possibleConstructorReturn(this, (ResponsiveNav.__proto__ || Object.getPrototypeOf(ResponsiveNav)).apply(this, arguments));
  }

  _createClass(ResponsiveNav, [{
    key: 'renderPath',
    value: function renderPath(pathName, index) {
      return _react2.default.createElement(
        'span',
        { key: pathName },
        index > 0 && _react2.default.createElement(_Icon2.default, {
          color: colors.GRAY_BRIGHT,
          kind: 'chevron-right',
          size: 12,
          style: styles.separator
        }),
        pathName
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          allComponentsPreview = _props.allComponentsPreview,
          componentsIndex = _props.componentsIndex,
          selectedAtom = _props.selectedAtom,
          toggleSidebar = _props.toggleSidebar;

      var selectedComponentIndex = componentsIndex.get(selectedAtom);
      var path = allComponentsPreview ? ['', 'All components'] : selectedComponentIndex.get('menu').split(/\s/);
      var componentName = path[path.length - 1];

      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(_Icon2.default, {
          color: colors.GRAY_BRIGHT,
          kind: 'menu',
          onClick: toggleSidebar.bind(this),
          size: 22,
          style: styles.button
        }),
        _react2.default.createElement(
          'div',
          { style: styles.text },
          _react2.default.createElement(
            _reactResponsive2.default,
            { minWidth: _MediaQueries.breakPoints.tablet + 1 },
            path.map(function (pathName, index) {
              return _this2.renderPath(pathName, index);
            })
          ),
          _react2.default.createElement(
            _reactResponsive2.default,
            { maxWidth: _MediaQueries.breakPoints.tablet },
            componentName
          )
        )
      );
    }
  }]);

  return ResponsiveNav;
}(_component2.default), _class2.propTypes = {
  allComponentsPreview: _react.PropTypes.bool.isRequired,
  componentsIndex: _react.PropTypes.object.isRequired,
  selectAtom: _react.PropTypes.func.isRequired,
  selectedAtom: _react.PropTypes.string,
  toggleSidebar: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = ResponsiveNav;


var styles = {
  wrapper: {
    position: 'relative',
    zIndex: 9,
    backgroundColor: 'white',
    padding: '6px ' + _Spaces2.default.normal + ' 6px 50px',
    borderBottom: '1px solid ' + colors.GRAY_DARKER
  },

  button: {
    padding: '5px',
    position: 'absolute',
    left: 'calc(' + _Spaces2.default.normal + ' - 5px)',
    top: '50%',
    transform: 'translateY(-50%)',
    ':hover': {
      cursor: 'pointer'
    }
  },

  text: _extends({}, _Font2.default, _defineProperty({
    display: 'inline-block',
    padding: '8px'
  }, _MediaQueries.mediaQueries.breakpointTablet, _extends({}, _Font2.default.size.medium, {
    padding: '5px 8px 6px'
  }))),

  separator: {
    position: 'relative',
    top: '1px',
    padding: '0 3px'
  }
};