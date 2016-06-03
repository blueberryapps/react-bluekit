import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import transformPropNodes from '../../helpers/transformPropNodes';

@Radium
export default class AtomPreview extends PureComponent {
  mounted = false

  static propTypes = {
    Component: RPT.object,
    componentProps: RPT.object,
    componentPropsDefinition: RPT.object
  }

  render() {
    const {Component, componentProps, componentPropsDefinition} = this.props

    if (!Component)
      return null

    return (
      <div style={styles}>
        <Component {...transformPropNodes(componentProps, componentPropsDefinition).toJS()}/>
      </div>
    );
  }

};

const styles = {
  position: 'relative',
  minHeight: '35px',
  minWidth: '50px'
}
