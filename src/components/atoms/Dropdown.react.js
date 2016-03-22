import font from '../styles/Font';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import ReactDOM from 'react-dom';
import * as colors from '../styles/Colors'

@Radium
export default class Dropdown extends Component {

  static propTypes = {
    handleGeneralIconClick: RPT.func.isRequired,
    handleResetProps: RPT.func.isRequired,
    handleToggleProps: RPT.func.isRequired,
    simplePropsSelected: RPT.bool,
    visible: RPT.bool.isRequired
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick)
  }

   /* using fat arrow to bind to instance */
   handleDocumentClick = (evt) => {
     const area = ReactDOM.findDOMNode(this.refs.dropdown)

     if (!area.contains(evt.target) && this.props.visible) {
       this.props.handleGeneralIconClick()
     }
   }

  render() {
    const {
      handleGeneralIconClick,
      handleResetProps,
      handleToggleProps,
      simplePropsSelected,
      visible
    } = this.props
    const hovered = Radium.getState(this.state, 'dropdown-option1', ':hover');

    return (
      <div ref='dropdown' style={styles.general}>
        <i
          onClick={handleGeneralIconClick}
          style={styles.generalIcon}
        >
          Set
        </i>
        <div
          style={[styles.wrapper, visible && styles.wrapper.visible]}
        >
          <ul style={styles.list}>
            <li
              key='dropdown-option1'
              onClick={handleToggleProps}
              style={[styles.list.option, font]}
            >
              {simplePropsSelected ? 'All props' : 'Only required props'}
            </li>
            <li
              key='dropdown-option2'
              onClick={handleResetProps}
              style={[styles.list.option, font]}
            >
              Reset props to default
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
    backgroundColor: 'white',
    width: '200px',
    border: `1px solid ${colors.GRAY_DARKER}`,
    position: 'absolute',
    top: '105%',
    right: '-13px',
    boxSizing: 'border-box',
    display: 'none',
    textAlign: 'left',
    zIndex: 10,
    visible: {
      display: 'block'
    }
  },

  general: {
    position: 'relative',
    textAlign: 'right'
  },

  generalIcon: {
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
    right: '5px',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: 'white',
    borderWidth: '6px',
    marginLeft: '-6px',
    transform: 'translateX(-50%)',
    transition: 'all .1s ease',
    zIndex: 3,
    hovered: {
      borderBottomColor: colors.BLUE
    },
    bordered: {
      bottom: '100%',
      right: '5px',
      borderStyle: 'solid',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderColor: 'rgba(136, 183, 213, 0)',
      borderBottomColor: colors.GRAY_DARKER,
      borderWidth: '7px',
      marginLeft: '-7px',
      transform: 'translateX(-37%)',
      zIndex: 2,
    }
  }
};
