import Component from 'react-pure-render/component';
import PropsSidebar from './PropsSidebar.react';
import Preview from './Preview.react';
import extendProps from '../../helpers/extendProps';
import extendComponentProps from '../../helpers/extendComponentProps';
import Radium, {StyleRoot} from 'radium';
import React, {PropTypes as RPT} from 'react';
import resolveComponent from '../../helpers/resolveComponent';
import * as colors from '../styles/Colors';

@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.object
  }

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired,
    setAtomProp: RPT.func.isRequired
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

  render() {
    const atom = this.getCurrentComponent()
    if (!atom)
      return null
    const currentProps = this.getCurrentProps()
    const extendedProps = this.getComponentExtendendProps()
    const {simplePropsSelected, sourceBackground, triggeredProps} = this.props

    const headingColor = this.textColor(sourceBackground)

    return (
      <StyleRoot>
        <div style={[styles.wrapper, styles.wrapper.sidebar]}>
          <PropsSidebar
            atom={atom}
            currentProps={currentProps}
            simplePropsSelected={simplePropsSelected}
            sourceBackground={sourceBackground}
            triggeredProps={triggeredProps}
          />
        </div>
        <div
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
    },
    detail: {
      width: '75%',
      right: 0,
      overflow: 'auto'
    }
  }
}
