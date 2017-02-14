'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _sidebar;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _generateTree = require('../libraries/generateTree');

var _generateTree2 = _interopRequireDefault(_generateTree);

var _MediaQueries = require('./styles/MediaQueries');

var _MenuNode = require('./MenuNode.react');

var _MenuNode2 = _interopRequireDefault(_MenuNode);

var _NotFound = require('./atoms/NotFound.react');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchBox = require('./SearchBox.react');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _Colors = require('./styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          componentsIndex = _props.componentsIndex,
          selectAtom = _props.selectAtom,
          selectedAtom = _props.selectedAtom,
          searchAtoms = _props.searchAtoms,
          searchedText = _props.searchedText,
          showMobileSidebar = _props.showMobileSidebar,
          toggleSidebar = _props.toggleSidebar;

      var nodes = (0, _generateTree2.default)(componentsIndex).toJS();

      return _react2.default.createElement(
        'div',
        { style: [styles.sidebar, showMobileSidebar && styles.sidebar.visible] },
        _react2.default.createElement(
          'div',
          { style: styles.wrapper },
          _react2.default.createElement(_SearchBox2.default, {
            children: children,
            nodeOnClick: function nodeOnClick() {
              return selectAtom(null);
            },
            searchAtoms: searchAtoms,
            searchedText: searchedText,
            selectedAtom: selectedAtom,
            toggleSidebar: toggleSidebar
          }),
          _react2.default.createElement(
            'div',
            { style: styles.componentsTree },
            _react2.default.createElement(
              'div',
              { style: styles.nodes },
              _react2.default.createElement(_MenuNode2.default, {
                nodes: nodes,
                parent: [],
                selectAtom: selectAtom,
                selectedAtom: selectedAtom,
                toggleSidebar: toggleSidebar
              }),
              this.renderNoComponentFound(nodes)
            )
          )
        )
      );
    }
  }, {
    key: 'renderNoComponentFound',
    value: function renderNoComponentFound(nodes) {
      var searchedText = this.props.searchedText;


      if (Object.keys(nodes).length !== 0) return null;

      if (('' + searchedText).length > 0) return _react2.default.createElement(
        _NotFound2.default,
        null,
        'No components found by: ',
        _react2.default.createElement(
          'b',
          null,
          searchedText
        )
      );
      return _react2.default.createElement(
        _NotFound2.default,
        null,
        'No components'
      );
    }
  }]);

  return Sidebar;
}(_component2.default), _class2.propTypes = {
  children: _react.PropTypes.any,
  componentsIndex: _react.PropTypes.object.isRequired,
  searchAtoms: _react.PropTypes.func.isRequired,
  searchedText: _react.PropTypes.string,
  selectAtom: _react.PropTypes.func.isRequired,
  selectedAtom: _react.PropTypes.string,
  showMobileSidebar: _react.PropTypes.bool.isRequired,
  toggleSidebar: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = Sidebar;


var styles = {
  componentsTree: {
    flex: '1 1 auto',
    position: 'relative',
    overflowY: 'auto'
  },

  sidebar: (_sidebar = {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: '1px solid ' + colors.GRAY_DARKER,
    position: 'relative',
    verticalAlign: 'top',
    transition: 'left .2s ease-out'
  }, _defineProperty(_sidebar, _MediaQueries.mediaQueries.breakpointLarge, {
    position: 'absolute',
    top: 0,
    width: '250px',
    left: '-250px',
    zIndex: 10
  }), _defineProperty(_sidebar, 'visible', _defineProperty({}, _MediaQueries.mediaQueries.breakpointLarge, {
    left: 0
  })), _sidebar),

  wrapper: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  nodes: {
    padding: '10px 0'
  }
};