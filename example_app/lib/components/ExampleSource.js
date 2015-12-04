import Highlight from './highlight';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import renderProp from './renderProp';
import {Map} from 'immutable';

@Radium
export default class ExampleSource extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
  }

  render() {
    const {atom: {componentName, file}} = this.props

    return (
      <pre style={styles.pre}>
        <Highlight className='javascript'>
        import {componentName} from '{file}'{'\n\n'}
      &lt;{componentName}
        {`\n${this.renderInlineProps()}\n`}
      /&gt;
        </Highlight>
      </pre>
    )
  }

  renderInlineProps() {
    const {componentProps} = this.props
    return Map(componentProps)
      .map((value, key) => `  ${renderProp(key, value)}`)
      .join('\n')
  }

}

const styles = {
  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
    padding: '10px',
  }
};
