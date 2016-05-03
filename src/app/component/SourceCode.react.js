import CopyCode from '../atoms/CopyCode.react';
import Highlight from '../atoms/Highlight.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';

@Radium
export default class SourceCode extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object.isRequired,
    visible: RPT.bool.isRequired
  }

  render() {
    const {componentProps} = this.props

    return componentProps.children
      ? this.renderWithChildren()
      : this.renderWithoutChildren()
  }

  renderWithChildren() {
    const {atom: {componentName, file}, componentProps, visible} = this.props
    const source = `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps()}\n>\n  ${componentProps.children}\n</${componentName}>`

    return (
      <div style={styles.copyWrapper}>
        <CopyCode inheritedStyles={styles.copy} source={source} />
        <div style={[styles.sourceWrapper, visible && styles.sourceWrapper.visible]}>
          <div style={styles.pre}>
            <Highlight className='javascript'>
              {source}
            </Highlight>
          </div>
        </div>
      </div>
    )
  }

  renderWithoutChildren() {
    const {atom: {componentName, file}, visible} = this.props
    const source = `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps()}\n/>`

    return (
      <div style={styles.copyWrapper}>
        <CopyCode inheritedStyles={styles.copy} source={source} />
          <div style={[styles.sourceWrapper, visible && styles.sourceWrapper.visible]}>
            <div style={styles.pre}>
              <Highlight className='javascript'>
                {source}
              </Highlight>
            </div>
          </div>
      </div>
    )
  }

  renderInlineProps() {
    const {atom: {propsDefinition}} = this.props

    const {componentProps} = this.props

    return Object.keys(componentProps)
      .map((key) => `  ${renderProp(key, propsDefinition[key].type.name, componentProps[key])}`)
      .join('\n')
  }

}

const styles = {
  copy: {
    backgroundColor: 'transparent',
    top: '-17px'
  },

  copyWrapper: {
    position: 'relative'
  },

  pre: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },

  sourceWrapper: {
    position: 'relative',
    display: 'none',
    visible: {
      display: 'block'
    }
  }
};
