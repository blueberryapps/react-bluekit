'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AtomPreview = require('../app/atoms/AtomPreview.react');

var _AtomPreview2 = _interopRequireDefault(_AtomPreview);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var variantChecksum = function variantChecksum(_ref) {
  var atom = _ref.atom,
      variantProps = _ref.variantProps,
      context = _ref.context;

  var Context = contextCreator(context);
  var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
    Context,
    { context: context },
    _react2.default.createElement(_AtomPreview2.default, { atom: atom, variantProps: variantProps })
  ));
  var pureHtml = html.replace(/<([a-zA-Z]+)\s?([^>])+>/ig, '<$1>');
  var style = (html.match(/style="[^"]+"/ig) || []).toString();
  var classes = (html.match(/class="[^"]+"/ig) || []).toString();
  return JSON.stringify([pureHtml, style, classes]);
};

var contextCreator = function contextCreator(context) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(ContextProvider, _React$Component);

    function ContextProvider() {
      _classCallCheck(this, ContextProvider);

      return _possibleConstructorReturn(this, (ContextProvider.__proto__ || Object.getPrototypeOf(ContextProvider)).apply(this, arguments));
    }

    _createClass(ContextProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return context;
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);

    return ContextProvider;
  }(_react2.default.Component), _class.childContextTypes = Object.keys(context).reduce(function (out, key) {
    return _extends({}, out, _defineProperty({}, key, _react.PropTypes.any));
  }, {}), _class.propTypes = {
    children: _react.PropTypes.node
  }, _temp;
};

exports.default = variantChecksum;