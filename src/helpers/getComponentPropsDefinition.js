import {fromJS, Map} from 'immutable'
import BluekitEvent from './BluekitEvent'

export default function getComponentPropsDefinition(Component) {
  return getProps(Component.propTypes, Component.defaultProps)
}

function getProps(props = {}, defaultProps = {}) {
  return fromJS(
    Object.keys(props).reduce((acc, name) => {
      const prop = props[name]

      return {
        ...acc,
        [name]: {
          type: prop.propType,
          data: prop.propType === 'shape' ? getProps(prop.propData) : prop.propData,
          defaultValue: defaultProps[name] || generateDefaultValue(name, prop.propType, prop.propData),
          required: prop.propRequired,
        }
      }
    }, {})
  )
}

function dispatchEvent(data) {
  if (typeof window !== 'undefined')
    document.dispatchEvent(new BluekitEvent('functionTriggered', data));
  else
    console.log('Bluekit received function triggered', data) // eslint-disable-line no-console
}

function generateDefaultValue(name, type, data) {
  switch (type) {
    case 'any':    return `ANY ${name}`
    case 'node':   return `NODE ${name}`
    case 'string': return `${name}`
    case 'bool':   return true
    case 'number': return 1
    case 'array':  return []
    case 'object': return {}
    case 'func':   return () => dispatchEvent({detail: {prop: name}})
    case 'enum':   return data ? data[0] : ''
    case 'oneOf':  return data ? data[0] : ''
    case 'shape':  return Map(data)
      .map((shapeData, name) => generateDefaultValue(name, shapeData.propType, shapeData.propData))
      .toJS()
    case 'arrayOf': return [generateDefaultValue(name, data.propType, data.propData)]
  }

  return null
}
