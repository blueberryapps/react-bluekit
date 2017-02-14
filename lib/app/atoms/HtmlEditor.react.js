'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _AceEditor = require('./AceEditor.react');

var _AceEditor2 = _interopRequireDefault(_AceEditor);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HtmlEditor = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(HtmlEditor, _Component);

  function HtmlEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HtmlEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HtmlEditor.__proto__ || Object.getPrototypeOf(HtmlEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.value
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HtmlEditor, [{
    key: 'render',
    value: function render() {
      var name = this.props.name;
      var value = this.state.value;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AceEditor2.default, {
          editorProps: { $blockScrolling: true },
          fontSize: 11,
          height: 'auto',
          highlightActiveLine: false,
          maxLines: this.numberOfRows() + 1,
          minLines: this.numberOfRows(),
          mode: 'html',
          name: name + '-html-editor',
          onChange: this.onChange.bind(this),
          setOptions: {
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
          },
          showGutter: true,
          tabSize: 2,
          theme: 'chrome',
          value: value,
          width: '100%'
        })
      );
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      var onChange = this.props.onChange;


      this.setState({ error: null, value: value });
      onChange({ value: value }); // eslint-disable-line no-eval
    }
  }, {
    key: 'numberOfRows',
    value: function numberOfRows() {
      var value = this.state.value;


      return ('' + value).split(/\n/g).length;
    }
  }]);

  return HtmlEditor;
}(_component2.default), _class2.propTypes = {
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.any
}, _temp2)) || _class;

exports.default = HtmlEditor;
;