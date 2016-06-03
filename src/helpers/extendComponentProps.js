import BluekitEvent from './BluekitEvent'
import React from 'react';

export default function extendComponentProps(props, componentName, definition, createSetAtomProp) {

  const extendOnChangeValue = (props) => {
    if (definition.get('onChange') && definition.get('value'))
      return props.set('onChange', createSetAtomProp(componentName, 'value', definition.get('type')))
    return props
  }

  const extendChildren = (props) => {
    if (definition.get('children'))
      return props.set('children', <span dangerouslySetInnerHTML={{__html: (props.get('children') || 'DEFAULT CHILDREN')}} />)
    return props
  }

  const extendFunctions = (props) => {
    return definition
      .filter(data => data.get('type') === 'func')
      .reduce((acc, data, key) =>
        props.set(key, (event) => dispatchEvent(key) && typeof props.get(key) === 'function' && props.get(key)(event))
        , props)
  }

  const extendNodes = (props) => {
    return definition
      .filter(data => data.get('type') === 'node' || data.get('type') === 'element')
      .reduce((acc, data, key) =>
        props.set(key, props.get(key) ? <span dangerouslySetInnerHTML={{__html: props.get(key)}} /> : '')
        , props)
  }

  return extendNodes(extendChildren(extendFunctions(extendOnChangeValue(props))))
}

function dispatchEvent(name) {
  if (typeof window !== 'undefined')
    document.dispatchEvent(new BluekitEvent('functionTriggered', {detail: {prop: name}}));
  else
    console.log('Bluekit received function triggered', name) // eslint-disable-line no-console
  return true
}
