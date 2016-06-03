import AtomPreview from './AtomPreview.react';
import Component from 'react-pure-render/component';
import headingStyles from '../styles/Headings';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';
import SourceCode from './SourceCode.react';
import styles from '../styles/Sources';

@Radium
export default class Variants extends Component {

  static propTypes = {
    Component: RPT.func.isRequired,
    componentName: RPT.string.isRequired,
    componentProps: RPT.object.isRequired,
    componentPropsDefinition: RPT.object.isRequired,
    headingColor: RPT.string.isRequired
  }

  render() {
    const {componentPropsDefinition} = this.props

    return (
      <div>
        {componentPropsDefinition.map((value, name) => this.renderProp(name, value))}
      </div>
    )
  }

  renderNoVariants() {
    return <b style={styles.noVariants}>There are no possible variants</b>
  }

  renderProp(name, definition) {
    if (!definition.get('type')) return null

    const type = definition.get('type')
    const data = definition.get('data')

    switch (type) {
      case 'string': return this.renderVariants(name, type, ['', `String ${name}`])
      case 'number': return this.renderVariants(name, type, [0, 5, 100, 123.45])
      case 'bool': return this.renderVariants(name, type, [false, true])
      case 'enum' : return this.renderVariants(name, type, data)
      case 'oneOf' : return this.renderVariants(name, type, data)
    }

    return null
  }

  renderVariants(name, type, variants) {
    const {componentName, headingColor} = this.props

    return (
      <div>
        <div style={styles.panel}>
          <h2 id={`${componentName}-${name}-variant`} style={[headingStyles, {color: headingColor}]}>Prop variant: <b>{name}</b></h2>
          {variants.map(variant => this.renderVariant(name, type, variant))}
        </div>
      </div>
    )
  }

  renderVariant(name, type, variant) {
    const {Component, componentName, componentProps, componentPropsDefinition} = this.props
    const variantProps = componentProps.set(name,  variant)
    const source = `<${componentName} ${renderProp(name, type, variant)} />`

    return (
      <div key={`name-${variant}`} style={styles.pre}>
        <div style={styles.clear}>
          <AtomPreview
            Component={Component}
            componentProps={variantProps}
            componentPropsDefinition={componentPropsDefinition}
          />
        </div>
        <SourceCode componentName={componentName} customSource={source} name={`${componentName}-${name}-${type}-${variant}`} visible />
        <div style={[styles.clear, styles.clear.after]} />
      </div>
    )
  }
}
