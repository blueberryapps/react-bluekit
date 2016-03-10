import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';

@Radium
export default class Header extends Component {

  render() {
    const {mountPoint} = this.props

    return (
      <header style={styles.wrapper}>
        BlueKit
      </header>
    );
  }

}

const styles = {
  wrapper: {
    backgroundColor: 'rgb(27, 111, 159)',
    padding: '10px 20px'
  },

  link: {
    color: 'white',
    fontSize: '32px',
    fontWeight: '100',
    letterSpacing: '1px',
    textDecoration: 'none',
    ':hover': {
      color: 'hsl(26, 100%, 58%)'
    }
  },

  homeIcon: {
    base: {
      borderTop: 'none',
      borderBottom: '2px solid',
      borderLeft: '2px solid',
      borderRight: '2px solid',
      width: '22px',
      height: '16px',
      margin: '10px 6px 3px',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      fontStyle: 'normal',
      color: 'white',
      textAlign: 'left',
      textIndent: '-9999px',
      direction: 'ltr',
      ':hover': {
        color: 'hsl(26, 100%, 58%)'
      }
    },

    before: {
      borderTop: '2px solid',
      borderBottom: '2px solid transparent',
      borderLeft: '2px solid',
      borderRight: '2px solid transparent',
      width: '22px',
      height: '22px',
      transform: 'rotate(45deg)',
      position: 'absolute',
      left: '-2px',
      top: '-7px',
    },

    after: {
      borderTop: '1px solid',
      borderBottom: 'none',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      width: '6px',
      height: '10px',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
    }
  }
};
