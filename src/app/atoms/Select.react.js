import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import * as colors from '../styles/Colors';

@Radium
export default class Select extends Component {
  static propTypes = {
    onChange: RPT.func,
    options: RPT.array.isRequired,
    value: RPT.any
  }

  defaultProps = {
    options: []
  }

  render() {
    const {options, onChange, value} = this.props

    return (
      <div style={styles.selectWrapper}>
        <select onChange={onChange} style={styles.select} value={value}>
          {options}
        </select>
        <div style={styles.selectArrow} />
      </div>
    );
  }

};

const styles = {
  selectWrapper: {
    position: 'relative'
  },

  select: {
    width: '100%',
    height: '30px',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    borderRadius: '0',
    background: 'white',
    padding: '3px 5px',
    outline: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_DARKER,
  },

  selectArrow: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `5px solid ${colors.BLUE}`,
    position: 'absolute',
    top: '50%',
    right: '6px',
    transform: 'translateY(-50%)'
  }
};
