import Component from 'react-pure-render/component';
import Radium from 'radium';
import React from 'react';
import {button} from './styleGlobals';

@Radium
export default class Button extends Component {

  static propTypes = {
    children:       React.PropTypes.any.isRequired,
    disabled:       React.PropTypes.bool,
    fullWidth:      React.PropTypes.bool,
    inheritedStyle: React.PropTypes.object,
    kind:           React.PropTypes.oneOf(['primary', 'secondary', 'outlined']).isRequired,
    onClick:        React.PropTypes.func.isRequired,
    size:           React.PropTypes.oneOf(['small', 'large']),
    type:           React.PropTypes.string
  }

  render() {
    const {disabled, kind, size, fullWidth, onClick, inheritedStyle, children, type} = this.props;

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        style={[
          button.base,
          button.kind[kind],
          button.size[size],
          fullWidth && button.fullWidth,
          inheritedStyle
        ]}
        type={type}
      >
        {children}
      </button>
    );
  }
}
