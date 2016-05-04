import Component from 'react-pure-render/component';
import extendComponentProps from '../../helpers/extendComponentProps';
import filterFunctionProps from '../../helpers/filterFunctionProps';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import resolveComponent from '../../helpers/resolveComponent';

@Radium
export default class AtomPreview extends Component {
  mounted = false

  static propTypes = {
    atom: RPT.object,
    disableFunctionProps: RPT.bool,
    variantProps: RPT.object
  }

  atomProps() {
    const {atom, disableFunctionProps, variantProps} = this.props
    const simpleProps = atom.get('simpleProps').toJS()
    const filteredProps = disableFunctionProps ? filterFunctionProps(simpleProps) : simpleProps
    const customProps = variantProps ? variantProps : {}

    return extendComponentProps(filteredProps, atom.get('propsDefinition')).mergeDeep(extendComponentProps(customProps, atom.get('propsDefinition')))
  }

  render() {
    const {atom} = this.props

    if (!atom)
      return null

    const ExampleComponent = resolveComponent(atom.get('component'))

    return (
      <ExampleComponent {...this.atomProps().toJS()}/>
    );
  }

};
