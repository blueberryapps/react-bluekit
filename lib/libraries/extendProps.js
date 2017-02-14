'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendProps;

var _immutable = require('immutable');

function extendProps(_ref) {
  var defaultProps = _ref.defaultProps,
      customProps = _ref.customProps,
      component = _ref.component,
      propsDefinition = _ref.propsDefinition,
      createSetAtomProp = _ref.createSetAtomProp,
      setAtomProp = _ref.setAtomProp;

  var override = {};

  if (propsDefinition.get('onChange') && propsDefinition.get('value')) override.onChange = createSetAtomProp('value', propsDefinition.getIn(['value', 'type', 'name']));

  var enhanceOld = component.enhanceComponentLibraryDefaults ? component.enhanceComponentLibraryDefaults(override, setAtomProp) : override;

  var enhanceBluekit = component.enhanceBluekitDefaults ? component.enhanceBluekitDefaults(enhanceOld, setAtomProp) : enhanceOld;

  var extendOld = component.extendComponentLibraryProps ? component.extendComponentLibraryProps(enhanceBluekit, setAtomProp) : enhanceBluekit;

  var extendBluekit = component.extendBluekitProps ? component.extendBluekitProps(extendOld, setAtomProp) : extendOld;

  return (0, _immutable.fromJS)(defaultProps).mergeDeep(customProps, (0, _immutable.fromJS)(extendBluekit));
}