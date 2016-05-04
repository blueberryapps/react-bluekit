import React from 'react';
import {Map} from 'immutable';

export default function extendComponentProps(buildedProps, propsDefinition) {
  const componentProps = {}

  if (propsDefinition.children)
    componentProps.children = <span dangerouslySetInnerHTML={{__html: (buildedProps.children || 'DEFAULT CHILDREN')}} />

  Map(propsDefinition).map((data, prop) => {
    if (data.type && (data.type.name === 'node' || data.type.name === 'element'))
      componentProps[prop] = buildedProps[prop] ? <span dangerouslySetInnerHTML={{__html: buildedProps[prop]}} /> : ''
  })

  return {...buildedProps, ...componentProps}
}
