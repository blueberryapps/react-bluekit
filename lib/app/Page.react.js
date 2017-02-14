'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

require('../libraries/BluekitEvent');

var _Content = require('./Content.react');

var _Content2 = _interopRequireDefault(_Content);

var _FontBold = require('./styles/FontBold');

var _FontBold2 = _interopRequireDefault(_FontBold);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ResponsiveNav = require('./ResponsiveNav.react');

var _ResponsiveNav2 = _interopRequireDefault(_ResponsiveNav);

var _ResponsivePropsNav = require('./ResponsivePropsNav.react');

var _ResponsivePropsNav2 = _interopRequireDefault(_ResponsivePropsNav);

var _Sidebar = require('./Sidebar.react');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _StateProvider = require('./StateProvider.react');

var _StateProvider2 = _interopRequireDefault(_StateProvider);

var _Font = require('./styles/Font');

var _MediaQueries = require('./styles/MediaQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof window !== 'undefined') {
  require('brace');
  require('brace/ext/language_tools');
  require('brace/mode/jsx');
  require('brace/mode/html');
  require('brace/mode/javascript');
  require('brace/theme/chrome');
}

var Page = (0, _StateProvider2.default)(_class = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Page, _Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  _createClass(Page, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          componentsIndex = _props.componentsIndex,
          customProps = _props.customProps,
          simplePropsSelected = _props.simplePropsSelected,
          filteredComponentsIndex = _props.filteredComponentsIndex,
          sourceBackground = _props.sourceBackground,
          height = _props.height,
          inline = _props.inline,
          showMobileSidebar = _props.showMobileSidebar,
          showMobileProps = _props.showMobileProps,
          searchedText = _props.searchedText,
          triggeredProps = _props.triggeredProps;
      var selectedAtom = this.props.selectedAtom;
      var _context = this.context,
          selectAtom = _context.selectAtom,
          searchAtoms = _context.searchAtoms,
          toggleMobileProps = _context.toggleMobileProps,
          toggleSidebar = _context.toggleSidebar;

      selectedAtom = componentsIndex.get(selectedAtom) ? selectedAtom : null;
      var allComponentsPreview = selectedAtom === null;

      return _react2.default.createElement(
        _radium.StyleRoot,
        null,
        _react2.default.createElement(
          'div',
          { style: [styles.wrapper.base, inline ? { height: height } : styles.wrapper.full] },
          _react2.default.createElement(
            _reactResponsive2.default,
            { maxWidth: _MediaQueries.breakPoints.large },
            _react2.default.createElement(_ResponsiveNav2.default, {
              allComponentsPreview: allComponentsPreview,
              componentsIndex: componentsIndex,
              selectAtom: selectAtom,
              selectedAtom: selectedAtom,
              toggleSidebar: toggleSidebar
            }),
            _react2.default.createElement('div', {
              onClick: toggleSidebar,
              style: [styles.overlay, showMobileSidebar && styles.overlay.active]
            })
          ),
          _react2.default.createElement(
            _reactResponsive2.default,
            { maxWidth: _MediaQueries.breakPoints.tablet },
            !allComponentsPreview && _react2.default.createElement(_ResponsivePropsNav2.default, {
              showMobileProps: showMobileProps,
              toggleMobileProps: toggleMobileProps
            })
          ),
          _react2.default.createElement(_Sidebar2.default, {
            children: children,
            componentsIndex: filteredComponentsIndex,
            searchAtoms: searchAtoms,
            searchedText: searchedText,
            selectAtom: selectAtom,
            selectedAtom: selectedAtom,
            showMobileSidebar: showMobileSidebar,
            toggleSidebar: toggleSidebar
          }),
          _react2.default.createElement(_Content2.default, {
            componentsIndex: componentsIndex,
            customProps: customProps,
            filteredComponentsIndex: filteredComponentsIndex,
            selectAtom: selectAtom,
            selectedAtom: selectedAtom,
            showMobileProps: showMobileProps,
            simplePropsSelected: simplePropsSelected,
            sourceBackground: sourceBackground,
            toggleMobileProps: toggleMobileProps,
            triggeredProps: triggeredProps
          })
        ),
        _react2.default.createElement(_Font.FontStyle, null),
        _react2.default.createElement(_FontBold2.default, null)
      );
    }
  }]);

  return Page;
}(_react.Component), _class2.propTypes = {
  children: _react.PropTypes.any,
  componentsIndex: _react.PropTypes.object.isRequired,
  customProps: _react.PropTypes.object,
  filteredComponentsIndex: _react.PropTypes.object.isRequired,
  height: _react.PropTypes.string,
  inline: _react.PropTypes.bool,
  mountPoint: _react.PropTypes.string,
  searchedText: _react.PropTypes.string,
  selectedAtom: _react.PropTypes.string,
  showMobileProps: _react.PropTypes.bool,
  showMobileSidebar: _react.PropTypes.bool,
  simplePropsSelected: _react.PropTypes.bool,
  sourceBackground: _react.PropTypes.string,
  triggeredProps: _react.PropTypes.object
}, _class2.contextTypes = {
  resetLocalStorage: _react.PropTypes.func.isRequired,
  resetPropsToDefault: _react.PropTypes.func.isRequired,
  selectAtom: _react.PropTypes.func.isRequired,
  searchAtoms: _react.PropTypes.func.isRequired,
  toggleProps: _react.PropTypes.func.isRequired,
  toggleMobileProps: _react.PropTypes.func.isRequired,
  toggleSidebar: _react.PropTypes.func.isRequired
}, _class2.defaultProps = {
  height: '500px',
  inline: false
}, _temp)) || _class) || _class;

exports.default = Page;


var styles = {
  wrapper: {
    base: {
      background: 'white',
      width: '100%'
    },
    full: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: '100%',
    bottom: 0,
    zIndex: 9,
    opacity: 0,
    transition: 'opacity .2s ease-out',
    active: {
      right: 0,
      opacity: 1
    }
  }
};