import Checkbox from '../atoms/Checkbox.react';
import Component from 'react-pure-render/component';
import HtmlEditor from '../atoms/HtmlEditor.react';
import JsonEditor from '../atoms/JsonEditor.react';
import font from '../styles/Font';
import Input from '../atoms/Input.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import Select from '../atoms/Select.react';
import spaces from '../styles/Spaces';
import * as colors from '../styles/Colors';
import {styles as commonStyles} from './PropsSidebar.react';

class PropsTableRow extends Component {

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired
  }

  static propTypes = {
    activeProps: RPT.string,
    componentName: RPT.string,
    componentProps: RPT.object,
    definition: RPT.object,
    handlePropsNameClick: RPT.func,
    name: RPT.object,
    scope: RPT.array,
    triggeredProps: RPT.object,
  }

  render() {
    const {activeProps, definition, name, scope, triggeredProps, componentName, componentProps} = this.props

    if (!definition.get('type')) return null

    const required = definition.get('required')
    const triggered = triggeredProps.includes(name)

    if (definition.get('type') === 'shape')
      return (
        <div>
          {definition.get('data').map((definition, subName) =>
            <RadiumPropsTableRow
              componentName={componentName}
              componentProps={componentProps}
              definition={definition}
              key={subName}
              name={subName}
              scope={scope.concat(name)}
              triggeredProps={triggeredProps}
            />
          )}
        </div>
      )

    const fullWidth = ['any', 'array', 'arrayOf', 'element', 'enum', 'node', 'object', 'shape', 'string'].indexOf(definition.get('type')) !== -1

    return (
      <div key={name}>
        <div style={styles.row}>
          <div
            style={[
              font,
              styles.prop,
              styles.prop.name,
              fullWidth && styles.prop.fullWidth, styles.prop.fullWidth.name,
              required && styles.prop.required,
              activeProps === name && commonStyles.propName.active
            ]}
          >
            {this.renderNameOfProp()}
            {required && '*'}
            <small style={styles.prop.small}>{definition.get('type')}</small>
          </div>
          <div
            style={[
              styles.prop,
              styles.prop.value,
              fullWidth && styles.prop.fullWidth,
              triggered && {backgroundColor: colors.GRAY_BRIGHT}]}
          >
            {definition.get('type') === 'func'
              ? 'func()'
              : this.renderValueSelection()
            }
          </div>
        </div>
        <div styles={styles.clearfix} />
      </div>
    )
  }

  renderNameOfProp() {
    const {definition, componentName, name, handlePropsNameClick} = this.props

    const propName = this.getPropPath().join('.')

    if (['string', 'number', 'bool', 'enum'].indexOf(definition.get('type')) === -1)
      return propName
    else
      return (
        <a
          href={`#${componentName}-${propName}-variant`}
          onClick={() => handlePropsNameClick(name)}
          style={styles.prop.value.link}
        >
          {propName}
        </a>
      )
  }

  getPropPath() {
    const {name, scope} = this.props
    return scope.concat(name)
  }

  renderValueSelection() {
    const {componentName, componentProps, definition, name, scope} = this.props
    const {createSetAtomProp} = this.context
    const selectionName = `${componentName}-${this.getPropPath().join('-')}`

    const defaultProps = {
      onChange: createSetAtomProp(componentName, name, definition.get('type'), scope),
      value: componentProps.getIn(this.getPropPath())
    }

    switch (definition.get('type')) {
      case 'any': return     <Input key={selectionName} type='text' {...defaultProps} />
      case 'array': return   <JsonEditor key={selectionName} name={name} {...defaultProps} />
      case 'arrayOf': return <JsonEditor key={selectionName} name={name} {...defaultProps} />
      case 'bool': return    <Checkbox key={selectionName} name={name} {...{...defaultProps, checked: defaultProps.value}} />
      case 'element': return <HtmlEditor key={selectionName} name={name} {...defaultProps} />
      case 'oneOf' : return  this.renderEnum(name, defaultProps)
      case 'node': return    <HtmlEditor key={selectionName} name={name} {...defaultProps} />
      case 'number': return  <Input key={selectionName} type='number' {...defaultProps} />
      case 'object': return  <JsonEditor key={selectionName} name={name} {...defaultProps} />
      case 'shape': return   <JsonEditor key={selectionName} name={name} {...defaultProps} />
      case 'string': return  <Input key={selectionName} type='text' {...defaultProps} />
    }
    return null
  }

  renderEnum(name, defaultProps) {
    const {definition} = this.props

    if (typeof definition.get('data') === 'object')
      return <Select key={name} options={this.selectOptions()} {...defaultProps} />

    return <Input key={name} type='text' {...defaultProps} />
  }

  selectOptions() {
    const {definition} = this.props

    const options = definition.get('data')
      .map(v => <option value={v.replace(/'/g, '')}>{v.replace(/'/g, '')}</option>)

    if (!definition.get('required'))
      return [<option value=''></option>].concat(options)

    return options
  }
}

const RadiumPropsTableRow = Radium(PropsTableRow)
export default RadiumPropsTableRow;

const styles = {
  clearfix: {
    clear: 'both'
  },

  row: {
    paddingBottom: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'none'
  },

  prop: {
    float: 'left',
    boxSizing: 'border-box',
    name: {
      ...font.size.small,
      width: '55%',
      color: colors.BLUE,
      wordBreak: 'break-all',
      borderLeft: '5px solid transparent',
      padding: `0 ${spaces.small} 0 ${spaces.smaller}`,
      transition: 'all .2s ease-out',
      active: {
        borderLeft: `5px solid ${colors.BLUE}`
      }
    },
    value: {
      ...font.size.small,
      width: '45%',
      color: colors.BLACK_BRIGHT,
      padding: `0 ${spaces.normal} 0 ${spaces.small}`,
      link: {
        color: colors.BLUE
      }
    },
    small: {
      fontWeight: 'normal',
      fontSize: '95%',
      display: 'block',
      color: colors.BLACK_BRIGHT
    },
    fullWidth: {
      width: '100%',
      padding: `0 ${spaces.normal}`,
      name: {
        padding: `0 ${spaces.normal} 2px 15px`
      }
    },
    required: {
      fontWeight: 'bold'
    },
    noProps: {
      ...font,
      ...font.bold,
      padding: `8px ${spaces.normal}`
    }
  }
}
