import ColorPicker from '../atoms/ColorPicker.react';
import Component from 'react-pure-render/component';
import Dropdown from '../atoms/Dropdown.react';
import font from '../styles/Font';
import headingStyles from '../styles/Headings';
import Icon from '../atoms/Icon.react';
import {mediaQueries} from '../styles/MediaQueries';
import PropsTable from './PropsTable.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import ReactDOM from 'react-dom';
import spaces from '../styles/Spaces';
import * as colors from '../styles/Colors';

@Radium
export default class PropsSidebar extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.object
  }

  static contextTypes = {
    resetLocalStorage: RPT.func,
    resetPropsToDefault: RPT.func,
    setSourceBackground: RPT.func,
    toggleMobileProps: RPT.func,
    toggleProps: RPT.func
  }

  state = {
    activeProps: 'preview',
    displayColorPicker: false,
    dropdownOpened: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render() {
    const {toggleProps, setSourceBackground} = this.context
    const {atom, currentProps, simplePropsSelected, sourceBackground, triggeredProps} = this.props
    const {activeProps, displayColorPicker, dropdownOpened} = this.state

    return (
      <div style={styles.wrapper}>
        <div ref='controlsHeader' style={styles.controls.header}>
          <h1 style={styles.heading}>{atom.get('componentName')}</h1>
          <div style={styles.dropdown}>
            <Dropdown
              handleIconClick={this.handleDropdownIconClick.bind(this)}
              handleResetLocalStorage={this.resetLocalStorage.bind(this)}
              handleResetProps={this.resetPropsToDefault.bind(this)}
              handleToggleProps={toggleProps}
              simplePropsSelected={simplePropsSelected}
              visible={dropdownOpened}
            />
          </div>
          <p style={styles.description}>{atom.get('description')}</p>
          <div style={styles.clearfix}>
            <h3
              style={[
                styles.propName,
                activeProps === 'component-preview' && styles.propName.active
              ]}
            >
              <a href='#component-preview' onClick={() => this.handlePropsNameClick('component-preview')} style={styles.propName.link}>
                Preview
              </a>
            </h3>
            <div style={styles.bgWrapper}>
              <div style={styles.bg}>Background</div>
              <div style={styles.bg.options}>
                <div
                  key='whiteColor'
                  onClick={() => setSourceBackground('#ffffff')}
                  style={styles.bg.color}
                >
                  {this.renderActiveSourceBg('#ffffff')}
                </div>
                <div
                  key='blackColor'
                  onClick={() => setSourceBackground('#000000')}
                  style={[styles.bg.color, styles.bg.color.black]}
                >
                  {this.renderActiveSourceBg('#000000')}
                </div>
                <Icon
                  key='interactiveColor'
                  kind='colorpicker'
                  onClick={this.handleColorPickerClick.bind(this)}
                  ref="pickerButton"
                  size={20}
                  style={[styles.bg.color, styles.bg.color.interactive]}
                />
                <div
                  style={[
                    styles.colorPicker,
                    displayColorPicker && styles.colorPicker.visible
                  ]}
                >
                  <ColorPicker
                    color={sourceBackground}
                    onChangeComplete={this.handleColorPickerChange.bind(this)}
                    ref="colorpicker"
                    visible={displayColorPicker}
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

  resetLocalStorage() {
    const {resetLocalStorage} = this.context

    this.setState({dropdownOpened: false})
    resetLocalStorage()
  }

  resetPropsToDefault() {
    const {resetPropsToDefault} = this.context

    this.setState({dropdownOpened: false})
    resetPropsToDefault()
  }

  handleDocumentClick = (evt) => {
    const area = ReactDOM.findDOMNode(this.refs.colorpicker)
    const pickerButton = ReactDOM.findDOMNode(this.refs.pickerButton)

    if (!area.contains(evt.target) && !pickerButton.contains(evt.target) && this.state.displayColorPicker) {
      this.setState({displayColorPicker: false})
    }
  }

  handleColorPickerClick() {
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  }

  handleColorPickerChange(color) {
    const {setSourceBackground} = this.context

    setSourceBackground(`#${color.hex}`.replace(/#+/, '#'))
  }

  handleDropdownIconClick() {
    const {dropdownOpened} = this.state

    this.setState({dropdownOpened: !dropdownOpened})
  }

  handlePropsNameClick(key) {
    const {toggleMobileProps} = this.context;

    this.setState({activeProps: key})
    toggleMobileProps()
  }

  renderActiveSourceBg(color) {
    const {sourceBackground} = this.props

    return (
      <div
        style={[
          styles.bg.color.active,
          sourceBackground === color && styles.bg.color.active.visible
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
    left: 'calc(100% - 20px)',
    top: 'calc(100% + 5px)',
    visible: {
      display: 'block'
    },
    [mediaQueries.breakpointTablet]: {
      left: 'auto',
      right: 0
    }
  },

  bg: {
    ...font,
    float: 'left',
    width: '40%',
    paddingBottom: spaces.normal,
    color: {
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
      [mediaQueries.breakpointTablet]: {
        marginRight: '20px'
      },
      black: {
        backgroundColor: '#000000'
      },
      gray: {
        backgroundColor: '#aaaaaa'
      },
      interactive: {
        backgroundColor: 'transparent',
        border: 0,
        marginRight: 0,
        [mediaQueries.breakpointTablet]: {
          marginRight: 0
        }
      },
      active: {
        opacity: 0,
        backgroundColor: colors.BLUE,
        height: '3px',
        position: 'absolute',
        top: 'calc(100% + 1px)',
        left: 0,
        right: 0,
        transition: 'opacity .1s linear',
        visible: {
          opacity: 1
        }
      }
    },
    options: {
      display: 'inline-block',
      width: '60%',
      position: 'relative',
      top: '-5px',
      textAlign: 'right'
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

  description: {
    clear: 'both',
    ...font,
    ...font.size.small,
    color: colors.BLACK_BRIGHT,
    padding: `0 ${spaces.normal}`,
  },

  bgWrapper: {
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
