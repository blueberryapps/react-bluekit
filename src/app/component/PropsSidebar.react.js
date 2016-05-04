import ColorPicker from 'react-color';
import Component from 'react-pure-render/component';
import Dropdown from '../atoms/Dropdown.react';
import headingStyles from '../styles/Headings'
import Icon from '../atoms/Icon.react';
import font from '../styles/Font';
import PropsTable from './PropsTable.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import spaces from '../styles/Spaces'
import * as colors from '../styles/Colors'

@Radium
export default class PropsSidebar extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.array
  }

  static contextTypes = {
    resetPropsToDefault: RPT.func,
    setSourceBackground: RPT.func,
    toggleProps: RPT.func
  }

  state = {
    activeProps: 'preview',
    displayColorPicker: false,
    dropdownOpened: false
  }

  render() {
    const {toggleProps, setSourceBackground} = this.context
    const {atom, currentProps, simplePropsSelected, triggeredProps} = this.props
    const {activeProps, displayColorPicker, dropdownOpened} = this.state

    return (
      <div style={styles.wrapper}>
        <div ref='controlsHeader' style={styles.controls.header}>
          <h1 style={styles.heading}>{atom.componentName}</h1>
          <div style={styles.dropdown}>
            <Dropdown
              handleGeneralIconClick={this.handleGeneralIconClick.bind(this)}
              handleResetProps={this.resetPropsToDefault.bind(this)}
              handleToggleProps={toggleProps}
              simplePropsSelected={simplePropsSelected}
              visible={dropdownOpened}
            />
          </div>
          <div style={styles.clearfix}>
            <h3
              style={[
                styles.propName,
                activeProps === 'preview' && styles.propName.active
              ]}
            >
              <a href='#preview' onClick={() => this.handlePropsNameClick('preview')} style={styles.propName.link}>
                Preview
              </a>
            </h3>
            <div style={styles.header}>
              <div style={styles.bg}>Background</div>
              <div style={styles.bg.options}>
                <div
                  key='whiteColor'
                  onClick={() => setSourceBackground('#ffffff')}
                  style={styles.bgColor}
                >
                  {this.renderActiveSourceBg('#ffffff')}
                </div>
                <div
                  key='blackColor'
                  onClick={() => setSourceBackground('#000000')}
                  style={[styles.bgColor, styles.bgColor.black]}
                >
                  {this.renderActiveSourceBg('#000000')}
                </div>
                <Icon
                  key='interactiveColor'
                  kind='colorpicker'
                  onClick={this.handleColorPickerClick.bind(this)}
                  size='20px'
                  style={[styles.bgColor, styles.bgColor.interactive]}
                />
                <div
                  style={[
                    styles.colorPicker,
                    displayColorPicker && styles.colorPicker.visible
                  ]}
                >
                  <ColorPicker
                    onChangeComplete={this.handleColorPickerClose.bind(this)}
                  />
                </div>
              </div>
              <div style={styles.separator} />
            </div>
          </div>
        </div>
        <div style={styles.controls.body}>
          <PropsTable
            activeProps={activeProps}
            atom={atom}
            commonStyles={styles}
            componentProps={currentProps}
            handlePropsNameClick={this.handlePropsNameClick.bind(this)}
            triggeredProps={triggeredProps}
          />
        </div>
      </div>
    );
  }

  resetPropsToDefault() {
    const {resetPropsToDefault} = this.context

    this.setState({dropdownOpened: false})
    resetPropsToDefault()
  }

  handleColorPickerClick() {
    const {displayColorPicker} = this.state

    this.setState({displayColorPicker: !displayColorPicker})
  }

  handleColorPickerClose(color) {
    const {setSourceBackground} = this.context

    setSourceBackground(`#${color.hex}`)
    this.setState({displayColorPicker: false})
  }

  handleGeneralIconClick() {
    const {dropdownOpened} = this.state

    this.setState({dropdownOpened: !dropdownOpened})
  }

  handlePropsNameClick(key) {
    this.setState({activeProps: key})
  }

  renderActiveSourceBg(color) {
    const {sourceBackground} = this.props

    return (
      <div
        style={[
          styles.bgColor.active,
          sourceBackground === color && styles.bgColor.active.visible
        ]}
      />
    )
  }

}

const styles = {
  controls: {
    header: {
      paddingTop: spaces.normal,
      flex: '0 0 auto'
    },
    body: {
      flex: '1 1 auto',
      overflow: 'auto',
      paddingTop: '12px'
    }
  },

  colorPicker: {
    display: 'none',
    position: 'absolute',
    zIndex: 2,
    right: '-5px',
    visible: {
      display: 'block'
    }
  },

  bg: {
    ...font,
    float: 'left',
    width: '50%',
    paddingBottom: spaces.normal,
    options: {
      float: 'left',
      width: '50%',
      position: 'relative',
      top: '-5px',
      textAlign: 'right'
    }
  },

  bgColor: {
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: '22px',
    height: '22px',
    marginRight: '7px',
    border: `1px solid ${colors.GRAY_DARKER}`,
    backgroundColor: '#ffffff',
    ':hover': {
      cursor: 'pointer'
    },
    black: {
      backgroundColor: '#000000'
    },
    interactive: {
      backgroundColor: 'transparent',
      border: 0,
      marginRight: 0
    },
    active: {
      opacity: 0,
      backgroundColor: colors.BLUE,
      height: '3px',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      transition: 'opacity .1s linear',
      visible: {
        opacity: 1
      }
    }
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
    width: '75%',
    wordBreak: 'break-all'
  },

  header: {
    padding: `${spaces.small} ${spaces.normal} 0 ${spaces.normal}`
  },

  propName: {
    margin: 0,
    borderLeft: '5px solid transparent',
    padding: `${spaces.small} ${spaces.normal} ${spaces.small} 15px`,
    boxSizing: 'border-box',
    link: {
      ...font,
      ...font.size.normal,
      color: colors.BLUE,
    },
    active: {
      borderLeft: `5px solid ${colors.BLUE}`
    }
  },

  separator: {
    backgroundColor: colors.GRAY_DARKER,
    clear: 'both',
    height: '1px'
  },

  wrapper: {
    position: 'relative',
    backgroundColor: colors.GRAY,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  }
};
