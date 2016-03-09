import {Component} from 'react';

function canBeReactComponent(component) {
  return typeof component === 'string'
    || typeof component === 'function'
    || component.prototype === Component
}

function isInDefault(component) {
  return !canBeReactComponent(component)
    && canBeReactComponent(component.default)
}

export default function resolveComponent(component) {
  const resolvedComponent = isInDefault(component) ? component.default : component

  return resolvedComponent.WrappedComponent
    ? resolvedComponent.WrappedComponent
    : resolvedComponent
}
