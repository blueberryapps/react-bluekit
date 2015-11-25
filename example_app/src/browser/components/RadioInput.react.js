import Component from 'react-pure-render/component';
import Radium from 'radium';
import React from 'react';
import Tooltip from './Tooltip.react';
import 'rc-tooltip/assets/bootstrap.css';

const styles = {
  wrapper: {
    position: 'relative',
    padding: '0 30px 0 25px',
    userSelect: 'none',
    cursor: 'pointer',
    fontWeight: 'normal',
    '@media (max-width: 991px)': {
      display: 'block',
      margin: '10px 0'
    }
  },

  horizontal: {
    display: 'block'
  },

  input: {
    position: 'absolute',
    left: '-9999px',
    ':focus': {}
  },

  text: {
    padding: '4px 12px',
    display: 'inline-block'
  },

  base: {
    width: '28px',
    height: '28px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsl(0, 0%, 80%)',
    borderRadius: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'border-color .2s ease-in-out'
  },

  baseFocused: {
    borderColor: 'hsl(0, 0%, 50%)',
    backgroundColor: 'hsl(0, 0%, 95%)'
  },

  baseChecked: {
    borderColor: 'hsl(0, 0%, 50%)'
  },

  unchecked: {
    backgroundColor: '#6dad0d',
    backgroundImage: 'linear-gradient(bottom, #6dad0d 0%, #81d10b 100%)',
    width: '14px',
    height: '14px',
    borderRadius: '100%',
    position: 'absolute',
    top: '6px',
    left: '6px',
    transform: 'scale(0, 0)'
  },

  checked: {
    transform: 'scale(1, 1)',
    transition: 'transform .2s'
  }
};

@Radium
export default class RadioInput extends Component {
  static propTypes = {
    horizontal: React.PropTypes.bool,
    name:       React.PropTypes.string.isRequired,
    onChange:   React.PropTypes.func.isRequired,
    selected:   React.PropTypes.bool.isRequired,
    text:       React.PropTypes.string,
    tooltip:    React.PropTypes.string,
    value:      React.PropTypes.string.isRequired
  }

  render() {
    const {name, onChange, selected, value, tooltip, horizontal, text} = this.props;
    const focused = Radium.getState(this.state, 'input', ':focus');
    const optionText = text && text || value;

    return (
      <label style={[styles.wrapper, horizontal && styles.horizontal]}>
        <div style={[
          styles.base,
          selected && styles.baseChecked,
          focused && styles.baseFocused
        ]}>
          <div style={[styles.unchecked, selected && styles.checked]} />
        </div>
        <input
          checked={selected}
          key='input'
          name={name}
          onChange={onChange}
          style={styles.input}
          type='radio'
          value={value}
        />
        <div style={styles.text}>{optionText}</div>
        <Tooltip tooltip={tooltip} />
      </label>
    );
  }
}
