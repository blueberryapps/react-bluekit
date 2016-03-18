import deepMerge from './deepMerge';

export default function extendProps({defaultProps, customProps, component, propsDefinition, createSetAtomProp, setAtomProp}) {
  const override = {}

  if (propsDefinition.onChange && propsDefinition.value)
    override.onChange = createSetAtomProp('value', propsDefinition.value.type.name)

  const enhance = component.enhanceComponentLibraryDefaults
    ? component.enhanceComponentLibraryDefaults(override, setAtomProp)
    : override

  const extend = component.extendComponentLibraryProps
    ? component.extendComponentLibraryProps(enhance, setAtomProp)
    : enhance

  return deepMerge(defaultProps, customProps, extend)
}
