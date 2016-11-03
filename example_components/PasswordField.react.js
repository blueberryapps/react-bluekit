import Component from 'react-pure-render/component';
import ErrorMessage from './ErrorMessage.react';
import Icon from '../src/app/atoms/Icon.react';
import Radium, {Style} from 'radium';
import React, {PropTypes as RPT} from 'react';

@Radium
export default class PasswordField extends Component {

  static propTypes = {
    error:              RPT.string,
    hidePasswordToggle: RPT.bool,
    label:              RPT.string,
    name:               RPT.string.isRequired,
    onChange:           RPT.func,
    placeholder:        RPT.string,
    tooltip:            RPT.string,
    type:               RPT.string.isRequired,
    value:              RPT.string,
  };

  static defaultProps = {
    hidePasswordToggle: false,
    type: 'password'
  }

  state = {showPassword: false}

  getType() {
    const {showPassword} = this.state;

    return showPassword ? 'text' : 'password';
  }

  toggleVisibility() {
    const {showPassword} = this.state;

    this.setState({showPassword: !showPassword});
  }

  renderStyles() {
    return (
      <Style rules={{
        '.passwordHidden::-webkit-input-placeholder': {
          color: 'white'
        },
        '.passwordHidden::-moz-placeholder': {
          color: 'white'
        },
        '.passwordHidden:-ms-input-placeholder': {
          color: 'white'
        }
      }}
      />
    );
  }

  renderPasswordTogglerIcon() {
    const {showPassword} = this.state;

    return (
      <div onClick={this.toggleVisibility.bind(this)} style={styles.passwordShowIcon}>
        <Icon
          color={showPassword ? '#fff' : '#363636'}
          kind={showPassword ? 'eye' : 'eye-hidden'}
          size={18}
          style={{height: '40px'}}
        />
      </div>
    );
  }

  renderPasswordTogglerText() {
    const {showPassword} = this.state;

    return (
      <a onClick={this.toggleVisibility.bind(this)} style={styles.passwordShowText}>
        {showPassword ? 'Hide password' : 'Show password'}
      </a>
    );
  }

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

  render() {
    const {showPassword} = this.state;
    const {hidePasswordToggle, name, onChange, placeholder, value, error} = this.props;

    return (
      <div style={[styles.wrapper, styles.errorWrapper.base, error && styles.errorWrapper.hasError]}>
        {this.renderStyles()}
        {this.renderLabel()}
        {this.renderTooltip()}
        <div style={styles.inputWrapper}>
          <div style={[styles.passwordWrapper.base, hidePasswordToggle && styles.passwordWrapper.togglerHidden]}>
            <input
              className={showPassword && 'passwordHidden'}
              id={name}
              key="input"
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              style={[
                styles.form.input.base,
                styles.form.input.size.regular,
                styles.input,
                error && styles.errorWrapper.errorInput,
                showPassword && styles.passwordShowed
              ]}
              type={this.getType()}
              value={value}
            />
            {hidePasswordToggle ? null : this.renderPasswordTogglerIcon()}
          </div>
          {hidePasswordToggle ? null : this.renderPasswordTogglerText()}
          <div style={styles.clearfix} />
        </div>
        {this.renderError()}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    margin: '10px 0 40px 0',
    clear: 'both'
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
  },

  inputWrapper: {
    marginTop: '5px',
    position: 'relative',
    height: '40px',
    maxWidth: '400px'
  },

  input: {
    padding: '0px 40px 0px 20px',
    width: '100%',
    height: '100%',
    float: 'left'
  },

  passwordWrapper: {
    base: {
      height: '40px',
      display: 'inline-block',
      position: 'relative',
      width: 'calc(100% - 105px)',
      verticalAlign: 'middle'
    },

    togglerHidden: {
      width: '100%'
    }
  },

  passwordShowIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    height: '40px',
    width: '40px',
    textAlign: 'center',
    cursor: 'pointer'
  },

  passwordShowText: {
    display: 'inline-block',
    color: 'hsl(0, 0%, 20%)',
    cursor: 'pointer',
    fontSize: '10px',
    marginLeft: '10px',
    textTransform: 'uppercase',
    verticalAlign: 'middle',
    borderBottom: '1px solid #B3B5B6',
    userSelect: 'none',
    transition: 'border-bottom .2s',
    ':hover': {
      color: '#8c0013',
      borderBottom: '1px solid #8c0013'
    }
  },
  passwordShowed: {
    backgroundColor: 'hsl(0, 0%, 70%)',
    color: 'white'
  }
};
