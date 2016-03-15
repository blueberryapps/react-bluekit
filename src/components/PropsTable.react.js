import FluidTextArea from './FluidTextArea.react.js';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Map, fromJS} from 'immutable';
import font from './styles/Font';

@Radium
export default class PropsTable extends Component {

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired
  }

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired
  }

  render() {
    const {atom: {propsDefinition}} = this.props
    if (Object.keys(propsDefinition).length === 0)
      return <i>No props defined</i>

    return (
      <table style={[styles.table, font]}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>prop</th>
            <th style={styles.tableCell}>type</th>
            <th style={styles.tableCell}>required</th>
            <th style={styles.tableCell}>value</th>
          </tr>
        </thead>
        <tbody>
          {Map(propsDefinition).map((value, key) => this.renderPropRow(value, key))}
        </tbody>
      </table>
    )
  }

  renderPropRow(data, key) {
    if (!data.type) return null

    if (data.type.name === 'shape')
      return (
        Map(data.type.value).map((v, k) => this.renderShapePropRow(v, k, [key]))
      )

    return (
      <tr key={key} style={styles.tableRow}>
        <td style={styles.tableCell}><b>{this.renderNameOfProp(key, data.type.name)}</b></td>
        <td style={styles.tableCell}>{data.type.name}</td>
        <td style={styles.tableCell}>{data.required && 'true'}</td>
        <td style={styles.tableCell}>{this.renderValueSelection(key, data.type)}</td>
      </tr>
    )
  }

  renderNameOfProp(name, kind) {
    if (['string', 'number', 'bool', 'enum'].indexOf(kind) === -1)
      return name
    else
      return <a href={`#${name}`} style={styles.propLink}>{name}</a>
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

  selectOptions(type) {
    const options = type.value
      .map(v => <option value={v.value.replace(/'/g, '')}>{v.value.replace(/'/g, '')}</option>)

    if (!type.required)
      return [<option value=''></option>].concat(options)

    return options
  }

  renderValueSelection(key, type, scope = []) {
    const {componentProps} = this.props
    const {createSetAtomProp} = this.context

    const defaultProps = {
      onChange: createSetAtomProp(key, type.name, scope),
      value: fromJS(componentProps).getIn(scope.concat([key]))
    }

    switch (type.name) {
      case 'any': return <input key={key} style={styles.input} type='text' {...defaultProps} />
      case 'node': return <input key={key} style={styles.input} type='text' {...defaultProps} />
      case 'shape': return <FluidTextArea type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'arrayOf': return <FluidTextArea type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'string': return <input key={key} style={styles.input} type='text' {...defaultProps} />
      case 'number': return <input key={key} style={styles.input} type='number' {...defaultProps} />
      case 'bool': return <input type='checkbox' {...{...defaultProps, checked: defaultProps.value}} />
      case 'enum' : {
        return (
          <div style={styles.selectWrapper}>
            <select children={this.selectOptions(type)} style={styles.select} {...defaultProps} />
            <div style={styles.selectArrow} />
          </div>
        )
      }
    }
  }
}

const styles = {
  table: {
    width: '100%',
    fontSize: '12px',
    textAlign: 'left',
    color: 'hsl(202, 71%, 36%)'
  },

  tableRow: {padding: '10px'},

  tableCell: {padding: '5px 10px'},

  td: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
  },

  tableHeader: {
    background: 'hsl(202, 100%, 85%)',
    color: 'hsl(202, 71%, 36%)',
  },

  propLink: {
    color: 'hsl(26, 100%, 58%)'
  },

  input: {
    width: '100%',
    height: '30px',
    outline: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsl(202, 100%, 85%)',
    padding: '3px 5px',
    ':focus': {
      borderColor: 'hsl(26, 100%, 58%)'
    }
  },

  selectWrapper: {
    position: 'relative'
  },

  select: {
    width: '100%',
    height: '30px',
    appearance: 'none',
    borderRadius: '0',
    background: 'white',
    padding: '3px 5px',
    outline: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsl(202, 100%, 85%)',
  },

  selectArrow: {
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid hsl(202, 40%, 50%)',
    position: 'absolute',
    top: '10px',
    right: '6px'
  }
}
