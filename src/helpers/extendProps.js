import {fromJS} from 'immutable';

export default function extendProps({defaultProps, customProps, component, propsDefinition, createSetAtomProp, setAtomProp}) {
  const override = {}

  if (propsDefinition.onChange && propsDefinition.value)
    override.onChange = createSetAtomProp('value', propsDefinition.value.type.name)

  const enhanceOld = component.enhanceComponentLibraryDefaults
    ? component.enhanceComponentLibraryDefaults(override, setAtomProp)
    : override

  const enhanceBluekit = component.enhanceBluekitDefaults
    ? component.enhanceBluekitDefaults(enhanceOld, setAtomProp)
    : enhanceOld

  const extendOld = component.extendComponentLibraryProps
    ? component.extendComponentLibraryProps(enhanceBluekit, setAtomProp)
    : enhanceBluekit

  const extendBluekit = component.extendBluekitProps
    ? component.extendBluekitProps(extendOld, setAtomProp)
    : extendOld

  return fromJS(defaultProps).mergeDeep(customProps, fromJS(extendBluekit))
}
