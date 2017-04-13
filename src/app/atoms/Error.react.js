import {BLACK_BRIGHT} from '../styles/Colors';
import Component from 'react-pure-render/component';
import Icon from './Icon.react';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';

@Radium
export default class Error extends Component {

  static propTypes = {
    error: RPT.any
  }

  state = {
    stackShowed: false
  }

  render() {
    const {error} = this.props;
    const {stackShowed} = this.state;

    if (typeof error !== 'object')
      return (
        <div style={styles.wrapper}>
          <Icon color={styles.icon.color} kind="error" size={16} style={styles.icon} />
          {error}
        </div>
      )

    return (
      <div
        onClick={() => this.setState({stackShowed: !stackShowed})}
        style={styles.wrapper}
      >
        <Icon color={styles.icon.color} kind="error" size={16} style={styles.icon} />
        <Icon
          color={BLACK_BRIGHT}
          kind="arrow"
          size={10}
          style={[
            styles.arrowIcon,
            !stackShowed && styles.arrowIcon.closed
          ]}
          wrapperStyle={styles.arrowIconWrapper}
        />
        {error.message}
        {error.stack && !stackShowed && '...'}
        {error.stack && stackShowed && <pre style={styles.code}><code>{error.stack}</code></pre>}
      </div>
    );
  }
};

const styles = {
  wrapper: {
    color: 'red',
    cursor: 'pointer',
    backgroundColor: 'rgba(255,0,0,.1)',
    padding: '3px',
    border: '1px solid rgba(255,0,0,.3)',
    overflow: 'auto'
  },

  arrowIconWrapper: {
    marginRight: '5px',
    display: 'inline-block'
  },

  arrowIcon: {
    transition: 'transform .1s linear',
    closed: {
      transform: 'rotate(-90deg)'
    }
  },

  icon: {
    color: 'red',
    paddingRight: '5px',
    position: 'relative',
    top: '2px'
  },

  code: {
    padding: '0 3px',
    marginBottom: '8px'
  }
};
