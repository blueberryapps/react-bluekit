import extendProps from '../extendProps';
import Button from './Button';
import ExampleSource from './ExampleSource';
import extendComponentProps from '../extendComponentProps';
import PropsTable from './PropsTable';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../resolveComponent';
import Variants from './Variants';
import {fromJS} from 'immutable';

class LibraryComponent extends Component {

  static contextTypes = {
    componentsIndex: RPT.object.isRequired
  }

  static propTypes = {
    params: RPT.object.isRequired
  }

  state = {simpleProps: true}

  getCurrentComponent() {
    const {componentsIndex} = this.context
    const {params: {atom}} = this.props

    return componentsIndex[atom]
  }

  getCurrentProps() {
    const {simpleProps} = this.state
    const atom = this.getCurrentComponent()
    const component = resolveComponent(atom.component)
    const defaultProps = simpleProps ? atom.simpleProps : atom.fullProps
    const customProps = this.state[atom.name] || {}

    return extendProps(
      defaultProps,
      customProps,
      component,
      atom.propsDefinition,
      this
    )
  }

  getComponentExtendendProps() {
    const {propsDefinition} = this.getCurrentComponent()

    return extendComponentProps(this.getCurrentProps(), propsDefinition)
  }

  render() {
    const {simpleProps} = this.state
    const atom = this.getCurrentComponent()
    const currentProps = this.getCurrentProps()
    const ExampleAtom = resolveComponent(atom.component)

    return (
      <div>
        <h1 style={styles.heading}>
          {atom.componentName}
          <small style={styles.headingSmall}>{atom.file}</small>
        </h1>
        <div style={styles.panel}>
          <h3 style={styles.blockHeading}>Example</h3>
          <div>
            <ExampleAtom {...this.getComponentExtendendProps()} />
          </div>
        </div>
        <div style={styles.panel}>
          <h3 style={styles.blockHeading}>
            Props
          </h3>
          <Button kind='primary' onClick={this.toggleProps.bind(this)}>{simpleProps ? 'All props' : 'Only required props'}</Button>
          <Button kind='secondary' onClick={this.resetPropsToDefauls.bind(this)}>Reset props to default</Button>
          <PropsTable atom={atom} componentProps={currentProps} handleChange={this.createHandleChange(this)} />
        </div>
        <div style={styles.panel}>
          <h3 style={styles.blockHeading}>Code</h3>
          <ExampleSource atom={atom} componentProps={currentProps} />
        </div>
        <Variants atom={atom} componentProps={currentProps} styles={styles} />
      </div>
    )
  }

  createHandleChange(main) {
    return function(key, type, scope = []) {
      return function(event) {
        let value = event
        // Get value from event
        if (event.target && event.target.value !== undefined)
          value = event.target.value

        // Get value from {name, value} event
        else if (event.value !== undefined)
          value = event.value

        // fix string to valid type
        if (type === 'bool' && typeof value !== 'boolean')
          value = event.target.checked
        else if (type === 'number')
          value = parseInt(value, 10)
        else if (type === 'shape' || type === 'arrayOf')
          value = JSON.parse(value)

        main.setValue(key, value, scope)
      }
    }
  }

  setValue(key, value, scope = []) {
    const {params: {atom}} = this.props

    this.setState(
      fromJS(this.state)
        .setIn([atom].concat(scope).concat(key), value)
        .toJS()
      )
  }

  toggleProps() {
    const {simpleProps} = this.state

    this.setState({...this.state, simpleProps: !simpleProps})
  }

  resetPropsToDefauls() {
    const {params: {atom}} = this.props

    this.setState({...this.state, [atom]: {}})
  }
}

const styles = {
  heading: {
    color: 'hsl(26, 100%, 58%)',
    fontSize: '32px',
    fontWeight: '400',
    padding: '30px 10px 0 10px',
    margin: '0',
  },

  headingSmall: {
    color: 'hsl(202, 40%, 50%)',
    fontSize: '14px',
    fontWeight: '300',
    display: 'block',
    width: '100%'
  },

  blockHeading: {
    color: 'hsl(202, 40%, 50%)',
    marginRight: '20px',
    display: 'inline-block'
  },

  panel: {
    borderLeft: '10px solid hsl(202, 100%, 85%)',
    marginTop: '2rem',
    marginBottom: '2rem',
    background: 'hsl(202, 100%, 96%)',
    padding: '10px 10px 30px 20px'
  },

  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
  },
};


export default Radium(LibraryComponent)
