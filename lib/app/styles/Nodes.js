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

exports.default = {
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 15px',
    first: {
      padding: 0
    }
  },

  link: _extends({}, _Font2.default, {
    padding: '8px 18px',
    fontSize: '13px',
    color: colors.BLACK_BRIGHT,
    display: 'block',
    textDecoration: 'none',
    transition: 'all .1s ease-out',
    position: 'relative',
    ':hover': {
      backgroundColor: colors.GRAY_DARKER,
      cursor: 'pointer'
    },
    overview: {
      padding: '10px 20px 10px 30px'
    }
  }),

  iconWrapper: {
    marginRight: '8px',
    display: 'inline-block',
    position: 'relative',
    top: '-1px'
  },

  icon: {
    transition: 'transform .1s linear',
    closed: {
      transform: 'rotate(-90deg)'
    }
  },

  sidebarLinkActive: {
    backgroundColor: colors.GRAY
  }
};