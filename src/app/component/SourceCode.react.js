import AceEditor from '../atoms/AceEditor.react';
import Component from 'react-pure-render/component';
import CopyCode from '../atoms/CopyCode.react';
import Icon from '../atoms/Icon.react';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';
import spaces from '../styles/Spaces';
import * as colors from '../styles/Colors';

@Radium
export default class SourceCode extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object,
    customSource: RPT.string,
    name: RPT.object.isRequired,
    showToggl: RPT.bool
  }

  static contextTypes = {
    showSourceCode: RPT.bool,
    toggleSourceCode: RPT.func,
  }

  render() {
    const {atom, customSource, componentProps, showToggl} = this.props
    const componentName = atom.get('componentName')
    const file = atom.get('file')
    const source = customSource || (
      componentProps.get('children')
        ? `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps(false)}\n>\n  ${componentProps.get('children')}\n</${componentName}>`
        : `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps()}\n/>`
    )

    return (
      <div style={[styles.copyWrapper, showToggl && styles.copyWrapper.toggl]}>
        {this.renderToggl()}
        <CopyCode inheritedStyles={showToggl && styles.copy} source={source} />
        {this.renderSource(source)}
      </div>
    )
  }

  renderToggl() {
    const {showToggl} = this.props
    const {toggleSourceCode, showSourceCode} = this.context

    if (!showToggl)
      return null

    return (
      <div
        onClick={toggleSourceCode.bind(this)}
        style={styles.sourceHeader}
      >
        <Icon color={colors.BLUE} kind='code' size='28px' wrapperStyle={styles.icon.code} />
        {showSourceCode ? 'Hide ' : 'Show '}
        source code
        <Icon
          color={colors.BLUE}
          kind='arrow'
          size='10px'
          wrapperStyle={[
            styles.icon.arrow,
            showSourceCode && styles.sourceHeader.visible.arrow
          ]}
        />
      </div>
    )
  }
  renderSource(source) {
    const {name, showToggl} = this.props
    const {showSourceCode} = this.context

    if (!showSourceCode && showToggl)
      return null

    return (
      <div style={[styles.sourceWrapper, !showToggl && styles.sourceWrapper.withoutToggl]}>
        <div style={styles.pre}>
          <AceEditor
            editorProps={{$blockScrolling: true}}
            fontSize={11}
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
            showPrintMargin={false}
            theme="chrome"
            value={source}
            width="100%"
          />
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
    top: '2px'
  },

  icon: {
    code: {
      position: 'absolute',
      left: '15px',
      top: '10px'
    },
    arrow: {
      position: 'absolute',
      right: '61px',
      top: '15px'
    }
  },

  sourceHeader: {
    ...font,
    border: `1px solid ${colors.GRAY_DARKER}`,
    backgroundColor: colors.GRAY,
    fontSize: '15px',
    padding: `${spaces.smaller} ${spaces.smaller} ${spaces.smaller} 55px`,
    position: 'relative',
    marginTop: '30px',
    zIndex: 1,
    ':hover': {
      cursor: 'pointer'
    },
    visible: {
      arrow: {
        transform: 'rotate(180deg)'
      }
    }
  },

  copyWrapper: {
    position: 'relative',
    toggl: {
      marginBottom: '50px'
    }
  },

  pre: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },

  sourceWrapper: {
    backgroundColor: 'white',
    position: 'relative',
    padding: '15px',
    borderWidth: '0 1px 1px 1px',
    borderColor: colors.GRAY_DARKER,
    borderStyle: 'solid',
    margin: 0,
    withoutToggl: {
      margin: '30px 0',
      borderWidth: '1px'
    }
  }
};
