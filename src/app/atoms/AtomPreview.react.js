import extendComponentProps from '../../helpers/extendComponentProps';
import filterFunctionProps from '../../helpers/filterFunctionProps';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
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
    const {atom, disableFunctionProps} = this.props
    const props = extendComponentProps(atom.simpleProps, atom.propsDefinition)

    if (disableFunctionProps)
      return filterFunctionProps(props)

    return props
  }

  render() {
    const {atom, variantProps} = this.props

    if (!atom)
      return null

    const ExampleComponent = resolveComponent(atom.component)
    const customProps = variantProps ? variantProps : {}

    return (
      <ExampleComponent {...this.atomProps()} {...customProps} />
    );
  }

};
