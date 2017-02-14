'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _panel;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Font = require('./Font');

var _Font2 = _interopRequireDefault(_Font);

var _Headings = require('./Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _MediaQueries = require('./MediaQueries');

var _Spaces = require('./Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _Colors = require('./Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  atomWrapper: {
    position: 'relative',
    clear: 'both'
  },

  wrapper: _defineProperty({
    padding: '30px'
  }, _MediaQueries.mediaQueries.breakpointTablet, {
    padding: '12px ' + _Spaces2.default.normal
  }),

  heading: _extends({}, _Headings2.default),

  panel: (_panel = {
    paddingTop: '50px',
    marginBottom: '50px',
    borderTop: '1px solid ' + colors.GRAY_DARKER,
    position: 'relative',
    clear: 'both',
    display: 'table',
    width: '100%'
  }, _defineProperty(_panel, _MediaQueries.mediaQueries.breakpointTablet, {
    paddingTop: '15px',
    marginBottom: '15px',
    display: 'inline-block'
  }), _defineProperty(_panel, 'first', {
    paddingTop: 0,
    borderTop: 0,
    marginBottom: 0
  }), _defineProperty(_panel, 'source', {
    paddingBottom: '80px'
  }), _panel),

  pre: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
    position: 'relative'

  },

  noVariants: _extends({}, _Font2.default),

  clear: {
    display: 'block',
    after: {
      clear: 'both'
    }
  }
};