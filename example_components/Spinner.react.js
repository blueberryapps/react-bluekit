import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import {Range} from 'immutable';

@Radium
export default class Spinner extends Component {

  static propTypes = {
    color: RPT.string
  }

  static defaultProps = {
    color: 'black'
  }

  render() {
    const {color} = this.props
    const spinner = Range(1, 13).toArray().map((i) =>
      <div key={i} style={[styles.circle, styles[`circle${i}`]]}>
        <div style={[styles.circleBefore, {backgroundColor: color}, styles[`fading${i}`]]} />
      </div>
    );

    return <div style={styles.wrapper}>{spinner}</div>;
  }
}

const styles = getStyles();

function getStyles() {
  const circleFadeDelay = Radium.keyframes({
    '0%, 39%, 100%': {
      opacity: 0
    },
    '40%': {
      opacity: 1
    }
  }, 'fade');

  const otherStyles = {
    wrapper: {
      width: '24px',
      height: '24px',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '10px'
    },

    circle: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    },

    circleBefore: {
      margin: '0 auto',
      width: '15%',
      height: '15%',
      borderRadius: '100%',
      animation: 'circleFadeDelay 1.2s infinite ease-in-out both',
      animationName: circleFadeDelay
    }
  };

  return Range(1, 13).reduce((styles, number) => {
    const delay = (number * 0.1 - 1.1).toFixed(1);
    styles[`circle${number}`] = {transform: `rotate(${number * 30}deg)`}; // eslint-disable-line no-param-reassign
    styles[`fading${number}`] = {animationDelay: `${delay}s`}; // eslint-disable-line no-param-reassign

    return styles;
  }, otherStyles);
}
