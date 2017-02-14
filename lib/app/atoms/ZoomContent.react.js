'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZoomContent = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(ZoomContent, _Component);

  function ZoomContent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ZoomContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ZoomContent.__proto__ || Object.getPrototypeOf(ZoomContent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      zoom: 1.0,
      contentWidth: null,
      calculateZoomTimeout: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ZoomContent, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var calculateZoomTimeout = this.state.calculateZoomTimeout;

      clearTimeout(calculateZoomTimeout);

      window.removeEventListener('resize', this.calculateZoomAsyncBounded);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateZoomAsyncBounded = this.calculateZoomAsync.bind(this);
      window.addEventListener('resize', this.calculateZoomAsyncBounded);
      this.calculateZoomAsync();
    }
  }, {
    key: 'calculateZoomAsync',
    value: function calculateZoomAsync() {
      var _this2 = this;

      var calculateZoomTimeout = this.state.calculateZoomTimeout;

      if (calculateZoomTimeout) clearTimeout(calculateZoomTimeout);

      this.setState({
        calculateZoomTimeout: setTimeout(function () {
          return _this2.calculateZoom();
        }, 500)
      });
    }
  }, {
    key: 'calculateZoom',
    value: function calculateZoom() {
      var contentWidth = this.state.contentWidth;

      var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);
      var content = _reactDom2.default.findDOMNode(this.refs.content);
      if (!wrapper || !content) return;

      var wrapperWidth = wrapper.offsetWidth;
      var actualContentWidth = contentWidth || content.offsetWidth;

      if (wrapperWidth < actualContentWidth) this.setState({
        zoom: wrapperWidth / actualContentWidth,
        contentWidth: actualContentWidth
      });else this.setState({
        zoom: 1.0,
        contentWidth: actualContentWidth
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var zoom = this.state.zoom;


      return _react2.default.createElement(
        'div',
        { ref: 'wrapper', style: [styles.wrapper, zoom !== 1.0 && { zoom: zoom }] },
        zoom !== 1.0 && _react2.default.createElement(
          'span',
          { style: styles.zoom },
          Math.round(zoom * 100),
          '%'
        ),
        _react2.default.createElement(
          'div',
          { ref: 'content', style: styles.content },
          children
        )
      );
    }
  }]);

  return ZoomContent;
}(_component2.default), _class2.propTypes = {
  children: _react.PropTypes.node
}, _temp2)) || _class;

exports.default = ZoomContent;


var styles = {
  content: {
    position: 'relative',
    display: 'inline-block'
  },

  wrapper: {
    position: 'relative',
    width: '100%'
  },

  zoom: _extends({}, _Font2.default, {
    position: 'absolute',
    right: 0,
    top: '-22px',
    zIndex: 500,
    backgroundColor: colors.GRAY,
    padding: '2px 3px 2px 6px',
    opacity: 0.7
  })
};