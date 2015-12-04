import deepMerge from './deepMerge';

export default function extendProps(defaultProps, customProps, component, propsDefinition, library) {
  const override = {}

  if (propsDefinition.onChange && propsDefinition.value)
    override.onChange = library.createHandleChange(library)('value', propsDefinition.value.type.name)

  const enhance = component.enhanceComponentLibraryDefaults
    ? component.enhanceComponentLibraryDefaults(override, library)
    : override

  const extend = component.extendComponentLibraryProps
    ? component.extendComponentLibraryProps(enhance, library)
    : enhance

  return deepMerge(defaultProps, customProps, extend)
}
