import Button from './Button.react';
import headingStyles from './styles/Headings'
import font from './styles/Font';
import PropsTable from './PropsTable.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import * as colors from './styles/Colors'

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
        <h1 style={styles.heading}>{atom.componentName}</h1>
        <div>
          <h3 style={[styles.propName, styles.propName.active]}>Preview</h3>
          <div style={styles.header}>
            <div style={styles.bg}>Background</div>
          </div>
        </div>
        <Button kind='primary' onClick={toggleProps}>{simplePropsSelected ? 'All props' : 'Only required props'}</Button>
        <Button kind='secondary' onClick={resetPropsToDefault}>Reset props to default</Button>
        <PropsTable atom={atom} componentProps={currentProps} />
      </div>
    );
  }

}

const spaces = {
  normal: '20px',
  small: '8px'
}

const styles = {
  bg: {
    ...font,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`,
    paddingBottom: spaces.normal,
    marginBottom: spaces.normal
  },

  heading: {
    ...headingStyles,
    color: 'black',
    padding: `0 ${spaces.normal}`
  },

  header: {
    padding: `${spaces.small} ${spaces.normal}`
  },

  propName: {
    ...font,
    ...font.size.normal,
    margin: 0,
    borderLeft: '5px solid transparent',
    color: colors.BLUE,
    padding: `${spaces.small} ${spaces.normal} ${spaces.small} 15px`,
    boxSizing: 'border-box',
    active: {
      borderLeft: `5px solid ${colors.BLUE}`
    }
  },

  wrapper: {
    backgroundColor: colors.GRAY,
    width: '100%',
    display: 'inline-block',
    minHeight: '100%',
    padding: `${spaces.normal} 0`
  }
};
