import FluidTextArea from './FluidTextArea.react.js';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Link} from 'react-router';
import {Map, fromJS} from 'immutable';

@Radium
export default class PropsTable extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    handleChange: RPT.func.isRequired,
    mountPoint: RPT.string.isRequired
  }

  render() {
    const {atom: {propsDefinition}} = this.props
    if (Object.keys(propsDefinition).length === 0)
      return <i>No props defined</i>

    return (
      <table styles={styles.table}>
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
      return <a href={`#${name}`}>{name}</a>
  }

  renderShapePropRow(data, key, scope = []) {
    if (data.name === 'shape')
      return (
        Map(data.value).map((v, k) => this.renderShapePropRow(v, k, scope.concat([key])))
      )

    return (
      <tr key={key}>
        <td>{scope.join('.')}.<b>{key}</b></td>
        <td>{data.name}</td>
        <td>{data.required && 'true'}</td>
        <td>{this.renderValueSelection(key, data, scope)}</td>
      </tr>
    )
  }

  renderValueSelection(key, type, scope = []) {
    const {componentProps, handleChange} = this.props

    const defaultProps = {
      onChange: handleChange(key, type.name, scope),
      value: fromJS(componentProps).getIn(scope.concat([key]))
    }

    switch (type.name) {
      case 'any': return <input type='text' {...defaultProps} />
      case 'shape': return <FluidTextArea type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'arrayOf': return <FluidTextArea type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
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
}

const styles = {
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
  }
}
