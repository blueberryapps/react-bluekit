'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontStyle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontStyle = exports.FontStyle = (0, _radium2.default)(_class = function (_Component) {
  _inherits(FontStyle, _Component);

  function FontStyle() {
    _classCallCheck(this, FontStyle);

    return _possibleConstructorReturn(this, (FontStyle.__proto__ || Object.getPrototypeOf(FontStyle)).apply(this, arguments));
  }

  _createClass(FontStyle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_radium.Style, { rules: {
          '@font-face': {
            fontFamily: 'Source Sans Pro',
            fontStyle: 'normal',
            fontWeight: 400,
            src: "local('Source Sans Pro'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlJbPFduIYtoLzwST68uhz_Y.woff2) format('woff2')",
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
          }
        } });
    }
  }]);

  return FontStyle;
}(_react.Component)) || _class;

exports.default = {
  fontFamily: 'Source Sans Pro, sans-serif',
  fontWeight: 'normal',
  fontSize: '14px',
  textAlign: 'left',
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  size: {
    medium: {
      fontSize: '18px'
    },
    normal: {
      fontSize: '14px'
    },
    small: {
      fontSize: '12px'
    }
  }

};