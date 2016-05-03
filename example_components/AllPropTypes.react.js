import {Component} from 'react';
import React, {PropTypes as RPT, PropTypes} from 'react';

export default class AllPropTypes extends Component {

  static propTypes = {
    array: RPT.array,
    arrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
    bool: PropTypes.bool,
    func: React.PropTypes.func,
    number: React.PropTypes.number,
    object: React.PropTypes.object,
    objectOf: React.PropTypes.objectOf(React.PropTypes.number),
    objectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
    objectWithShapeAndShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number,
      border: React.PropTypes.shape({
        color: React.PropTypes.string,
        width: React.PropTypes.number,
      })
    }),
    string: React.PropTypes.string.isRequired,
    node: React.PropTypes.node,
    element: React.PropTypes.element,
    message: React.PropTypes.instanceOf(Component),
    enum: React.PropTypes.oneOf(['News', 'Photos']),
    union: React.PropTypes.oneOfType([
       React.PropTypes.string,
       React.PropTypes.number,
       React.PropTypes.instanceOf(Component)
     ]),
    }

  static defaultProps = {
    children: 'Editable field with value',
    editing: false,
    label: 'Value to show',
    interval: {
      value: 123,
      text: 'Foo'
    }
  }

  // This enables live functionality of this component in Component Library
  static extendBluekitProps = (props, library) => ({
    ...props,
    onEditingModeChange: value => library.setValue('editing', value)
  });

  render() {
    return (
      <table>
        <thead>
          <tr><th>Prop</th><th>Value</th><th>Preview</th></tr>
        </thead>
        <tbody>
          <tr><th>array</th><td><pre><code>{JSON.stringify(this.props.array)}</code></pre></td><td></td></tr>
          <tr><th>arrayOf</th><td><pre><code>{JSON.stringify(this.props.arrayOf)}</code></pre></td><td></td></tr>
          <tr><th>bool</th><td><pre><code>{JSON.stringify(this.props.bool)}</code></pre></td><td>{this.props.bool ? 'TRUE' : 'FALSE'}</td></tr>
          <tr><th>func</th><td><pre><code>{JSON.stringify(this.props.func)}</code></pre></td><td><button onClick={this.props.func}>Click ME ☺</button></td></tr>
          <tr><th>number</th><td><pre><code>{JSON.stringify(this.props.number)}</code></pre></td><td>{this.props.number}</td></tr>
          <tr><th>object</th><td><pre><code>{JSON.stringify(this.props.object)}</code></pre></td><td></td></tr>
          <tr><th>objectOf</th><td><pre><code>{JSON.stringify(this.props.objectOf)}</code></pre></td><td></td></tr>
          <tr><th>objectWithShape</th><td><pre><code>{JSON.stringify(this.props.objectWithShape)}</code></pre></td><td></td></tr>
          <tr><th>string</th><td><pre><code>{JSON.stringify(this.props.string)}</code></pre></td><td>{this.props.string}</td></tr>
          <tr><th>node</th><td><pre><code>{JSON.stringify(this.props.node)}</code></pre></td><td></td></tr>
          <tr><th>element</th><td><pre><code>{JSON.stringify(this.props.element)}</code></pre></td><td></td></tr>
          <tr><th>message</th><td><pre><code>{JSON.stringify(this.props.message)}</code></pre></td><td></td></tr>
          <tr><th>enum</th><td><pre><code>{JSON.stringify(this.props.enum)}</code></pre></td><td></td></tr>
          <tr><th>union</th><td><pre><code>{JSON.stringify(this.props.union)}</code></pre></td><td></td></tr>
        </tbody>
      </table>
    );
  }
}
