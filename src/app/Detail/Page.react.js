import PureComponent from 'react-pure-render/component';
import React, {PropTypes as RPT} from 'react';
import Preview from './Preview.react';
import * as colors from '../styles/Colors';
import getComponentProps from '../../helpers/getComponentProps';
import getComponentPropsDefinition from '../../helpers/getComponentPropsDefinition';
import extendComponentProps from '../../helpers/extendComponentProps';
import Radium from 'radium';
import ReactDOM from 'react-dom';
import PropsSidebar from './PropsSidebar.react';

@Radium
export default class Page extends PureComponent {

  static contextTypes = {
    createSetAtomProp: RPT.func
  }

  static propTypes = {
    Component: RPT.func.isRequired,
    backgroundColor: RPT.string,
    componentName: RPT.string,
    customProps: RPT.object,
    selectedAtom: RPT.string,
    simplePropsSelected: RPT.bool,
    triggeredProps: RPT.object
  }

  componentDidUpdate(previousProps) {
    const {selectedAtom} = this.props
    if (selectedAtom !== previousProps.selectedAtom)
      this.scrollDetailToTop()
  }

  scrollDetailToTop() {
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    if (wrapper)
      wrapper.scrollTop = 0
  }

  textColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16)
    const g = parseInt(hex.substr(3, 2), 16)
    const b = parseInt(hex.substr(5, 2), 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return (yiq >= 128) ? colors.BLACK_BRIGHT : colors.GRAY_BRIGHT
  }

  render() {
    const {createSetAtomProp} = this.context
    const {Component, componentName, customProps, backgroundColor, simplePropsSelected, triggeredProps} = this.props
    const definition = getComponentPropsDefinition(Component)
    const componentProps = extendComponentProps(getComponentProps(definition, simplePropsSelected).mergeDeep(customProps), componentName, definition, createSetAtomProp)
    const headingColor = this.textColor(backgroundColor)

    return (
      <div>
        <div style={[styles.wrapper, styles.wrapper.sidebar]}>
          <PropsSidebar
            Component={Component}
            backgroundColor={backgroundColor}
            componentName={componentName}
            componentProps={componentProps}
            componentPropsDefinition={definition}
            simplePropsSelected={simplePropsSelected}
            triggeredProps={triggeredProps}
          />
        </div>
        <div
          ref="wrapper"
          style={[
            styles.wrapper,
            styles.wrapper.detail,
            {backgroundColor: backgroundColor}
          ]}
        >
          <Preview
            Component={Component}
            componentName={componentName}
            componentProps={componentProps}
            componentPropsDefinition={definition}
            headingColor={headingColor}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    sidebar: {
      width: '25%',
      left: 0,
    },
    detail: {
      width: '75%',
      right: 0,
      overflow: 'auto'
    }
  }
}
