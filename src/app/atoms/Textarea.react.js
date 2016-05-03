import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import * as colors from '../styles/Colors'

@Radium
export default class Input extends Component {
  static propTypes = {
    key: RPT.string,
    onChange: RPT.func.isRequired,
    value: RPT.string.isRequired
  }

  render() {
    const {key, onChange, value} = this.props;

    return (
      <textarea
        key={key}
        onChange={onChange}
        style={styles.textarea}
        value={value}
      />
    );
  }

};

const styles = {
  textarea: {
    width: '100%',
    height: '80px',
    outline: 'none',
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_BRIGHT,
    padding: '3px 5px',
    fontSize: '11px',
    lineHeight: '1.5',
    ':focus': {
      borderColor: colors.BLUE_LIGHT
    }
  },
};
