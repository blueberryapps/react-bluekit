import Highlight from './highlight';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import renderProp from '../helpers/renderProp';

@Radium
export default class ExampleSource extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
  }

  render() {
    const {componentProps} = this.props

    return componentProps.children
      ? this.renderWithChildren()
      : this.renderWithoutChildren()
  }

  renderWithChildren() {
    const {atom: {componentName, file}, componentProps} = this.props

    return (
      <div style={styles.pre}>
        <Highlight className='javascript'>
        import {componentName} from '{file}'{'\n\n'}
      &lt;{componentName}
        {`\n${this.renderInlineProps()}\n`}
      &gt;
        {`\n  ${componentProps.children}\n`}
      &lt;/{componentName}&gt;
        </Highlight>
      </div>
    )
  }

  renderWithoutChildren() {
    const {atom: {componentName, file}} = this.props

    return (
      <div style={styles.pre}>
        <Highlight className='javascript'>
        import {componentName} from '{file}'{'\n\n'}
      &lt;{componentName}
        {`\n${this.renderInlineProps()}\n`}
      /&gt;
        </Highlight>
      </div>
    )
  }

  renderInlineProps() {
    const {componentProps} = this.props
    return Object.keys(componentProps)
      .map((key) => `  ${renderProp(key, componentProps[key])}`)
      .join('\n')
  }

}

const styles = {
  pre: {
    margin: 0,
    padding: 0
  }
};
