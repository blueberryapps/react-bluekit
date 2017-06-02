import Component from '../PureRenderComponent.react';
import PropsSidebar from './PropsSidebar.react';
import Preview from './Preview.react';
import extendProps from '../../libraries/extendProps';
import extendComponentProps from '../../libraries/extendComponentProps';
import {mediaQueries} from '../styles/MediaQueries';
import Radium, {StyleRoot} from 'radium';
import React from 'react';
import RPT from 'prop-types';
import ReactDOM from 'react-dom';
import resolveComponent from '../../libraries/resolveComponent';
import * as colors from '../styles/Colors';

@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    showMobileProps: RPT.bool,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    toggleMobileProps: RPT.func.isRequired,
    triggeredProps: RPT.object
  }

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired,
    setAtomProp: RPT.func.isRequired
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

  getCurrentComponent() {
    const {selectAtom, selectedAtom, componentsIndex} = this.props
    const atom = componentsIndex.get(selectedAtom)
    if (!atom) {
      setTimeout(() => selectAtom(null), 10)
      return null
    }
    return componentsIndex.get(selectedAtom)
  }

  getCurrentProps() {
    const {simplePropsSelected} = this.props
    const {createSetAtomProp, setAtomProp} = this.context
    const atom = this.getCurrentComponent()
    const defaultProps = simplePropsSelected ? atom.get('simpleProps') : atom.get('fullProps')
    const customProps = this.props.customProps.get(atom.get('name')) || {}

    return extendProps({
      component: resolveComponent(atom.get('component')),
      createSetAtomProp,
      customProps,
      defaultProps,
      propsDefinition: atom.get('propsDefinition'),
      setAtomProp
    })
  }

  getComponentExtendendProps() {
    const propsDefinition = this.getCurrentComponent().get('propsDefinition')

    return extendComponentProps(this.getCurrentProps(), propsDefinition)
  }

  textColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16)
    const g = parseInt(hex.substr(3, 2), 16)
    const b = parseInt(hex.substr(5, 2), 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return (yiq >= 128) ? colors.BLACK_BRIGHT : colors.GRAY_BRIGHT
  }

  sortProps(propsDefinition) {
    if (propsDefinition.size === 0)
      return null
    else
      return propsDefinition.sortBy((_, key) => key)
  }

  render() {
    const atom = this.getCurrentComponent()
    const propsDefinition = atom.get('propsDefinition')
    const sortedProps = this.sortProps(propsDefinition)

    const currentProps = this.getCurrentProps()
    const extendedProps = this.getComponentExtendendProps()
    const {showMobileProps, simplePropsSelected, sourceBackground, toggleMobileProps, triggeredProps} = this.props

    const headingColor = this.textColor(sourceBackground)

    return (
      <StyleRoot>
        <div
          style={[
            styles.wrapper,
            styles.wrapper.sidebar,
            showMobileProps && styles.wrapper.mobilePropsOpened
          ]}
        >
          <PropsSidebar
            atom={atom}
            currentProps={currentProps}
            simplePropsSelected={simplePropsSelected}
            sortedProps={sortedProps}
            sourceBackground={sourceBackground}
            toggleMobileProps={toggleMobileProps}
            triggeredProps={triggeredProps}
          />
        </div>
        <div
          ref="wrapper"
          style={[
            styles.wrapper,
            styles.wrapper.detail,
            {backgroundColor: sourceBackground}
          ]}
        >
          <Preview
            atom={atom}
            currentProps={currentProps}
            extendedProps={extendedProps}
            headingColor={headingColor}
            sortedProps={sortedProps}
          />
        </div>
      </StyleRoot>
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
      [mediaQueries.breakpointTablet]: {
        position: 'fixed',
        top: 'auto',
        width: '100%',
        right: 0,
        bottom: '100%',
        zIndex: 7,
        transition: 'all .2s ease-out',
      }
    },
    mobilePropsOpened: {
      [mediaQueries.breakpointTablet]: {
        bottom: 0,
        top: '88px'
      }
    },
    detail: {
      width: '75%',
      right: 0,
      overflow: 'auto',
      [mediaQueries.breakpointTablet]: {
        width: '100%'
      }
    }
  }
}
