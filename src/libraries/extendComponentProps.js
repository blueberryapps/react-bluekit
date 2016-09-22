import React from 'react';
import {fromJS} from 'immutable';

export default function extendComponentProps(builtProps, propsDefinition) {
  const immutableBuiltProps = fromJS(builtProps)
  const componentProps = {}

  if (propsDefinition.get('children'))
    componentProps.children = <span dangerouslySetInnerHTML={{__html: (immutableBuiltProps.get('children') || 'DEFAULT CHILDREN')}} />

  propsDefinition.map((data, prop) => {
    const name = data.getIn(['type', 'name'])
    if (name === 'node' || name === 'element')
      componentProps[prop] = immutableBuiltProps.get(prop) ? <span dangerouslySetInnerHTML={{__html: immutableBuiltProps.get(prop)}} /> : ''
  })

  return immutableBuiltProps.mergeDeep(fromJS(componentProps))
}
