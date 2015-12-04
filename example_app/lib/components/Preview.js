import React, {Component, PropTypes as RPT} from 'react';
import {Map, fromJS} from 'immutable';

export default class LibraryPreview extends Component {

  static contextTypes = {
    componentsIndex: RPT.object.isRequired
  }

  static propTypes = {
    data: RPT.object.isRequired
  }

  exampleComponent() {
    const component = this.props.data.component
    // this removes connect and connectState, so component library is in charge
    if (component.WrappedComponent)
      return component.WrappedComponent

    if (
      !this.canBeReactComponent(component) &&
      this.canBeReactComponent(component.default)
    ) return component.default
    return component
  }

  buildDefaultProps() {
    const props = {}
    
    Map(this.props.data.props).map((data, prop) => {
      if (data.defaultValue)
        props[prop] = data.defaultValue.computed
          ? data.defaultValue.value
          : eval(`(${data.defaultValue.value})`) // eslint-disable-line no-eval
      else if (data.required)
        props[prop] = this.calculateDefaultProp(data.type, prop)
    })

    return props
  }

  calculateDefaultProp(type, prop) {
    switch (type.name) {
      case 'any':    return 'Default ANY'
      case 'string': return `Default string ${prop}`
      case 'bool':   return true
      case 'number': return 1
      case 'func':   return () => { alert(prop) }
      case 'enum':   return type.value[0].value.replace(/'/g, '')
      case 'shape':  return Map(type.value)
        .map((subType, name) => this.calculateDefaultProp(subType, name))
        .toJS()
      case 'arrayOf': return [this.calculateDefaultProp(type.value, prop)]
    }

    return null
  }

  canBeReactComponent(value) {
    return typeof value === 'string' || typeof value === 'function' || value.prototype === Component
  }

  render() {
    let ExampleComponent = this.exampleComponent()

    return <ExampleComponent {...this.buildDefaultProps()} />
  }

}
