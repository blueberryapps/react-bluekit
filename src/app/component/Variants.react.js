import AtomPreview from '../atoms/AtomPreview.react';
import Component from 'react-pure-render/component';
import {fromJS} from 'immutable';
import headingStyles from '../styles/Headings';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import renderProp from '../../libraries/renderProp';
import SourceCode from './SourceCode.react';
import styles from '../styles/Sources';

@Radium
export default class Variants extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    headingColor: RPT.string.isRequired,
    sortedProps: RPT.object
  }

  render() {
    const {sortedProps} = this.props

    if (sortedProps === null)
      return null

    return (
      <div>
        {sortedProps.map((value, key) => this.renderProp(key, value))}
      </div>
    )
  }

  renderNoVariants() {
    return <b style={styles.noVariants}>There are no possible variants</b>
  }

  renderProp(key, definition) {
    const definitionMap = fromJS(definition)
    if (!definitionMap.get('type')) return null

    const name = definitionMap.getIn(['type', 'name'])
    const value = definitionMap.getIn(['type', 'value'])
    switch (name) {
      case 'string': return this.renderVariants(key, name, ['', `String ${key}`])
      case 'number': return this.renderVariants(key, name, [0, 5, 100, 123.45])
      case 'bool': return this.renderVariants(key, name, [false, true])
      case 'enum' : return this.renderEnumVariant(key, name, value)
    }

    return null
  }

  renderEnumVariant(key, name, value) {
    if (typeof value === 'object')
      return this.renderVariants(key, name, value.map(text => text.get('value').replace(/\'/g, '')))
    return null
  }

  renderVariants(key, type, variants) {
    const {headingColor} = this.props

    return (
      <div>
        <div style={styles.panel}>
          <h2
            id={`${key}-variant`}
            style={[headingStyles, headingStyles.preview, {color: headingColor}]}
          >
            Prop variant: <b>{key}</b>
          </h2>
          {variants.map(variant => this.renderVariant(key, type, variant))}
        </div>
      </div>
    )
  }

  renderVariant(key, type, variant) {
    const {atom, componentProps} = this.props
    const variantProps = componentProps.set(key,  variant)
    const source = `<${atom.get('componentName')} ${renderProp(key, type, variant)} />`

    return (
      <div key={variant} style={styles.pre}>
        <div style={styles.clear}>
          <AtomPreview atom={atom} variantProps={variantProps} />
        </div>
        <SourceCode atom={atom} customSource={source} name={`${atom.get('name')}-${key}-${type}-${variant}`} visible />
        <div style={[styles.clear, styles.clear.after]} />
      </div>
    )
  }
}
