'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Font = require('./Font');

var _Font2 = _interopRequireDefault(_Font);

var _Colors = require('./Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _Font2.default, _Font2.default.size.medium, {
  color: colors.BLACK_BRIGHT,
  marginTop: 0,
  marginBottom: 0,
  lineHeight: '1.4',
  preview: {
    paddingBottom: '15px'
  },

  allComponents: {
    display: 'inline',
    borderBottom: '1px solid ' + colors.BLACK_BRIGHT,
    ':hover': {
      cursor: 'pointer'
    }
  }
});