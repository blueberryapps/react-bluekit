'use strict';

var _extendComponentProps = require('../extendComponentProps');

var _extendComponentProps2 = _interopRequireDefault(_extendComponentProps);

var _immutable = require('immutable');

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('extend components props', function (t) {
  var builtProps = (0, _immutable.fromJS)({
    children: 'Any children',
    decorated: 'Test',
    loading: false
  });
  var propsDefinition = (0, _immutable.fromJS)({
    children: {
      description: '',
      required: true,
      type: { name: 'node' }
    },
    icon: {
      description: '',
      required: false,
      type: { name: 'element' }
    },
    decorated: {
      description: '',
      required: false,
      type: { name: 'node' }
    },
    onClick: {
      description: '',
      required: false,
      type: { name: 'func' }
    },
    options: {
      defaultValue: { computed: false, value: [] },
      description: '',
      required: true
    },
    value: {
      description: '',
      required: false
    }
  });
  var extended = (0, _extendComponentProps2.default)(builtProps, propsDefinition);
  var arrayOfProps = [extended.getIn(['children', 'type']) === 'span', extended.getIn(['decorated', 'props', 'dangerouslySetInnerHTML', '__html']) === 'Test', extended.get('loading') === false, extended.get('icon') === '', extended.size === 4];
  var result = arrayOfProps.reduce(function (acc, prop) {
    return acc && prop;
  }, true);

  t.pass(result);
});