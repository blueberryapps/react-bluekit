import Component from 'react-pure-render/component';
import font from './styles/Font';
import Icon from './atoms/Icon.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import spaces from './styles/Spaces';
import * as colors from './styles/Colors';

@Radium
export default class ResponsivePropsNav extends Component {

  static propTypes = {
    showMobileProps: RPT.bool,
    toggleMobileProps: RPT.func.isRequired,
  }

  render() {
    const {showMobileProps, toggleMobileProps} = this.props

    return (
      <div onClick={toggleMobileProps.bind(this)} style={styles.wrapper}>
        <strong style={styles.text}>Props and Navigation</strong>
        <Icon
          color={colors.BLUE}
          kind="arrow"
          size={12}
          style={[styles.icon, showMobileProps && styles.icon.opened]}
        />
      </div>
    );
  }

}

const styles = {
  wrapper: {
    position: 'relative',
    zIndex: 8,
    backgroundColor: colors.GRAY,
    padding: `6px 50px 6px ${spaces.normal}`,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`,
    ':hover': {
      cursor: 'pointer'
    }
  },

  icon: {
    position: 'absolute',
    top: '50%',
    right: spaces.normal,
    transform: 'translateY(-50%)',
    transition: 'translate .1s ease-in',
    opened: {
      transform: 'translateY(-50%) rotate(180deg)'
    }
  },

  text: {
    ...font,
    ...font.bold,
    fontSize: '16px',
    display: 'inline-block',
    padding: '6px 0',
  }
}
