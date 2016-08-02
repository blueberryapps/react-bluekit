import React from 'react';
import {fromJS} from 'immutable';

export default function extendComponentProps(buildedProps, propsDefinition) {
  const immutableBuildedProps = fromJS(buildedProps)
  const componentProps = {}

  if (propsDefinition.get('children'))
    componentProps.children = <span dangerouslySetInnerHTML={{__html: (immutableBuildedProps.get('children') || 'DEFAULT CHILDREN')}} />

  propsDefinition.map((data, prop) => {
    const name = data.getIn(['type', 'name'])
    if (name === 'node' || name === 'element')
      componentProps[prop] = immutableBuildedProps.get(prop) ? <span dangerouslySetInnerHTML={{__html: immutableBuildedProps.get(prop)}} /> : ''
  })

  return immutableBuildedProps.mergeDeep(fromJS(componentProps))
}
