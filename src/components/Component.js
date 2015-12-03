import ExampleSource from './ExampleSource';
import PropsTable from './PropsTable';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../resolveComponent';
import Variants from './Variants';
import {fromJS} from 'immutable';

@Radium
export default class LibraryComponent extends Component {

  static contextTypes = {
    componentsIndex: RPT.object.isRequired
  }

  static propTypes = {
    params: RPT.object.isRequired
  }

  state = {simpleProps: true, ...this.context.componentsIndex}

  getCurrentComponent() {
    const {params: {atom}} = this.props

    return this.state[atom]
  }

  getCurrentProps() {
    const {simpleProps} = this.state
    const atom = this.getCurrentComponent()
    const defaultProps = simpleProps ? atom.simpleProps : atom.fullProps

    return {...defaultProps, ...atom.customProps}
  }

  render() {
    const {simpleProps} = this.state
    const atom = this.getCurrentComponent()
    const currentProps = this.getCurrentProps()
    const ExampleAtom = resolveComponent(atom.component)

    return (
      <div>
        <button onClick={this.toggleProps.bind(this)}>{simpleProps ? 'All props' : 'Simple props'}</button>
        <h2 style={[styles.paddedElement, styles.h2]}>
          <em style={styles.h2em}>{atom.componentName}</em> ({atom.file})
        </h2>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Example</h3>
          <ExampleAtom {...currentProps} />
        </div>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Props</h3>
          <PropsTable atom={atom} componentProps={currentProps} handleChange={this.createHandleChange(this)} />
        </div>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Code</h3>
          <ExampleSource atom={atom} componentProps={currentProps} />
        </div>
        <Variants atom={atom} componentProps={currentProps} styles={styles} />
      </div>
    )
  }

  createHandleChange(main) {
    return function(key, type, scope = []) {
      return function(event) {
        let value = (typeof event === 'object') ? event.target.value : event

        if (type === 'bool')
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
        .setIn([atom, 'customProps'].concat(scope).concat(key), value)
        .toJS()
      )
  }

  toggleProps() {
    const {simpleProps} = this.state

    this.setState({...this.state, simpleProps: !simpleProps})
  }
}

const styles = {
  paddedElement: {
    padding: '1rem 3rem 2rem 3rem',
  },

  h2: {
    fontSize: '1.0rem',
    paddingTop: '4rem',
    margin: '0 0 -2rem 0',
    color: 'hsl(0, 0%, 70%)',
  },

  h2em: {
    color: 'hsl(0, 0%, 25%)',
    fontStyle: 'normal',
    fontSize: '2rem',
  },

  h3: {color: 'hsl(0, 0%, 70%)'},

  panel: {
    borderLeft: '10px solid hsl(0, 0%, 95%)',
    marginTop: '2rem',
    marginBottom: '2rem',
    background: 'hsl(0, 0%, 97%)',
  },

  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
    padding: '10px',
  },
};
