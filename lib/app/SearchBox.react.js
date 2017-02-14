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

var _Input = require('./atoms/Input.react');

var _Input2 = _interopRequireDefault(_Input);

var _Logo = require('./atoms/Logo.react');

var _Logo2 = _interopRequireDefault(_Logo);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Spaces = require('./styles/Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _Nodes = require('./styles/Nodes');

var _Nodes2 = _interopRequireDefault(_Nodes);

var _MediaQueries = require('./styles/MediaQueries');

var _Colors = require('./styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(SearchBox, _Component);

  function SearchBox() {
    _classCallCheck(this, SearchBox);

    return _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).apply(this, arguments));
  }

  _createClass(SearchBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          searchAtoms = _props.searchAtoms,
          selectedAtom = _props.selectedAtom,
          searchedText = _props.searchedText,
          toggleSidebar = _props.toggleSidebar;


      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(_Logo2.default, null),
        _react2.default.createElement(
          _reactResponsive2.default,
          { maxWidth: _MediaQueries.breakPoints.large },
          _react2.default.createElement(_Icon2.default, {
            color: colors.GRAY_BRIGHT,
            kind: 'chevron-left',
            onClick: toggleSidebar.bind(this),
            size: 14,
            style: styles.closeSidebar
          })
        ),
        children && _react2.default.createElement(
          'div',
          { style: styles.children },
          children
        ),
        _react2.default.createElement(
          'div',
          { style: styles.search.group },
          _react2.default.createElement(_Input2.default, {
            inheritedStyles: styles.search.input,
            kind: 'inputSearch',
            onChange: function onChange(_ref) {
              var value = _ref.target.value;
              return searchAtoms(value);
            },
            placeholder: 'Search for components',
            ref: 'searchbox',
            type: 'text',
            value: searchedText
          }),
          this.renderSearchIcon()
        ),
        _react2.default.createElement(
          'div',
          {
            onClick: this.handleClick.bind(this),
            style: [styles.all, _Nodes2.default.link, _Nodes2.default.link.overview, !selectedAtom && _Nodes2.default.sidebarLinkActive]
          },
          _react2.default.createElement(_Icon2.default, {
            color: colors.BLUE,
            kind: 'overview',
            size: 14,
            style: styles.overviewIcon
          }),
          'All components'
        )
      );
    }
  }, {
    key: 'clearText',
    value: function clearText() {
      var searchAtoms = this.props.searchAtoms;


      searchAtoms('');
      _reactDom2.default.findDOMNode(this.refs.searchbox).focus();
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var _props2 = this.props,
          nodeOnClick = _props2.nodeOnClick,
          toggleSidebar = _props2.toggleSidebar;


      nodeOnClick(null);
      toggleSidebar();
    }
  }, {
    key: 'renderSearchIcon',
    value: function renderSearchIcon() {
      var _this2 = this;

      var searchedText = this.props.searchedText;


      if (searchedText) return _react2.default.createElement(_Icon2.default, {
        color: colors.BLUE,
        kind: 'close',
        onClick: function onClick() {
          return _this2.clearText('');
        },
        size: 18,
        wrapperStyle: [styles.search.icon, styles.search.clear]
      });

      return _react2.default.createElement(_Icon2.default, {
        color: colors.BLUE,
        kind: 'search',
        size: 18,
        wrapperStyle: styles.search.icon
      });
    }
  }]);

  return SearchBox;
}(_component2.default), _class2.propTypes = {
  children: _react.PropTypes.any,
  nodeOnClick: _react.PropTypes.func.isRequired,
  searchAtoms: _react.PropTypes.func.isRequired,
  searchedText: _react.PropTypes.string,
  selectedAtom: _react.PropTypes.string,
  toggleSidebar: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = SearchBox;


var styles = {
  all: {
    marginTop: _Spaces2.default.small
  },

  overviewIcon: {
    position: 'absolute',
    left: '8px',
    top: '10px'
  },

  search: {
    clear: {
      ':hover': {
        cursor: 'pointer'
      }
    },
    group: {
      paddingTop: '8px',
      position: 'relative'
    },
    input: {
      padding: '10px 35px 10px 10px'
    },
    icon: {
      position: 'absolute',
      top: '19px',
      right: '10px'
    }
  },

  wrapper: {
    flex: '0 0 auto',
    padding: _Spaces2.default.normal,
    borderBottom: '1px solid ' + colors.GRAY_DARKER,
    position: 'relative'
  },

  logo: {
    maxWidth: '120px'
  },

  closeSidebar: {
    position: 'absolute',
    top: '30px',
    right: '18px',
    ':hover': {
      cursor: 'pointer'
    }
  },

  children: _extends({}, _Font2.default, {
    marginTop: '8px'
  })
};