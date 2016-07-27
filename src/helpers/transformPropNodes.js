import React from 'react'

export default function transformPropNodes(props, definition) {
  return definition
    .filter(data => data.get('type') === 'node' || data.get('type') === 'element')
    .reduce((acc, data, key) =>
      props.set(key, props.get(key) ? <span dangerouslySetInnerHTML={{__html: props.get(key)}} /> : '')
      , props)
}
