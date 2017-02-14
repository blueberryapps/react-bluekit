'use strict';

var _filterFunctionProps = require('../filterFunctionProps');

var _filterFunctionProps2 = _interopRequireDefault(_filterFunctionProps);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('filter function props', function (t) {
  var props = {
    width: 'full',
    disabled: true,
    size: 6,
    onClick: function onClick() {
      return 'Test function';
    }
  };
  var filteredProps = (0, _filterFunctionProps2.default)(props);
  var count = Object.keys(filteredProps).length;
  var functionPropName = Object.keys(filteredProps).reduce(function (acc, key) {
    if (typeof filteredProps[key] === 'function') acc.push(key);
    return acc;
  }, []).indexOf('Test function') === -1;

  t.true(count === 3 && functionPropName);
});