import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import * as colors from '../styles/Colors'

@Radium
export default class Input extends Component {
  static propTypes = {
    key: RPT.string,
    onChange: RPT.func.isRequired,
    type: RPT.oneOf(['text', 'input']).isRequired,
    value: RPT.string.isRequired
  }

  render() {
    const {key, onChange, type, value} = this.props;

    return (
      <input
        key={key}
        onChange={onChange}
        style={styles.input}
        type={type}
        value={value}
        {...this.props}
      />
    );
  }

};

const styles = {
  input: {
    width: '100%',
    height: '30px',
    outline: 'none',
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_BRIGHT,
    padding: '3px 5px',
    ':focus': {
      borderColor: colors.BLUE_LIGHT
    }
  },
};
