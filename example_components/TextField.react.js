import Component from 'react-pure-render/component';
import ErrorMessage from './ErrorMessage.react';
import Icon from '../src/app/atoms/Icon.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';

@Radium
export default class TextField extends Component {
  static propTypes = {
    error:          RPT.string,
    fullWidth:      RPT.bool,
    icon:           RPT.string,
    iconSize:       RPT.string,
    inheritedStyle: RPT.object,
    label:          RPT.string,
    name:           RPT.string.isRequired,
    onBlur:         RPT.func,
    onChange:       RPT.func,
    placeholder:    RPT.string,
    tooltip:        RPT.string,
    type:           RPT.string.isRequired,
    unit:           RPT.string,
    value:          RPT.string
  };

  static defaultProps = {
    fullWidth: false,
    type: 'text'
  };

  renderError() {
    const {error} = this.props;

    if (!error) return null;

    return <ErrorMessage>{error}</ErrorMessage>;
  }

  renderTooltip() {
    const {tooltip} = this.props;

    if (!tooltip) return null;

    return <div style={[styles.form.hint, styles.hint]}>{tooltip}</div>;
  }

  renderLabel() {
    const {name, label} = this.props;

    if (!label) return null;

    return (
      <label
        htmlFor={name}
        style={[styles.form.label, styles.label]}
      >
        {label}
      </label>
    );
  }

  renderUnit() {
    const {unit} = this.props;

    if (!unit) return null;

    return <div key="unit" style={styles.unit}>{unit}</div>;
  }

  renderPrependBlock() {
    const {icon, iconSize, error} = this.props;
    const size = iconSize || 24;
    const prependFocused = Radium.getState(this.state, 'input', ':focus');

    if (!icon) return null;

    return (
      <div style={[
        styles.prepend,
        prependFocused && styles.prependFocus,
        error && styles.errorInput
      ]}
      >
        <Icon
          color="#00b2d5"
          kind="search"
          size={size}
          wrapperStyle={styles.icon}
        />
      </div>
    );
  }

  render() {
    const {fullWidth, icon, inheritedStyle, name, onChange, placeholder, unit, value, type, error, onBlur} = this.props;
    const prependAndUnit = (icon && unit);
    const prependOrUnit = (icon || unit);

    return (
      <div style={[styles.wrapper, styles.errorWrapper.base, error && styles.errorWrapper.hasError]}>
       {this.renderLabel()}
       {this.renderTooltip()}
       <div style={[styles.inputWrapper, fullWidth && styles.inputWrapperFull]}>
          {this.renderPrependBlock()}
          <input
            id={name}
            key="input"
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            style={[
              styles.form.input.base,
              styles.form.input.size.regular,
              styles.input.base,
              prependOrUnit && styles.input.prepend,
              prependAndUnit && styles.input.prependAndUnit,
              error && styles.errorWrapper.errorInput,
              inheritedStyle
            ]}
            type={type}
            value={value}
          />
          {this.renderUnit()}
          <div style={styles.clearfix} />
        </div>
        {this.renderError()}
      </div>
    );
  }

}

const styles = {
  wrapper: {
    margin: '10px 0 25px 0',
    clear: 'both'
  },

  label: {
    display: 'block',
  },

  inputWrapper: {
    position: 'relative',
    height: '40px',
    maxWidth: '400px'
  },

  inputWrapperFull: {
    maxWidth: '100%'
  },

  prepend: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d4d4d4',
    borderRightWidth: '0',
    width: '58px',
    height: '40px',
    transition: 'border-color .2s',
    boxSizing: 'border-box',
    float: 'left',
    '@media (max-width: 480px)?': {
      height: '40px'
    }
  },

  prependFocus: {
    borderColor: '#00b2d5'
  },

  icon: {
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: '40px',
    '@media (max-width: 480px)?': {
      lineHeight: '40px',
      fontSize: '20px'
    }
  },

  input: {
    base: {
      width: '100%',
      height: '100%',
      float: 'left'
    },

    prepend: {
      width: 'calc(100% - 100px)'
    },

    prependAndUnit: {
      width: 'calc(100% - 160px)'
    }
  },

  unit: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontWeight: '300',
    color: 'hsl(0, 0%, 70%)',
    height: '40px',
    lineHeight: '40px',
    paddingRight: '20px',
    userSelect: 'none',
    '@media (max-width: 480px)?': {
      height: '40px',
      lineHeight: '40px'
    }
  },

  form: {
    input: {
      base: {
        boxSizing: 'border-box',
        color: 'hsl(0, 0%, 30%)',
        fontWeight: '300',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'hsl(0, 0%, 80%)',
        outline: 'none',
        WebkitAppearance: 'none',
        borderRadius: 0,
        transition: 'border-color .2s',
        ':focus': {
          borderColor: '#00b2d5'
        }
      },
      size: {
        regular: {
          height: '40px',
          padding: '0 20px',
          fontSize: '14px',
          '@media (max-width: 480px)': {
            height: '40px'
          }
        },
        large: {
          fontSize: '18px',
          padding: '20px 20px',
          '@media (max-width: 480px)?': {
            padding: '10px 15px',
            fontSize: '15px'
          }
        }
      }
    }
  },

  errorWrapper: {
    base: {
      display: 'block',
      margin: '10px 0 25px 0',
      transition: 'border-left 0.2s'
    },
    hasError: {
      borderLeft: '4px solid #8c0013',
      paddingLeft: '16px'
    },
    errorInput: {
      borderColor: '#8c0013',
      boxShadow: 'none',
      transition: 'box-shadow 0.2s',
      ':focus': {
        borderColor: '#a60017',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ff405a'
      }
    }
  },

  clearfix: {
    clear: 'both'
  }
};
