import Button from './Button.react';
import PropsTable from './PropsTable.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {GRAY} from './styles/Colors'

@Radium
export default class ControlsSidebar extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    simplePropsSelected: RPT.bool
  }

  static contextTypes = {
    toggleProps: RPT.func,
    resetPropsToDefault: RPT.func
  }

  render() {
    const {toggleProps, resetPropsToDefault} = this.context
    const {atom, currentProps, simplePropsSelected} = this.props

    return (
      <div style={styles.wrapper}>
        <Button kind='primary' onClick={toggleProps}>{simplePropsSelected ? 'All props' : 'Only required props'}</Button>
        <Button kind='secondary' onClick={resetPropsToDefault}>Reset props to default</Button>
        <PropsTable atom={atom} componentProps={currentProps} />
      </div>
    );
  }

}

const styles = {
  wrapper: {
    backgroundColor: GRAY,
    width: '100%',
    display: 'inline-block',
    minHeight: '100%'
  }
};
