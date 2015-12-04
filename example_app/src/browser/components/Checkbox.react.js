import Component from 'react-pure-render/component';
import ErrorMessage from './ErrorMessage.react';
import Radium from 'radium';
import React from 'react';
import Tooltip from './Tooltip.react';
import {form} from '../components/styleGlobals';

const styles = {
  wrapper: {
    height: form.input.size.regular.height,
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '12px 0'
  },

  label: {
    position: 'relative',
    paddingLeft: '25px',
    paddingRight: '20px',
    userSelect: 'none',
    cursor: 'pointer'
  },

  checkboxLabel: {
    fontWeight: 'normal',
    padding: '2px 5px',
    display: 'inline-block'
  },

  input: {
    position: 'absolute',
    left: '-9999px',
    ':focus': {}
  },

  base: {
    width: '24px',
    height: '24px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsl(0, 0%, 80%)',
    position: 'absolute',
    left: 0,
    top: 0
  },

  baseFocused: {
    borderColor: 'hsl(0, 0%, 50%)',
    backgroundColor: 'hsl(0, 0%, 95%)'
  },

  unchecked: {
    width: '18px',
    height: '18px',
    backgroundColor: '#6dad0d',
    backgroundImage: 'linear-gradient(bottom, #6dad0d 0%, #81d10b 100%)',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transform: 'scale(0, 0)'
  },

  checked: {
    transform: 'scale(1, 1)',
    transition: 'transform .2s'
  }
};

@Radium
export default class Checkbox extends Component {
  static propTypes = {
    error:    React.PropTypes.string,
    label:    React.PropTypes.string.isRequired,
    name:     React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    tooltip:  React.PropTypes.string,
    value:    React.PropTypes.bool
  }

  render() {
    const {name, onChange, label, value, tooltip} = this.props;
    const focused = Radium.getState(this.state, 'input', ':focus');

    return (
      <div style={styles.wrapper}>
        <label htmlFor={name} style={styles.label}>
          <div style={[styles.base, focused && styles.baseFocused]}>
            <div style={[styles.unchecked, value && styles.checked]}
            />
          </div>
          <input
            checked={value}
            id={name}
            key='input'
            name={name}
            onChange={onChange}
            style={styles.input}
            type='checkbox'
          />
        <div style={styles.checkboxLabel}>{label}</div>
          <Tooltip tooltip={tooltip} />
        </label>
        {this.renderError()}
      </div>
    );
  }

  renderError() {
    const {error} = this.props;

    if (!error) return null;

    return <ErrorMessage>{error}</ErrorMessage>;
  }
};
