import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import * as colors from '../styles/Colors'

export const INPUT_DEFAULT = 'inputDefault';
export const INPUT_SEARCH = 'inputSearch';

@Radium
export default class Input extends Component {
  static propTypes = {
    inheritedStyle: RPT.oneOfType([RPT.array, RPT.object]),
    key: RPT.string,
    kind: RPT.oneOf([
      INPUT_DEFAULT,
      INPUT_SEARCH
    ]),
    onChange: RPT.func.isRequired,
    type: RPT.oneOf(['text', 'number', 'email']).isRequired,
    value: RPT.string.isRequired
  }

  static defaultProps = {
    inheritedStyle: {},
    kind: INPUT_DEFAULT
  };

  render() {
    const {inheritedStyle, key, kind, onChange, type, value} = this.props;

    return (
      <input
        key={key}
        onChange={onChange}
        style={[
          styles.base,
          styles[kind],
          inheritedStyle
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
  [INPUT_DEFAULT]: {
    backgroundColor: 'white'
  },
  [INPUT_SEARCH]: {
    ...font,
    fontSize: '13px',
    padding: '10px',
    height: '40px',
    backgroundColor: colors.GRAY
  }
};
