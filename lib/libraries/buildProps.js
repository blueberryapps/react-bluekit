'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildProps;

var _immutable = require('immutable');

function buildProps(propsDefinition) {
  var allProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var props = {};

  (0, _immutable.Map)(propsDefinition).map(function (data, prop) {
    if (data.defaultValue) props[prop] = data.defaultValue.computed ? data.defaultValue.value : eval('(' + data.defaultValue.value + ')'); // eslint-disable-line no-eval
    else if (allProps || data.required || (data.type || data.flowType).name === 'func') props[prop] = calculateProp(data.type || data.flowType, prop);
  });

  return props;
}

function calculateProp(type, prop) {
  switch (type.name.replace('React.', '')) {
    case 'any':
      return 'ANY ' + prop;
    case 'node':
      return 'NODE ' + prop;
    case 'Children':
      return 'NODE ' + prop;
    case 'ReactNode':
      return 'NODE ' + prop;
    case 'ReactElement':
      return 'NODE ' + prop;
    case 'string':
      return '' + prop;
    case 'bool':
      return true;
    case 'boolean':
      return true;
    case 'number':
      return 1;
    case 'array':
      return [];
    case 'object':
      return {};
    case 'func':
      return eval('[function () { dispatchEvent({detail: {prop: "' + prop + '"}}) }][0]'); // eslint-disable-line no-eval
    case /\(.*\)\s*=>/:
      return eval('[function () { dispatchEvent({detail: {prop: "' + prop + '"}}) }][0]'); // eslint-disable-line no-eval
    case 'enum':
      return (typeof type.value === 'string' ? '' : type.value[0].value && type.value[0].value.replace(/'/g, '')) || '';
    case 'shape':
      return (0, _immutable.Map)(type.value).map(function (subType, name) {
        return calculateProp(subType, name);
      }).toJS();
    case 'arrayOf':
      return [calculateProp(type.value, prop)];
  }

  return null;
}