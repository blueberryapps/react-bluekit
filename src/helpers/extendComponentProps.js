import React from 'react';
import {Map} from 'immutable';

export default function extendComponentProps(buildedProps, propsDefinition) {
  const componentProps = {}

  if (propsDefinition.children)
    componentProps.children = <div>{buildedProps.children || 'DEFAULT CHILDREN'}</div>

  Map(propsDefinition).map((data, prop) => {
    if (data.type === 'node')
      componentProps[prop] = <div>{buildedProps[prop]}</div>
  })

  return {...buildedProps, ...componentProps}
}
