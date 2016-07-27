import AceEditor from '../atoms/AceEditor.react';
import PureComponent from 'react-pure-render/component';
import CopyCode from '../atoms/CopyCode.react';
import Icon from '../atoms/Icon.react';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import renderProp from '../../helpers/renderProp';
import spaces from '../styles/Spaces';
import * as colors from '../styles/Colors';

@Radium
export default class SourceCode extends PureComponent {

  static propTypes = {
    componentName: RPT.string.isRequired,
    componentProps: RPT.object,
    componentPropsDefinition: RPT.object,
    customSource: RPT.string,
    name: RPT.string.isRequired,
    showToggle: RPT.bool
  }

  static contextTypes = {
    showSourceCode: RPT.bool,
    toggleSourceCode: RPT.func,
  }

  render() {
    const {componentName, customSource, componentProps, showToggle} = this.props
    const source = customSource || (
      componentProps.get('children')
        ? `<${componentName} \n${this.renderInlineProps(false)}\n>\n  ${componentProps.get('children')}\n</${componentName}>`
        : `<${componentName} \n${this.renderInlineProps()}\n/>`
    )

    return (
      <div style={[styles.copyWrapper, showToggle && styles.copyWrapper.toggle]}>
        {this.renderToggle()}
        <CopyCode inheritedStyles={showToggle && styles.copy} source={source} />
        {this.renderSource(source)}
      </div>
    )
  }

  renderToggle() {
    const {showToggle} = this.props
    const {toggleSourceCode, showSourceCode} = this.context

    if (!showToggle)
      return null

    return (
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
    )
  }

  renderSource(source) {
    const {name, showToggle} = this.props
    const {showSourceCode} = this.context

    if (!showSourceCode && showToggle)
      return null

    return (
      <div style={[styles.sourceWrapper, !showToggle && styles.sourceWrapper.withoutToggle]}>
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
    const {componentProps, componentPropsDefinition} = this.props
    return componentProps
      .filter((_, key) => renderChildren || key !== 'children')
      .filter((_, key) => typeof componentProps.get(key) !== 'undefined')
      .map((value, key) => `  ${renderProp(key, componentPropsDefinition.getIn([key, 'type']), value)}`)
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
    toggle: {
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
    withoutToggle: {
      margin: '10px 0 40px',
      borderWidth: '1px'
    }
  }
};
