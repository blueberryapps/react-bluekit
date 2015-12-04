import deepMerge from './deepMerge';

export default function extendProps(defaultProps, customProps, component, propsDefinition, handleChange) {
  const override = {}

  if (propsDefinition.onChange && propsDefinition.value)
    override.onChange = handleChange('value', propsDefinition.value.type.name)

  return deepMerge(defaultProps, customProps, override)
}
