import Component from '../PureRenderComponent.react';
import font from '../styles/Font';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import {TOOLTIP} from '../styles/Colors';

@Radium
export default class ToolTip extends Component {

  static propTypes = {
    children: RPT.any.isRequired,
    inheritedStyles: RPT.oneOfType([RPT.array, RPT.object]),
    kind: RPT.oneOf([
      'top',
      'bottom',
      'left',
      'right'
    ]).isRequired,
  }

  static defaultProps = {
    kind: 'top'
  }

  render() {
    const {children, inheritedStyles, kind} = this.props

    return (
      <div style={[styles.wrapper, inheritedStyles]}>
        <div style={styles.container}>
          {children}
          <i style={[styles.arrow, styles[kind]]} />
        </div>
      </div>
    );
  }

}

const styles = {
  wrapper: {
    ...font,
    ...font.size.small,
    borderRadius: '3px',
    backgroundColor: TOOLTIP,
    color: 'white',
    position: 'absolute',
    zIndex: 2,
    top: '-5px',
    left: 0
  },

  container: {
    position: 'relative',
    padding: '5px'
  },

  arrow: {
    left: '50%',
    borderStyle: 'solid',
    height: 0,
    width: 0,
    position: 'absolute',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderWidth: '5px',
    transition: 'all .1s ease',
    transform: 'translateX(-50%)',
    zIndex: 3
  },

  top: {
    borderTopColor: TOOLTIP,
    top: '100%'
  },

  bottom: {
    borderBottomColor: TOOLTIP,
    bottom: '100%'
  },

  left: {
    borderLeftColor: TOOLTIP,
    left: '100%',
    right: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  },

  right: {
    borderRightColor: TOOLTIP,
    right: '100%',
    left: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}
