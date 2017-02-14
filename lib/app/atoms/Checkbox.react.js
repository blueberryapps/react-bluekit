'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          onChange = _props.onChange,
          label = _props.label,
          value = _props.value;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          { htmlFor: name, style: [styles.label, !label && styles.label.empty] },
          _react2.default.createElement(
            'div',
            { style: [styles.base, value && styles.base.checked] },
            _react2.default.createElement('div', { style: [styles.unchecked, value && styles.checked]
            })
          ),
          _react2.default.createElement('input', {
            checked: value,
            id: name,
            key: 'input',
            name: name,
            onChange: onChange,
            style: styles.input,
            type: 'checkbox'
          }),
          _react2.default.createElement(
            'div',
            { style: styles.checkboxLabel },
            label
          )
        )
      );
    }
  }]);

  return Checkbox;
}(_component2.default), _class2.propTypes = {
  label: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.bool.isRequired
}, _class2.defaultProps = {
  value: false
}, _temp)) || _class;

exports.default = Checkbox;
;

var styles = {
  label: {
    position: 'relative',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    width: 'auto',
    paddingLeft: '60px',
    empty: {
      paddingLeft: 0
    }
  },

  checkboxLabel: {
    fontWeight: 'normal',
    padding: '0 5px',
    display: 'inline-block'
  },

  input: {
    position: 'absolute',
    left: '-9999px',
    ':focus': {}
  },

  base: {
    width: '52px',
    height: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_DARKER,
    backgroundColor: colors.GRAY_DARKER,
    position: 'absolute',
    left: 0,
    top: '4px',
    transition: 'all .2s linear',
    checked: {
      backgroundColor: colors.BLUE
    }
  },

  unchecked: {
    width: '30px',
    height: '18px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_BRIGHT,
    backgroundColor: 'white',
    position: 'absolute',
    top: '-4px',
    left: '-1px',
    zIndex: 1,
    transition: 'all .2s linear'
  },

  checked: {
    left: '23px'
  }
};