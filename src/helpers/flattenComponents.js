import getComponentName from './getComponentName'
import getComponentPropsDefinition from './getComponentPropsDefinition'

function getComponent(component, scope) {
  const nameArray = scope.concat(getComponentName(component))
  const key = nameArray.join(' ')
  return {component, key, name: key, menuName: nameArray, definition: getComponentPropsDefinition(component)}
}

export default function flattenComponents(components, scope = []) {

  if (typeof components === 'function') {
    const component = getComponent(components, scope.slice(0,-1))
    return {[component.key]: component}
  }

  if (Array.isArray(components)) {
    return components.reduce((acc, c) => {
      const component = getComponent(c, scope)
      return {...acc, [component.key]: component}
    }, {})
  }
  else {
    return Object.keys(components).reduce((acc, name) => ({...acc, ...flattenComponents(components[name], scope.concat([name]))}), {})
  }
}
