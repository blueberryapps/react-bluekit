import {Component} from 'react';
import React from 'react';

const styles = {
  wrapper: {
    position: 'relative',
    padding: '0 30px 0 25px',
    userSelect: 'none',
    cursor: 'pointer',
    fontWeight: 'normal'
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

export default class RadioInput extends Component {
  static propTypes = {
    horizontal: React.PropTypes.bool,
    name:       React.PropTypes.string.isRequired,
    onChange:   React.PropTypes.func.isRequired,
    selected:   React.PropTypes.bool.isRequired,
    text:       React.PropTypes.string,
    value:      React.PropTypes.string.isRequired
  }

  render() {
    const {name, onChange, selected, value, horizontal, text} = this.props;
    const optionText = text && text || value;

    return (
      <label style={[styles.wrapper, horizontal && styles.horizontal]}>
        <div style={[
          styles.base,
          selected && styles.baseChecked
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
      </label>
    );
  }
}
