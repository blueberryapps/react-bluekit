'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _AtomPreview = require('../atoms/AtomPreview.react');

var _AtomPreview2 = _interopRequireDefault(_AtomPreview);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Headings = require('../styles/Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _MediaQueries = require('../styles/MediaQueries');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SourceCode = require('./SourceCode.react');

var _SourceCode2 = _interopRequireDefault(_SourceCode);

var _Sources = require('../styles/Sources');

var _Sources2 = _interopRequireDefault(_Sources);

var _Variants = require('./Variants.react');

var _Variants2 = _interopRequireDefault(_Variants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          atom = _props.atom,
          currentProps = _props.currentProps,
          headingColor = _props.headingColor,
          sortedProps = _props.sortedProps;


      return _react2.default.createElement(
        'div',
        { style: _Sources2.default.wrapper },
        _react2.default.createElement(
          'div',
          { style: [_Sources2.default.panel, _Sources2.default.panel.first, componentStyles.panelFirst] },
          _react2.default.createElement(
            'h2',
            {
              id: 'component-preview',
              style: [_Headings2.default, _Headings2.default.preview, componentStyles.heading, { color: headingColor }]
            },
            'Preview'
          ),
          _react2.default.createElement(
            'div',
            { style: _Sources2.default.atomWrapper },
            _react2.default.createElement(_AtomPreview2.default, { atom: atom, variantProps: currentProps })
          ),
          _react2.default.createElement(_SourceCode2.default, { atom: atom, componentProps: currentProps, name: atom.get('name') + '-preview', showToggle: true })
        ),
        _react2.default.createElement(_Variants2.default, {
          atom: atom,
          componentProps: currentProps,
          headingColor: headingColor,
          sortedProps: sortedProps,
          styles: _Sources2.default
        })
      );
    }
  }]);

  return Preview;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object,
  currentProps: _react.PropTypes.object,
  headingColor: _react.PropTypes.string.isRequired,
  sortedProps: _react.PropTypes.object
}, _temp)) || _class;

exports.default = Preview;


var componentStyles = {
  heading: _defineProperty({}, _MediaQueries.mediaQueries.breakpointTablet, {
    marginBottom: 0
  }),

  panelFirst: _defineProperty({}, _MediaQueries.mediaQueries.breakpointTablet, {
    paddingTop: 0
  })
};