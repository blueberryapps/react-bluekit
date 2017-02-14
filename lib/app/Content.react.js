'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _AllComponentsPreview = require('./AllComponentsPreview.react');

var _AllComponentsPreview2 = _interopRequireDefault(_AllComponentsPreview);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Page = require('./component/Page.react');

var _Page2 = _interopRequireDefault(_Page);

var _MediaQueries = require('./styles/MediaQueries');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'renderAtom',
    value: function renderAtom() {
      var _props = this.props,
          componentsIndex = _props.componentsIndex,
          customProps = _props.customProps,
          selectedAtom = _props.selectedAtom,
          showMobileProps = _props.showMobileProps,
          simplePropsSelected = _props.simplePropsSelected,
          sourceBackground = _props.sourceBackground,
          toggleMobileProps = _props.toggleMobileProps,
          triggeredProps = _props.triggeredProps,
          selectAtom = _props.selectAtom;


      return _react2.default.createElement(_Page2.default, {
        componentsIndex: componentsIndex,
        customProps: customProps,
        selectAtom: selectAtom,
        selectedAtom: selectedAtom,
        showMobileProps: showMobileProps,
        simplePropsSelected: simplePropsSelected,
        sourceBackground: sourceBackground,
        toggleMobileProps: toggleMobileProps,
        triggeredProps: triggeredProps
      });
    }
  }, {
    key: 'renderList',
    value: function renderList() {
      var _props2 = this.props,
          filteredComponentsIndex = _props2.filteredComponentsIndex,
          selectAtom = _props2.selectAtom,
          selectedAtom = _props2.selectedAtom;


      return _react2.default.createElement(
        'div',
        { style: [styles.list] },
        _react2.default.createElement(_AllComponentsPreview2.default, {
          componentsIndex: filteredComponentsIndex,
          selectAtom: selectAtom,
          selectedAtom: selectedAtom
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var selectedAtom = this.props.selectedAtom;


      return _react2.default.createElement(
        'div',
        { style: styles.content },
        selectedAtom ? this.renderAtom() : this.renderList()
      );
    }
  }]);

  return Content;
}(_component2.default), _class2.propTypes = {
  componentsIndex: _react.PropTypes.object.isRequired,
  customProps: _react.PropTypes.object,
  filteredComponentsIndex: _react.PropTypes.object.isRequired,
  selectAtom: _react.PropTypes.func.isRequired,
  selectedAtom: _react.PropTypes.string,
  showMobileProps: _react.PropTypes.bool,
  simplePropsSelected: _react.PropTypes.bool,
  sourceBackground: _react.PropTypes.string,
  toggleMobileProps: _react.PropTypes.func.isRequired,
  triggeredProps: _react.PropTypes.object
}, _temp)) || _class;

exports.default = Content;


var styles = {
  content: _defineProperty({
    width: '80%',
    height: '100%',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top'
  }, _MediaQueries.mediaQueries.breakpointLarge, {
    width: '100%'
  }),

  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto'
  }
};