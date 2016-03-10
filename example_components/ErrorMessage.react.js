import {Component} from 'react';
import Radium from 'radium'
import React from 'react'
import {colors} from './styleGlobals'

const styles = {
  wrapper: {
    color: 'white',
    backgroundColor: colors.error,
    marginTop: '6px',
    padding: '3px 10px',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '400px'
  },

  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightWidth: '4px',
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
    borderBottomWidth: '4px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.error,
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '-4px',
    left: '25px'
  }
};

@Radium
export default class ErrorMessage extends Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired,
    type: React.PropTypes.string
  }

  render() {
    const {children} = this.props

    return (
      <div style={styles.wrapper}>
        <div className='errorMessage' style={styles.errorMessage}>{children}</div>
        <div style={styles.arrow} />
      </div>
    );
  }
};
