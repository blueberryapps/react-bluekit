import React from 'react'

function enhancePrimitivePropType(type, func) {
  func.propType = type
  func.propRequired = false

  if (typeof func.isRequired !== 'undefined') {
    func.isRequired.propType = type
    func.isRequired.propRequired = true
  }

  return func;
}

function enhanceComplexPropType(type, func) {
  return (data) => {
    const validation = func(data)
    validation.propType = type
    validation.propData = data
    validation.propRequired = false

    if (typeof validation.isRequired !== 'undefined') {
      validation.isRequired.propType = type
      validation.isRequired.propData = data
      validation.isRequired.propRequired = true
    }

    return validation;
  }
}

React.PropTypes.string     = enhancePrimitivePropType('string', React.PropTypes.string)
React.PropTypes.array      = enhancePrimitivePropType('array', React.PropTypes.array)
React.PropTypes.bool       = enhancePrimitivePropType('bool', React.PropTypes.bool)
React.PropTypes.func       = enhancePrimitivePropType('func', React.PropTypes.func)
React.PropTypes.number     = enhancePrimitivePropType('number', React.PropTypes.number)
React.PropTypes.object     = enhancePrimitivePropType('object', React.PropTypes.object)
React.PropTypes.any        = enhancePrimitivePropType('any', React.PropTypes.any)
React.PropTypes.element    = enhancePrimitivePropType('element', React.PropTypes.element)
React.PropTypes.node       = enhancePrimitivePropType('node', React.PropTypes.node)
React.PropTypes.arrayOf    = enhanceComplexPropType('arrayOf', React.PropTypes.arrayOf)
React.PropTypes.instanceOf = enhanceComplexPropType('instanceOf', React.PropTypes.instanceOf)
React.PropTypes.objectOf   = enhanceComplexPropType('objectOf', React.PropTypes.objectOf)
React.PropTypes.oneOf      = enhanceComplexPropType('oneOf', React.PropTypes.oneOf)
React.PropTypes.oneOfType  = enhanceComplexPropType('oneOfType', React.PropTypes.oneOfType)
React.PropTypes.shape      = enhanceComplexPropType('shape', React.PropTypes.shape)
