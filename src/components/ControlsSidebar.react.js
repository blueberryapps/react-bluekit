import Dropdown from './atoms/Dropdown.react';
import headingStyles from './styles/Headings'
import font from './styles/Font';
import PropsTable from './PropsTable.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import spaces from './styles/Spaces'
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

  state = {
    dropdownOpened: false
  }

  render() {
    const {toggleProps, resetPropsToDefault} = this.context
    const {atom, currentProps, simplePropsSelected} = this.props
    const {dropdownOpened} = this.state

    return (
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>{atom.componentName}</h1>
        <div style={styles.dropdown}>
          <Dropdown
            handleGeneralIconClick={this.handleGeneralIconClick}
            handleResetProps={resetPropsToDefault}
            handleToggleProps={toggleProps}
            simplePropsSelected={simplePropsSelected}
            visible={dropdownOpened}
          />
        </div>
        <div style={styles.clearfix}>
          <h3 style={[styles.propName, styles.propName.active]}>Preview</h3>
          <div style={styles.header}>
            <div style={styles.bg}>Background</div>
          </div>
        </div>
        <PropsTable atom={atom} componentProps={currentProps} />
      </div>
    );
  }

  handleGeneralIconClick() {
    const {dropdownOpened} = this.state

    this.setState({dropdownOpened: !dropdownOpened})
  }

}

const styles = {
  bg: {
    ...font,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`,
    paddingBottom: spaces.normal,
    marginBottom: spaces.normal
  },

  clearfix: {
    clear: 'both'
  },

  dropdown: {
    float: 'left',
    width: '25%',
    textAlign: 'right',
    paddingRight: '20px',
    boxSizing: 'border-box',
    position: 'relative'
  },

  heading: {
    ...headingStyles,
    boxSizing: 'border-box',
    color: 'black',
    float: 'left',
    padding: `0 ${spaces.normal}`,
    width: '75%'
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
