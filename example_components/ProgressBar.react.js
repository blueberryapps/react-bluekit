import Component from 'react-pure-render/component';
import Radium from 'radium';
import React from 'react';

@Radium
export default class ProgressBar extends Component {

  static propTypes = {
    activeStep: React.PropTypes.number.isRequired
  }

  render() {
    const {activeStep} = this.props;
    const steps = ['About your friend', 'About you', 'Confirmation'];
    const progressbar = [];

    steps.forEach((segment, index) => {
      const isActive = activeStep >= index + 1;
      const circle = (
        <div style={[styles.circle, isActive && styles.circleActive]} />
      );
      const notLast = steps.length !== index + 1;

      progressbar.push(
        <div key={index} style={[styles.segment, isActive && styles.segmentActive]}>
          {notLast && circle}
          <div style={styles.text}>{segment}</div>
        </div>
      );
    });

    return <div style={styles.wrapper}>{progressbar}</div>;
  }
}

const styles = {
  wrapper: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '30px 0',
    color: '#c6c6c6',
    '@media (min-width: 481px) and (max-width: 768px)': {
      padding: '30px 15px'
    }
  },

  segment: {
    width: '240px',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: '#e8e8e8',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    paddingTop: '18px',
    '@media (max-width: 768px)': {
      width: '33.3333%'
    }
  },

  circle: {
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    backgroundColor: '#e8e8e8',
    position: 'absolute',
    right: '-4px',
    top: '-5px',
    zIndex: '1'
  },

  segmentActive: {
    borderTopColor: '#75ac1d',
    fontWeight: 'bold',
    color: '#333333'
  },

  circleActive: {
    backgroundColor: '#75ac1d'
  },

  text: {
    textAlign: 'center'
  }
};
