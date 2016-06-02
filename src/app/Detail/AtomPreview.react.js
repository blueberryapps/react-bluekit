import PureComponent from 'react-pure-render/component';
import extendComponentProps from '../../helpers/extendComponentProps';
import filterFunctionProps from '../../helpers/filterFunctionProps';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import resolveComponent from '../../helpers/resolveComponent';

@Radium
export default class AtomPreview extends PureComponent {
  mounted = false

  static propTypes = {
    Component: RPT.object,
    componentProps: RPT.object,
    variantProps: RPT.object
  }

  render() {
    const {Component, componentProps} = this.props

    if (!Component)
      return null

    return (
      <div style={styles}>
        <Component {...componentProps.toJS()}/>
      </div>
    );
  }

};

const styles = {
  position: 'relative',
  minHeight: '35px',
  minWidth: '50px'
}
