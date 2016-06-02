import PureComponent from 'react-pure-render/component';
import React, {PropTypes as RPT} from 'react';
import Preview from './Preview.react';
import * as colors from '../styles/Colors';
import getComponentProps from '../../helpers/getComponentProps';
import getComponentPropsDefinition from '../../helpers/getComponentPropsDefinition';
import Radium from 'radium';
import PropsSidebar from './PropsSidebar.react';
import {List} from 'immutable';

@Radium
export default class Page extends PureComponent {

  static propTypes = {
    Component: RPT.func.isRequired,
    backgroundColor: RPT.string,
    componentName: RPT.string,
    customProps: RPT.object,
    simplePropsSelected: RPT.bool
  }


  textColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16)
    const g = parseInt(hex.substr(3, 2), 16)
    const b = parseInt(hex.substr(5, 2), 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return (yiq >= 128) ? colors.BLACK_BRIGHT : colors.GRAY_BRIGHT
  }

  render() {
    const {Component, componentName, customProps, backgroundColor, simplePropsSelected} = this.props
    const definition = getComponentPropsDefinition(Component)
    const componentProps = getComponentProps(definition, simplePropsSelected).mergeDeep(customProps)
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
            triggeredProps={List([])}
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
