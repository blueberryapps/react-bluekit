import AceEditor from 'react-ace';
import Component from 'react-pure-render/component';
import CopyCode from '../atoms/CopyCode.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';

@Radium
export default class SourceCode extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object,
    customSource: RPT.string,
    name: RPT.object.isRequired,
    visible: RPT.bool.isRequired,
  }

  render() {
    const {atom, customSource, componentProps, visible, name} = this.props
    const componentName = atom.get('componentName')
    const file = atom.get('file')

    const source = customSource || (
      componentProps.children
        ? `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps(false)}\n>\n  ${componentProps.children}\n</${componentName}>`
        : `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps()}\n/>`
    )

    return (
      <div style={styles.copyWrapper}>
        <CopyCode inheritedStyles={styles.copy} source={source} />
        <div style={[styles.sourceWrapper, visible && styles.sourceWrapper.visible]}>
          <div style={styles.pre}>
            <AceEditor
              editorProps={{$blockScrolling: true}}
              highlightActiveLine={false}
              maxLines={`${source}`.split(/\n/).length}
              mode="jsx"
              name={name}
              readOnly
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
              }}
              showGutter={false}
              theme="chrome"
              value={source}
            />
          </div>
        </div>
      </div>
    )
  }

  renderInlineProps(renderChildren = true) {
    const {atom} = this.props
    const propsDefinition = atom.get('propsDefinition').toJS()
    const {componentProps} = this.props

    return Object.keys(propsDefinition)
      .filter(key => renderChildren || key !== 'children')
      .filter(key => propsDefinition[key].type)
      .map((key) => `  ${renderProp(key, propsDefinition[key].type.name, componentProps.get(key))}`)
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
