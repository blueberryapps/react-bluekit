import React from 'react';
import {Map, fromJS} from 'immutable';

export default function extendComponentProps(buildedProps, propsDefinition) {
  const immutableBuildedProps = fromJS(buildedProps)
  const componentProps = {}

  if (propsDefinition.children)
    componentProps.children = <span dangerouslySetInnerHTML={{__html: (immutableBuildedProps.get('children') || 'DEFAULT CHILDREN')}} />

  Map(propsDefinition).map((data, prop) => {
    if (data.type && (data.type.name === 'node' || data.type.name === 'element'))
      componentProps[prop] = immutableBuildedProps.get(prop) ? <span dangerouslySetInnerHTML={{__html: immutableBuildedProps.get(prop)}} /> : ''
  })

  return immutableBuildedProps.mergeDeep(fromJS(componentProps))
}
