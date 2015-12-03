import Highlight from './highlight';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import renderProp from './renderProp';
import resolveComponent from '../resolveComponent';
import {Map} from 'immutable';

@Radium
export default class Variants extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    styles: RPT.object.isRequired,
  }

  render() {
    const {atom: {propsDefinition}} = this.props

    return (
      <div>
        {Map(propsDefinition).map((value, key) => this.renderProp(key, value))}
      </div>
    )
  }

  renderNoVariants() {
    return <i>There are no possible variants</i>
  }

  renderProp(key, definition) {
    const {type: {name, value}} = definition

    switch (name) {
      case 'string': return this.renderVariants(key, ['', `Default string ${key}`])
      case 'number': return this.renderVariants(key, [0, 1, 100, 1234.56])
      case 'bool': return this.renderVariants(key, [false, true])
      case 'enum' : return this.renderVariants(key, value.map(text => text.value.replace(/\'/g, '')))
    }

    return null
  }

  renderVariants(key, variants) {
    const {styles} = this.props

    return (
      <div style={[styles.paddedElement, styles.panel]}>
        <h3 id={key}>Prop variant: {key}</h3>
        {variants.map(variant => this.renderVariant(key, variant))}
      </div>
    )
  }

  renderVariant(key, variant) {
    const {atom, componentProps} = this.props
    const ExampleAtom = resolveComponent(atom.component)
    const variantProps = {...componentProps, [key]: variant}

    return (
      <div key={variant}>
        <Highlight style={styles.pre} className='javascript'>
          &lt;{atom.componentName} {renderProp(key, variant)} /&gt;
        </Highlight>

        <ExampleAtom {...variantProps} />
      </div>
    )
  }
}

const styles = {
  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
    padding: '0px',
    margin: '0px'
  }
};
