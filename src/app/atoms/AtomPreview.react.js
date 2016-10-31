import Component from 'react-pure-render/component';
import extendComponentProps from '../../libraries/extendComponentProps';
import filterFunctionProps from '../../libraries/filterFunctionProps';
import notResolved from '../../libraries/notResolved';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import resolveComponent from '../../libraries/resolveComponent';
import wrapComponentWithRescue from '../../libraries/wrapComponentWithRescue';

@Radium
export default class AtomPreview extends Component {
  mounted = false

  static propTypes = {
    atom: RPT.object,
    disableFunctionProps: RPT.bool,
    variantProps: RPT.object
  }

  state = {
    component: this.resolveComponentFromProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      component: this.resolveComponentFromProps(nextProps)
    })
  }

  resolveComponentFromProps(props) {
    if (!props.atom)
      return null;

    return wrapComponentWithRescue(resolveComponent(props.atom.get('component')));
  }

  atomProps(props) {
    const {atom, disableFunctionProps, variantProps} = props
    const simpleProps = atom.get('simpleProps').toJS()
    const filteredProps = disableFunctionProps ? filterFunctionProps(simpleProps) : simpleProps
    const extendedFiltered = extendComponentProps(filteredProps, atom.get('propsDefinition'))
    const customProps = variantProps ? variantProps : {}
    const extendedCustom = extendComponentProps(customProps, atom.get('propsDefinition'))
    const extendedProps = extendedFiltered.mergeDeep(extendedCustom)

    return extendedProps;
  }

  render() {
    const ExampleComponent = this.state.component || notResolved(this.props)
    return (
      <div style={styles}>
        <ExampleComponent {...this.atomProps(this.props).toJS()}/>
      </div>
    );
  }

};

const styles = {
  position: 'relative',
  minHeight: '35px',
  minWidth: '50px'
}
