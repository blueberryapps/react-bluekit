import {Map} from 'immutable';

export default function buildProps(propsDefinition, allProps = false) {
  const props = {}

  Map(propsDefinition).map((data, prop) => {
    if (data.defaultValue)
      props[prop] = data.defaultValue.computed
        ? data.defaultValue.value
        : eval(`(${data.defaultValue.value})`) // eslint-disable-line no-eval
    else if (allProps || data.required)
      props[prop] = calculateProp(data.type, prop)
  })

  return props
}

function calculateProp(type, prop) {
  switch (type.name) {
    case 'any':    return 'Default ANY'
    case 'node':   return 'Default NODE'
    case 'string': return `Default string ${prop}`
    case 'bool':   return true
    case 'number': return 1
    case 'func':   return eval(`() => { alert('called function: ${prop}') }`) // eslint-disable-line no-eval
    case 'enum':   return type.value[0].value.replace(/'/g, '')
    case 'shape':  return Map(type.value)
      .map((subType, name) => calculateProp(subType, name))
      .toJS()
    case 'arrayOf': return [calculateProp(type.value, prop)]
  }

  return null
}
