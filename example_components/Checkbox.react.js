import Component from 'react-pure-render/component';
import ErrorMessage from './ErrorMessage.react';
import Radium from 'radium';
import React from 'react';
import ToolTip from '../src/app/atoms/ToolTip.react';


/**
 * A simple checkbox element
 */
@Radium
export default class Checkbox extends Component {
  /**
   * @param {String} [error] - An error string
   * @param {String} label - Checkbox label
   * @param {String} name - The name of the checkbox component
   */

  static propTypes = {
    /**
     * Error prop description
     */
    error:    React.PropTypes.string,
    label:    React.PropTypes.string.isRequired,
    name:     React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    tooltip:  React.PropTypes.string,
    value:    React.PropTypes.bool
  }

  render() {
    const {name, onChange, label, value, tooltip} = this.props;
    const focused = Radium.getState(this.state, 'input', ':focus');

    return (
      <div style={styles.wrapper}>
        <label style={styles.label}>
          <div style={[styles.base, focused && styles.baseFocused]}>
            <div style={[styles.unchecked, value && styles.checked]}
            />
          </div>
          <input
            checked={value}
            key='input'
            name={name}
            onChange={onChange}
            style={styles.input}
            type='checkbox'
          />
          <div style={styles.checkboxLabel}>{label}</div>
          {tooltip &&
            <ToolTip inheritedStyles={styles.tooltip}>
              {tooltip}
            </ToolTip>
          }
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

const styles = {
  wrapper: {
    height: '50px',
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
    padding: '0 6px',
    display: 'inline-block',
    position: 'relative',
    top: '3px'
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
    top: '3px',
    left: '3px',
    transform: 'scale(0, 0)'
  },

  checked: {
    transform: 'scale(1, 1)',
    transition: 'transform .2s'
  },

  tooltip: {
    bottom: 'calc(100% + 10px)',
    top: 'auto'
  },

  form: {
    input: {
      base: {
        fontWeight: '300',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'hsl(0, 0%, 80%)',
        outline: 'none',
        WebkitAppearance: 'none',
        borderRadius: 0,
        transition: 'border-color .2s',
        ':focus': {
          borderColor: 'hsl(0, 0%, 40%)'
        }
      },
      size: {
        regular: {
          height: '50px',
          padding: '0 20px',
          fontSize: '16px',
          '@media (max-width: 480px)': {
            height: '40px'
          }
        },
        large: {
          fontSize: '18px',
          padding: '20px 20px',
          '@media (max-width: 480px)': {
            padding: '10px 15px',
            fontSize: '15px'
          }
        }
      }
    }
  }
};
