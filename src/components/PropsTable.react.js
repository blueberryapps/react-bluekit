import {Map, fromJS} from 'immutable';
import FluidTextArea from './FluidTextArea.react.js';
import font from './styles/Font';
import Checkbox from './atoms/Checkbox.react';
import Input from './atoms/Input.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import Select from './atoms/Select.react';
import spaces from './styles/Spaces'
import * as colors from './styles/Colors'

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
      <div style={font}>
        {Map(propsDefinition).map((value, key) => this.renderPropRow(value, key))}
      </div>
    )
  }

  renderPropRow(data, key) {
    if (!data.type) return null

    if (data.type.name === 'shape')
      return (
        Map(data.type.value).map((v, k) => this.renderShapePropRow(v, k, [key]))
      )

    const required = data.required

    return (
      <div key={key} style={styles.row}>
        <div style={[styles.prop, styles.prop.info, required && font.bold]}>
          {this.renderNameOfProp(key, data.type.name)}
          {required && '*'}
          <small style={styles.prop.small}>{data.type.name}</small>
        </div>
        <div style={[styles.prop, styles.prop.value]}>
          {data.type.name === 'func'
            ? 'func()'
            : this.renderValueSelection(key, data.type)
          }
        </div>
      </div>
    )
  }

  renderNameOfProp(name, kind) {
    if (['string', 'number', 'bool', 'enum'].indexOf(kind) === -1)
      return name
    else
      return <a href={`#${name}`} style={styles.prop.value.link}>{name}</a>
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
      case 'any': return <Input key={key} type='text' {...defaultProps} />
      case 'node': return <Input key={key} type='text' {...defaultProps} />
      case 'shape': return <FluidTextArea key={key} type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'arrayOf': return <FluidTextArea key={key} type='text' {...{...defaultProps, value: JSON.stringify(defaultProps.value, null, 2)}} />
      case 'string': return <Input key={key} type='text' {...{...defaultProps, value: defaultProps.value}} />
      case 'number': return <Input key={key} type='number' {...defaultProps} />
      case 'bool': return <Checkbox key={key} {...{...defaultProps, checked: defaultProps.value, name: key}} />
      case 'enum' : return <Select key={key} options={this.selectOptions(type)} {...defaultProps} />
    }
  }
}

const styles = {
  row: {
    clear: 'both'
  },

  prop: {
    float: 'left',
    boxSizing: 'border-box',
    info: {
      ...font.size.small,
      width: '55%',
      color: colors.BLUE,
      wordBreak: 'break-all',
      borderLeft: '5px solid transparent',
      padding: `${spaces.small} ${spaces.small} ${spaces.small} ${spaces.smaller}`,
      active: {
        borderLeft: `5px solid ${colors.BLUE}`
      }
    },
    value: {
      ...font.size.small,
      width: '45%',
      color: colors.BLACK_BRIGHT,
      padding: `${spaces.small} ${spaces.normal} ${spaces.small} ${spaces.small}`,
      link: {
        color: colors.BLUE
      }
    },
    small: {
      fontWeight: 'normal',
      fontSize: '95%',
      display: 'block',
      color: colors.BLACK_BRIGHT
    }
  }

}
