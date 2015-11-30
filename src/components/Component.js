import FluidTextArea from './FluidTextArea.react.js';
import Highlight from 'react-highlight';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Map, fromJS} from 'immutable';

@Radium
export default class LibraryComponent extends Component {

  static contextTypes = {
    componentsIndex: RPT.object.isRequired
  }

  static propTypes = {
    params: RPT.object.isRequired
  }

  state = {
    example: {
      [this.file()]: this.buildDefaultProps(this.data())
    }
  }

  file() {
    return this.props.params.atom;
  }

  data() {
    return this.resolveComponent().props;
  }

  exampleComponent(file) {
    return this.resolveComponent(file).component // eslint-disable-line no-undef
  }

  resolveComponent(file = null) {
    return this.context.componentsIndex[`${file || this.file()}`]
  }

  componentWillReceiveProps(nextProps) {
    const file = nextProps.params.atom

    if (this.state.example[file] === undefined) {
      const defaultProps = this.buildDefaultProps(this.resolveComponent(file).props, file)
      this.setState({
        example: {...this.state.example, [file]: defaultProps}
      })
    }
  }

  buildDefaultProps(propsDefinition, file = null) {
    const props = {}
    const enhanceComponentLibraryDefaults = this.exampleComponent(file).enhanceComponentLibraryDefaults

    Map(propsDefinition).map((data, prop) => {
      if (data.defaultValue)
        props[prop] = data.defaultValue.computed
          ? data.defaultValue.value
          : eval(`(${data.defaultValue.value})`) // eslint-disable-line no-eval
      else if (data.required)
        props[prop] = this.calculateDefaultProp(data.type, prop)
    })

    if (propsDefinition.onChange && propsDefinition.value)
      props.onChange = this.handleChange(this, 'value', propsDefinition.value.type.name, [])

    if (enhanceComponentLibraryDefaults)
      return enhanceComponentLibraryDefaults(props, this)

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
    const file = this.file()
    const data = this.resolveComponent()
    let ExampleComponent = data.component

    if (
      !this.canBeReactComponent(ExampleComponent) &&
      this.canBeReactComponent(ExampleComponent.default)
    ) ExampleComponent = ExampleComponent.default

    return (
      <div key={file}>
        <h2 style={[styles.paddedElement, styles.h2]}>
          <em style={styles.h2em}>{data.componentName}</em> ({file})
        </h2>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Example</h3>
          <ExampleComponent {...this.state.example[this.file()]}/>
        </div>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Properties</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>prop</th>
                <th style={styles.tableCell}>type</th>
                <th style={styles.tableCell}>required</th>
                <th style={styles.tableCell}>value</th>
              </tr>
            </thead>
            <tbody>
              {Map(this.data()).map((value, key) => this.renderPropRow(value, key))}
            </tbody>
          </table>

          {Object.keys(this.data()).length === 0 && <i>No props defined</i>}
        </div>
        <div style={[styles.paddedElement, styles.panel]}>
          <h3 style={styles.h3}>Code</h3>
          <pre style={styles.pre}>
            <Highlight>
            import {data.componentName} from '{data.file}'{'\n\n'}
          &lt;{data.componentName}
            {`\n${this.renderInlineProps()}\n`}
          /&gt;
            </Highlight>
          </pre>
        </div>
      </div>
    )
  }

  renderInlineProps() {
    return Map(this.state.example[this.file()]).map((value, key) => {
      if (typeof value === 'object')
        return `  ${key}={${JSON.stringify(value)}}`
      else if (typeof value === 'number')
        return `  ${key}=${value}`
      else
        return `  ${key}='${value}'`
    }).join('\n')
  }

  renderPropRow(data, key) {
    if (data.type.name === 'shape')
      return (
        Map(data.type.value).map((v, k) => this.renderShapePropRow(v, k, [key]))
      )

    return (
      <tr key={key} style={styles.tableRow}>
        <td style={styles.tableCell}><b>{key}</b></td>
        <td style={styles.tableCell}>{data.type.name}</td>
        <td style={styles.tableCell}>{data.required && 'true'}</td>
        <td style={styles.tableCell}>{this.renderValueSelection(key, data.type)}</td>
      </tr>
    )
  }

  renderShapePropRow(data, key, scope = []) {
    if (data.name === 'shape')
      return (
        Map(data.value).map((v, k) => this.renderShapePropRow(v, k, scope.concat([key])))
      )

    return (
      <tr key={key} style={styles.tableRow}>
        <td style={styles.tableCell}>{scope.join('.')}.<b>{key}</b></td>
        <td style={styles.tableCell}>{data.name}</td>
        <td style={styles.tableCell}>{data.required && 'true'}</td>
        <td style={styles.tableCell}>{this.renderValueSelection(key, data, scope)}</td>
      </tr>
    )
  }

  renderValueSelection(key, type, scope = []) {
    const defaultProps = {
      onChange: this.handleChange(this, key, type.name, scope),
      value: fromJS(this.state.example[this.file()]).getIn(scope.concat([key]))
    }

    switch (type.name) {
      case 'any':    return <input style={styles.input} type='text' {...defaultProps} />
      case 'shape':   return <FluidTextArea style={styles.input} type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'arrayOf': return <FluidTextArea style={styles.input} type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'string': return <input type='text' {...defaultProps} />
      case 'number': return <input type='number' {...defaultProps} />
      case 'bool': return <input type='checkbox' {...{...defaultProps, checked: defaultProps.value}} />
      case 'enum' : {
        const selectOptions = type.value
          .map(v => <option value={v.value.replace(/'/g, '')}>{v.value.replace(/'/g, '')}</option>)
        return <select children={selectOptions} {...defaultProps} />
      }
    }
  }

  handleChange(main, key, type, scope = []) {
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

  setValue(key, value, scope = []) {
    this.setState({
      example: fromJS(this.state.example)
        .setIn([this.file()].concat(scope).concat(key), value)
        .toJS()
    })
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

  table: {
    width: '100%',
    textAlign: 'left',
  },

  tableRow: {padding: '10px'},

  tableCell: {padding: '5px 10px'},

  td: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
  },

  tableHeader: {
    background: 'hsl(0, 0%, 70%)',
    color: 'white',
  },

  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
    padding: '10px',
  },
};
