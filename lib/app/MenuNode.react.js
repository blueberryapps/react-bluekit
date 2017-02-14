'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Icon = require('./atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _Nodes = require('./styles/Nodes');

var _Nodes2 = _interopRequireDefault(_Nodes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuNode = (_temp = _class = function (_Component) {
  _inherits(MenuNode, _Component);

  function MenuNode() {
    _classCallCheck(this, MenuNode);

    return _possibleConstructorReturn(this, (MenuNode.__proto__ || Object.getPrototypeOf(MenuNode)).apply(this, arguments));
  }

  _createClass(MenuNode, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          nodes = _props.nodes,
          parent = _props.parent;


      return _react2.default.createElement(
        'ul',
        {
          style: [_Nodes2.default.list, parent.length === 0 && _Nodes2.default.list.first]
        },
        Object.keys(nodes).sort().map(function (key) {
          return _this2.renderNode(key, nodes[key]);
        })
      );
    }
  }, {
    key: 'handleNodeClick',
    value: function handleNodeClick(subnodes) {
      var _props2 = this.props,
          selectAtom = _props2.selectAtom,
          toggleSidebar = _props2.toggleSidebar;


      selectAtom(subnodes);
      toggleSidebar();
    }
  }, {
    key: 'renderNode',
    value: function renderNode(node, subnodes) {
      var _this3 = this;

      var _props3 = this.props,
          parent = _props3.parent,
          selectAtom = _props3.selectAtom,
          selectedAtom = _props3.selectedAtom,
          toggleSidebar = _props3.toggleSidebar;
      var _context = this.context,
          toggleFoldersOpened = _context.toggleFoldersOpened,
          uiFoldersOpened = _context.uiFoldersOpened;

      var mergedStyles = _extends({}, _Nodes2.default.link, _Nodes2.default.sidebarLinkActive);

      if (typeof subnodes === 'string') {
        var _selected = selectedAtom === subnodes;

        return _react2.default.createElement(
          'li',
          { key: node },
          _react2.default.createElement('div', {
            dangerouslySetInnerHTML: { __html: node },
            key: node,
            onClick: function onClick() {
              return _this3.handleNodeClick(subnodes);
            },
            style: _selected ? mergedStyles : _Nodes2.default.link
          })
        );
      }

      var selected = selectedAtom && selectedAtom.indexOf(parent.concat(node).join('')) !== -1;
      var opened = !uiFoldersOpened.includes(node);

      return _react2.default.createElement(
        'li',
        { key: node },
        _react2.default.createElement(
          'div',
          {
            key: node,
            onClick: parent ? function () {
              return toggleFoldersOpened(node);
            } : null,
            style: [selected ? mergedStyles : _Nodes2.default.link]
          },
          parent && _react2.default.createElement(_Icon2.default, {
            kind: 'arrow',
            size: 8,
            style: [_Nodes2.default.icon, !opened && _Nodes2.default.icon.closed],
            wrapperStyle: _Nodes2.default.iconWrapper }),
          _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: node } })
        ),
        subnodes && opened && _react2.default.createElement(RadiumMenuNode, {
          nodes: subnodes,
          parent: parent.concat(node),
          selectAtom: selectAtom,
          selectedAtom: selectedAtom,
          toggleSidebar: toggleSidebar
        })
      );
    }
  }]);

  return MenuNode;
}(_component2.default), _class.propTypes = {
  nodes: _react.PropTypes.object.isRequired,
  parent: _react.PropTypes.array.isRequired,
  selectAtom: _react.PropTypes.func.isRequired,
  selectedAtom: _react.PropTypes.string,
  toggleSidebar: _react.PropTypes.func.isRequired
}, _class.contextTypes = {
  toggleFoldersOpened: _react.PropTypes.func,
  uiFoldersOpened: _react.PropTypes.object
}, _temp);


var RadiumMenuNode = (0, _radium2.default)(MenuNode);
exports.default = RadiumMenuNode;