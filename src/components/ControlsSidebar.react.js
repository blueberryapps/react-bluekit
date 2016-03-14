import Button from './Button.react';
import PropsTable from './PropsTable';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';

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
    backgroundColor: '#dedede',
    width: '300px',
    position: 'fixed',
    left: '250px',
    top: 0,
    bottom: 0
  }
};
