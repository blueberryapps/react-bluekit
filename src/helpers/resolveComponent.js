import React, {Component} from 'react';

class InvalidComponent extends Component {
  render() {
    return (
      <div>
        Invalid component exported
      </div>
    )
  }
}

function canBeReactComponent(component) {
  return typeof component === 'string'
    || typeof component === 'function'
    || (component && component.prototype === Component)
}

function isInDefault(component) {
  return !canBeReactComponent(component)
    && canBeReactComponent(component.default)
}

export default function resolveComponent(component) {
  if (!component)
    return InvalidComponent

  const resolvedComponent = isInDefault(component) ? component.default : component

  return resolvedComponent.WrappedComponent
    ? resolvedComponent.WrappedComponent
    : resolvedComponent
}
