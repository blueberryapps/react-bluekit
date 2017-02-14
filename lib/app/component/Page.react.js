'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _PropsSidebar = require('./PropsSidebar.react');

var _PropsSidebar2 = _interopRequireDefault(_PropsSidebar);

var _Preview = require('./Preview.react');

var _Preview2 = _interopRequireDefault(_Preview);

var _extendProps = require('../../libraries/extendProps');

var _extendProps2 = _interopRequireDefault(_extendProps);

var _extendComponentProps = require('../../libraries/extendComponentProps');

var _extendComponentProps2 = _interopRequireDefault(_extendComponentProps);

var _MediaQueries = require('../styles/MediaQueries');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _resolveComponent = require('../../libraries/resolveComponent');

var _resolveComponent2 = _interopRequireDefault(_resolveComponent);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Page, _Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  _createClass(Page, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(previousProps) {
      var selectedAtom = this.props.selectedAtom;

      if (selectedAtom !== previousProps.selectedAtom) this.scrollDetailToTop();
    }
  }, {
    key: 'scrollDetailToTop',
    value: function scrollDetailToTop() {
      var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);
      if (wrapper) wrapper.scrollTop = 0;
    }
  }, {
    key: 'getCurrentComponent',
    value: function getCurrentComponent() {
      var _props = this.props,
          selectAtom = _props.selectAtom,
          selectedAtom = _props.selectedAtom,
          componentsIndex = _props.componentsIndex;

      var atom = componentsIndex.get(selectedAtom);
      if (!atom) {
        setTimeout(function () {
          return selectAtom(null);
        }, 10);
        return null;
      }
      return componentsIndex.get(selectedAtom);
    }
  }, {
    key: 'getCurrentProps',
    value: function getCurrentProps() {
      var simplePropsSelected = this.props.simplePropsSelected;
      var _context = this.context,
          createSetAtomProp = _context.createSetAtomProp,
          setAtomProp = _context.setAtomProp;

      var atom = this.getCurrentComponent();
      var defaultProps = simplePropsSelected ? atom.get('simpleProps') : atom.get('fullProps');
      var customProps = this.props.customProps.get(atom.get('name')) || {};

      return (0, _extendProps2.default)({
        component: (0, _resolveComponent2.default)(atom.get('component')),
        createSetAtomProp: createSetAtomProp,
        customProps: customProps,
        defaultProps: defaultProps,
        propsDefinition: atom.get('propsDefinition'),
        setAtomProp: setAtomProp
      });
    }
  }, {
    key: 'getComponentExtendendProps',
    value: function getComponentExtendendProps() {
      var propsDefinition = this.getCurrentComponent().get('propsDefinition');

      return (0, _extendComponentProps2.default)(this.getCurrentProps(), propsDefinition);
    }
  }, {
    key: 'textColor',
    value: function textColor(hex) {
      var r = parseInt(hex.substr(1, 2), 16);
      var g = parseInt(hex.substr(3, 2), 16);
      var b = parseInt(hex.substr(5, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? colors.BLACK_BRIGHT : colors.GRAY_BRIGHT;
    }
  }, {
    key: 'sortProps',
    value: function sortProps(propsDefinition) {
      if (propsDefinition.size === 0) return null;else return propsDefinition.sortBy(function (_, key) {
        return key;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var atom = this.getCurrentComponent();
      var propsDefinition = atom.get('propsDefinition');
      var sortedProps = this.sortProps(propsDefinition);

      var currentProps = this.getCurrentProps();
      var extendedProps = this.getComponentExtendendProps();
      var _props2 = this.props,
          showMobileProps = _props2.showMobileProps,
          simplePropsSelected = _props2.simplePropsSelected,
          sourceBackground = _props2.sourceBackground,
          toggleMobileProps = _props2.toggleMobileProps,
          triggeredProps = _props2.triggeredProps;


      var headingColor = this.textColor(sourceBackground);

      return _react2.default.createElement(
        _radium.StyleRoot,
        null,
        _react2.default.createElement(
          'div',
          {
            style: [styles.wrapper, styles.wrapper.sidebar, showMobileProps && styles.wrapper.mobilePropsOpened]
          },
          _react2.default.createElement(_PropsSidebar2.default, {
            atom: atom,
            currentProps: currentProps,
            simplePropsSelected: simplePropsSelected,
            sortedProps: sortedProps,
            sourceBackground: sourceBackground,
            toggleMobileProps: toggleMobileProps,
            triggeredProps: triggeredProps
          })
        ),
        _react2.default.createElement(
          'div',
          {
            ref: 'wrapper',
            style: [styles.wrapper, styles.wrapper.detail, { backgroundColor: sourceBackground }]
          },
          _react2.default.createElement(_Preview2.default, {
            atom: atom,
            currentProps: currentProps,
            extendedProps: extendedProps,
            headingColor: headingColor,
            sortedProps: sortedProps
          })
        )
      );
    }
  }]);

  return Page;
}(_component2.default), _class2.propTypes = {
  componentsIndex: _react.PropTypes.object.isRequired,
  customProps: _react.PropTypes.object,
  selectAtom: _react.PropTypes.func.isRequired,
  selectedAtom: _react.PropTypes.string,
  showMobileProps: _react.PropTypes.bool,
  simplePropsSelected: _react.PropTypes.bool,
  sourceBackground: _react.PropTypes.string,
  toggleMobileProps: _react.PropTypes.func.isRequired,
  triggeredProps: _react.PropTypes.object
}, _class2.contextTypes = {
  createSetAtomProp: _react.PropTypes.func.isRequired,
  setAtomProp: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = Page;


var styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    sidebar: _defineProperty({
      width: '25%',
      left: 0
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      position: 'fixed',
      top: 'auto',
      width: '100%',
      right: 0,
      bottom: '100%',
      zIndex: 7,
      transition: 'all .2s ease-out'
    }),
    mobilePropsOpened: _defineProperty({}, _MediaQueries.mediaQueries.breakpointTablet, {
      bottom: 0,
      top: '88px'
    }),
    detail: _defineProperty({
      width: '75%',
      right: 0,
      overflow: 'auto'
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      width: '100%'
    })
  }
};