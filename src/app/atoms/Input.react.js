import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import * as colors from '../styles/Colors';

@Radium
export default class Input extends Component {
  static propTypes = {
    inheritedStyles: RPT.oneOfType([RPT.array, RPT.object]),
    key: RPT.string,
    kind: RPT.oneOf([
      'inputDefault',
      'inputSearch'
    ]),
    onChange: RPT.func,
    type: RPT.string.isRequired,
    value: RPT.string.isRequired
  }

  static defaultProps = {
    inheritedStyle: {},
    kind: 'inputDefault',
    value: 'Default value'
  }

  render() {
    const {inheritedStyles, key, kind, onChange, type, value} = this.props;

    return (
      <input
        key={key}
        onChange={onChange}
        style={[
          styles.base,
          styles[kind],
          inheritedStyles
        ]}
        type={type}
        value={value}
        {...this.props}
      />
    );
  }

};

const styles = {
  base: {
    width: '100%',
    height: '30px',
    outline: 'none',
    boxSizing: 'border-box',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.GRAY_DARKER,
    padding: '3px 5px',
    ':focus': {
      borderColor: colors.BLUE_LIGHT
    }
  },

  inputDefault: {
    backgroundColor: 'white'
  },

  inputSearch: {
    ...font,
    fontSize: '13px',
    padding: '10px',
    height: '40px',
    backgroundColor: colors.GRAY
  }
};
