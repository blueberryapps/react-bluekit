import Component from 'react-pure-render/component'
import ErrorMessage from './ErrorMessage.react'
import Icon from './Icon.react'
import Radium from 'radium'
import React from 'react'
import {colors, form, clearfix} from './styleGlobals'

const styles = {
  wrapper: {
    margin: '10px 0 40px 0',
    clear: 'both'
  },

  label: {
    display: 'block'
  },

  inputWrapper: {
    marginTop: '5px',
    position: 'relative',
    height: form.input.size.regular.height,
    maxWidth: '400px'
  },

  prepend: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d4d4d4',
    borderRightWidth: '0',
    width: '58px',
    height: form.input.size.regular.height,
    transition: 'border-color .2s',
    float: 'left',
    '@media (max-width: 480px)': {
      height: '40px'
    }
  },

  prependFocus: {
    borderColor: 'hsl(0, 0%, 40%)'
  },

  icon: {
    lineHeight: form.input.size.regular.height,
    textAlign: 'center',
    fontSize: '58px',
    '@media (max-width: 480px)': {
      lineHeight: '40px',
      fontSize: '20px'
    }
  },

  input: {
    width: 'calc(100% - 58px)',
    height: '100%',
    float: 'left'
  },

  unit: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontWeight: '300',
    color: colors.grayLight,
    height: form.input.size.regular.height,
    lineHeight: form.input.size.regular.height,
    paddingRight: '20px',
    userSelect: 'none',
    '@media (max-width: 480px)': {
      height: '40px',
      lineHeight: '40px'
    }
  },

  errorInput: {
    borderColor: '#ff1744'
  }
};

@Radium
export default class TextField extends Component {
  static propTypes = {
    children:    React.PropTypes.any,
    error:       React.PropTypes.string,
    icon:        React.PropTypes.string,
    iconSize:    React.PropTypes.string,
    label:       React.PropTypes.string,
    name:        React.PropTypes.string.isRequired,
    onChange:    React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    tooltip:     React.PropTypes.string,
    type:        React.PropTypes.string.isRequired,
    unit:        React.PropTypes.string,
    value:       React.PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const {name, children, onChange, placeholder, value, type, tooltip, error} = this.props

    return (
      <div style={styles.wrapper}>
       {this.renderLabel()}
       {this.renderTooltip()}
       <div style={styles.inputWrapper}>
          {this.renderPrependBlock()}
          <input
            id={name}
            key='input'
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={[
              form.input.base,
              form.input.size.regular,
              styles.input,
              error && styles.errorInput
            ]}
            tooltip={tooltip}
            type={type}
            value={value}
          />
          {children}
          {this.renderUnit()}
          <div style={clearfix} />
        </div>
        {this.renderError()}
      </div>
    );
  };

  renderError() {
    const {error} = this.props;

    if (!error) return null;

    return <ErrorMessage>{error}</ErrorMessage>;
  }

  renderTooltip() {
    const {tooltip} = this.props;

    if (!tooltip) return null;

    return <div style={[form.hint, styles.hint]}>{tooltip}</div>;
  }

  renderLabel() {
    const {name, label} = this.props;

    if (!label) return null;

    return (
      <label
        htmlFor={name}
        style={[form.label, styles.label]}
      >
        {label}
      </label>
    );
  }

  renderUnit() {
    const {unit} = this.props;

    if (!unit) return null;

    return <div key='unit' style={styles.unit}>{unit}</div>;
  }

  renderPrependBlock() {
    const {icon, iconSize, error} = this.props;
    const size = iconSize || '24px';
    const prependFocused = Radium.getState(this.state, 'input', ':focus');

    if (!icon) return null;

    return (
      <div style={[
        styles.prepend,
        prependFocused && styles.prependFocus,
        error && styles.errorInput
      ]}>
        <Icon
          color='#60ad30'
          inheritedStyle={styles.icon}
          kind={icon}
          size={size}
        />
      </div>
    );
  }
};
