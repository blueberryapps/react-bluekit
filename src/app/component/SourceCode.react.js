import AceEditor from '../atoms/AceEditor.react';
import Component from 'react-pure-render/component';
import CopyCode from '../atoms/CopyCode.react';
import font from '../styles/Font';
import Icon from '../atoms/Icon.react';
import {mediaQueries} from '../styles/MediaQueries';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import renderProp from '../../libraries/renderProp';
import spaces from '../styles/Spaces';
import * as colors from '../styles/Colors';

@Radium
export default class SourceCode extends Component {

  static propTypes = {
    atom: RPT.object.isRequired,
    componentProps: RPT.object,
    customSource: RPT.string,
    name: RPT.string.isRequired,
    showToggle: RPT.bool
  }

  static contextTypes = {
    showSourceCode: RPT.bool,
    toggleSourceCode: RPT.func,
  }

  render() {
    const {atom, customSource, componentProps, showToggle} = this.props
    const componentName = atom.get('componentName')
    const file = atom.get('file')
    const source = customSource || (
      componentProps.get('children')
        ? `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps(false)}\n>\n  ${componentProps.get('children')}\n</${componentName}>`
        : `import ${componentName} from '${file}' \n\n<${componentName} \n${this.renderInlineProps()}\n/>`
    )

    return (
      <div style={[styles.copyWrapper, showToggle && styles.copyWrapper.toggle]}>
        {showToggle && this.renderToggle(source)}
        {this.renderSource(source)}
      </div>
    )
  }

  renderToggle(source) {
    const {toggleSourceCode, showSourceCode} = this.context

    return (
      <div style={styles.sourceHeader.container}>
        <div
          onClick={toggleSourceCode.bind(this)}
          style={styles.sourceHeader}
        >
          <Icon color={colors.BLUE} kind='code' size={28} wrapperStyle={styles.icon.code} />
          {showSourceCode ? 'Hide ' : 'Show '}
          source code
          <Icon
            color={colors.BLUE}
            kind='arrow'
            size={10}
            wrapperStyle={[
              styles.icon.arrow,
              showSourceCode && styles.sourceHeader.visible.arrow
            ]}
          />
        </div>
        <CopyCode inheritedStyles={styles.copy} source={source} />
      </div>
    )
  }
  renderSource(source) {
    const {name, showToggle} = this.props
    const {showSourceCode} = this.context

    if (!showSourceCode && showToggle)
      return null

    return (
      <div style={[!showToggle && styles.sourceContainer]}>
        <div style={[styles.sourceBox, !showToggle && styles.sourceBox.withoutToggle]}>
          {!showToggle &&
            <CopyCode source={source} />
          }
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
      .filter(key => typeof componentProps.get(key) !== 'undefined')
      .map((key) => `  ${renderProp(key, propsDefinition[key].type.name, componentProps.get(key))}`)
      .join('\n')
  }

}

const styles = {
  copy: {
    backgroundColor: 'transparent',
    top: '34px'
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
    zIndex: 1,
    ':hover': {
      cursor: 'pointer'
    },
    visible: {
      arrow: {
        transform: 'rotate(180deg)'
      }
    },
    container: {
      paddingTop: '30px',
      position: 'relative'
    }
  },

  copyWrapper: {
    position: 'relative',
    toggle: {
      marginBottom: '50px',
      [mediaQueries.breakpointTablet]: {
        marginBottom: '15px'
      }
    }
  },

  pre: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },

  sourceContainer: {
    padding: '15px 0 40px',
    [mediaQueries.breakpointTablet]: {
      padding: '10px 0 15px'
    }
  },

  sourceBox: {
    backgroundColor: 'white',
    position: 'relative',
    padding: '15px',
    borderWidth: '0 1px 1px 1px',
    borderColor: colors.GRAY_DARKER,
    borderStyle: 'solid',
    margin: 0,
    withoutToggle: {
      borderWidth: '1px',
    }
  }
};
