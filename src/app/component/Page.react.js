import Component from 'react-pure-render/component';
import PropsSidebar from './PropsSidebar.react';
import Preview from './Preview.react';
import extendProps from '../../helpers/extendProps';
import extendComponentProps from '../../helpers/extendComponentProps';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import resolveComponent from '../../helpers/resolveComponent';

@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    selectedAtom: RPT.string,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.array
  }

  static contextTypes = {
    createSetAtomProp: RPT.func.isRequired,
    setAtomProp: RPT.func.isRequired
  }

  getCurrentComponent() {
    const {selectedAtom, componentsIndex} = this.props

    return componentsIndex[selectedAtom]
  }

  getCurrentProps() {
    const {simplePropsSelected} = this.props
    const {createSetAtomProp, setAtomProp} = this.context
    const atom = this.getCurrentComponent()
    const defaultProps = simplePropsSelected ? atom.simpleProps : atom.fullProps
    const customProps = this.props.customProps[atom.name] || {}

    return extendProps({
      component: resolveComponent(atom.component),
      createSetAtomProp,
      customProps,
      defaultProps,
      propsDefinition: atom.propsDefinition,
      setAtomProp
    })
  }

  getComponentExtendendProps() {
    const {propsDefinition} = this.getCurrentComponent()

    return extendComponentProps(this.getCurrentProps(), propsDefinition)
  }

  render() {
    const atom = this.getCurrentComponent()
    const currentProps = this.getCurrentProps()
    const extendedProps = this.getComponentExtendendProps()
    const {simplePropsSelected, sourceBackground, triggeredProps} = this.props

    return (
      <div>
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
    overflowY: 'auto',
    sidebar: {
      width: '25%',
      left: 0,
    },
    detail: {
      width: '75%',
      right: 0,
    }
  }
}
