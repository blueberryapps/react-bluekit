import {Component} from 'react';
import React, {PropTypes as RPT} from 'react';

export default class WithShapeWithDefaults extends Component {

  static propTypes = {
    interval:     RPT.shape({
      value: RPT.number.isRequired,
      text:  RPT.string.isRequired,
    }).isRequired,
    items: RPT.array,
    object: RPT.object,
    element: RPT.element,
    children: RPT.element,
    node: RPT.node
  }

  static defaultProps = {
    interval: {
      value: 123,
      text: 'Foo'
    }
  }

  render() {
    const {children, element, node} = this.props
    return (
      <div>
        No props component node: {node} element: {element}
        children: {children}
      </div>
    );
  }
}
