import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Icon from './Icon.react';
import {mediaQueries} from '../styles/MediaQueries';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import ReactDOM from 'react-dom';
import * as colors from '../styles/Colors'

@Radium
export default class Dropdown extends Component {

  static propTypes = {
    handleIconClick: RPT.func,
    handleResetLocalStorage: RPT.func,
    handleResetProps: RPT.func,
    handleToggleProps: RPT.func,
    simplePropsSelected: RPT.bool,
    visible: RPT.bool.isRequired
  }

  static defaultProps = {
    visible: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  /* using fat arrow to bind to instance */
  handleDocumentClick = (evt) => {
    const area = ReactDOM.findDOMNode(this.refs.dropdown)

    if (!area.contains(evt.target) && this.props.visible && this.props.handleIconClick) {
      this.props.handleIconClick()
    }
  }

  render() {
    const {
      handleIconClick,
      handleResetLocalStorage,
      handleResetProps,
      handleToggleProps,
      simplePropsSelected,
      visible
    } = this.props
    const hovered = Radium.getState(this.state, 'dropdown-option1', ':hover');

    return (
      <div ref='dropdown' style={styles.wrapper}>
        <i
          onClick={handleIconClick}
          style={styles.iconWrapper}
        >
          <Icon color={colors.BLUE} kind='settings' size={21} />
        </i>
        <div
          style={[styles.dropdownWrapper, visible && styles.dropdownWrapper.visible]}
        >
          <ul style={styles.list}>
            <li
              key='dropdown-option1'
              onClick={handleToggleProps}
              style={[styles.list.option, font]}
            >
              {simplePropsSelected ? 'Preset all props' : 'Preset only required props'}
            </li>
            <li
              key='dropdown-option2'
              onClick={handleResetProps}
              style={[styles.list.option, font]}
            >
              Reset props to default
            </li>
            <li
              key='dropdown-option3'
              onClick={handleResetLocalStorage}
              style={[styles.list.option, font]}
            >
              Reset local storage
            </li>
          </ul>
          <i style={[styles.arrow, hovered && styles.arrow.hovered]} />
          <i style={styles.arrow.bordered} />
        </div>
      </div>
    );
  }

}

const styles = {
  wrapper: {
    position: 'relative',
    textAlign: 'right'
  },

  dropdownWrapper: {
    backgroundColor: 'white',
    width: '200px',
    border: `1px solid ${colors.GRAY_DARKER}`,
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 'calc(100% + -25px)',
    boxSizing: 'border-box',
    display: 'none',
    textAlign: 'left',
    zIndex: 10,
    visible: {
      display: 'block'
    },
    [mediaQueries.breakpointTablet]: {
      left: 'auto',
      right: 0
    }
  },

  iconWrapper: {
    ':hover': {
      cursor: 'pointer'
    }
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    option: {
      color: colors.BLACK_BRIGHT,
      padding: '8px 8px 8px 32px',
      transition: 'all .1s ease',
      ':hover': {
        backgroundColor: colors.BLUE,
        color: 'white',
        cursor: 'pointer'
      }
    }
  },

  arrow: {
    bottom: '100%',
    left: '13px',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: 'white',
    borderWidth: '6px',
    transform: 'translateX(-50%)',
    transition: 'all .1s ease',
    zIndex: 3,
    hovered: {
      borderBottomColor: colors.BLUE
    },
    [mediaQueries.breakpointTablet]: {
      right: '-2px',
      left: 'auto'
    },
    bordered: {
      bottom: '100%',
      left: '6px',
      borderStyle: 'solid',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderColor: 'rgba(136, 183, 213, 0)',
      borderBottomColor: colors.GRAY_DARKER,
      borderWidth: '7px',
      zIndex: 2,
      [mediaQueries.breakpointTablet]: {
        right: '3px',
        left: 'auto'
      }
    }
  }
};
