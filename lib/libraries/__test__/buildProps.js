'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _buildProps = require('../buildProps');

var _buildProps2 = _interopRequireDefault(_buildProps);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('build props', function (t) {
  var props = {
    anyProp: { type: { name: 'any' }, required: false },
    nodeProp: { type: { name: 'node' }, required: false },
    stringPropDefault: { type: { name: 'string' }, required: true, defaultValue: { value: '\'text\'', computed: true } },
    stringPropDefaultFalse: { type: { name: 'string' }, required: true, defaultValue: { value: '\'text\'', computed: false } },
    stringProp: { type: { name: 'string' }, required: true },
    boolProp: { type: { name: 'bool' }, required: false },
    numberProp: { type: { name: 'number' }, required: false },
    arrayProp: { type: { name: 'array' }, required: false },
    objectProp: { type: { name: 'object' }, required: false },
    funcProp: { type: { name: 'func' }, required: false },
    enumProps: { type: { name: 'enum', value: 'asd' }, required: false },
    shapeProps: { type: { name: 'shape', value: { deepValue: 'asd', Qww: 'qwert' } }, required: false },
    arrayOfProp: { type: { name: 'arrayOf', value: { nextValue: 'asd', PPoo: 'pppp' } }, required: false }
  };

  var builtProps = (0, _buildProps2.default)(props, true);
  var arrayOfProps = [builtProps.arrayOfProp instanceof Array, _typeof(builtProps.objectProp) === 'object', builtProps.nodeProp === 'NODE nodeProp', typeof builtProps.funcProp === 'function', builtProps.numberProp === 1, builtProps.stringPropDefault === '\'text\'', builtProps.boolProp === true || false, typeof builtProps.enumProps === 'string', _typeof(builtProps.shapeProps) === 'object', builtProps.anyProp === 'ANY anyProp', builtProps.stringProp === 'stringProp', builtProps.stringPropDefaultFalse === 'text', builtProps.arrayProp instanceof Array];
  var result = arrayOfProps.reduce(function (acc, prop) {
    return acc && prop;
  }, true);

  t.true(result);
});