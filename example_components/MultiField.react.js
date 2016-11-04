import Component from 'react-pure-render/component';
import ErrorMessage from './ErrorMessage.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import {Range} from 'immutable';

@Radium
export default class MultiField extends Component {

  static propTypes = {
    delimiter: RPT.string,
    error: RPT.string,
    fields: RPT.arrayOf(RPT.shape({
      length: RPT.number.isRequired,
      placeholder: RPT.string,
      type: RPT.oneOf(['text', 'number'])
    })),
    inheritedStyle: RPT.object,
    label: RPT.string.isRequired,
    name: RPT.string.isRequired,
    onBlur: RPT.func,
    onChange: RPT.func,
    value: RPT.string
  };

  static defaultProps = {
    delimiter: '-',
    error: 'Default error message',
    fields: [
      {length: 1, type: 'text'},
      {length: 1, type: 'text'},
      {length: 1, type: 'text'},
      {length: 1, type: 'text'}
    ]
  };

  getTextValue() {
    const {delimiter, fields} = this.props;

    return Range(0, fields.length).map(i => {
      const field = this.refs[`field_${i}`];
      return (field.value || '').toString();
    }).join(delimiter);
  }

  getInputValue(key) {
    const {delimiter, fields, value} = this.props;

    if (value === undefined || value === null) return '';

    const parts = value.split(delimiter);

    if (parts[key] === undefined) return '';

    return parts[key].substr(0, fields[key].length);
  }

  getEvent() {
    const {name} = this.props;

    return {
      target: {
        name,
        value: this.getTextValue(),
        type: 'MultiField'
      }
    };
  }

  // with the type="number" we have to check length of the inputed value
  // manually, because maxLength doesn't work for type="number"
  ensureInputMaxLength(element) {
    const {maxLength, value} = element;

    if (`${value}`.length > maxLength) {
      element.value = `${value}`.substr(0, maxLength); // eslint-disable-line no-param-reassign
    }
  }

  handleInputChange({target}) {
    const {onChange} = this.props;

    this.ensureInputMaxLength(target);

    onChange(this.getEvent());
  }

  handleInputKeyUp({keyCode, target: {maxLength, name, value}}) {
    const key = parseInt(name.split('_')[1], 10);

    // ignore system keys and so on
    if (keyCode !== 8 && (keyCode < 47 || keyCode > 90)) return false;

    // catch backspace - if the current input is empty, we have to jump to previous one
    if (keyCode === 8) {
      if (value === '') {
        if (key !== 0) {
          // jump to previous box
          this.refs[`field_${key - 1}`].focus();
        }
      }
    }
    else if (value.length === maxLength) {
      // (unless we are in the last field)
      if (key !== this.props.fields.length - 1) {
        // jump to next box
        this.refs[`field_${key + 1}`].focus();
      }
      return false;
    }

    return null;
  }

  handleInputOnBlur({target}) {
    const {onBlur, fields} = this.props;

    if (target === this.refs[`field_${fields.length - 1}`])
      if (onBlur) onBlur(this.getEvent());
  }

  renderError() {
    const {error} = this.props;

    if (!error) return null;

    return <ErrorMessage>{error}</ErrorMessage>;
  }

  renderInput(field, key) {
    const {delimiter, fields, name, error, inheritedStyle} = this.props;
    const {length, placeholder, type} = field;

    return (
      <span key={key}>
        <input
          maxLength={length}
          name={`${name}_${key}`}
          onBlur={this.handleInputOnBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onKeyUp={this.handleInputKeyUp.bind(this)}
          placeholder={placeholder}
          ref={`field_${key}`}
          size={length}
          style={[
            styles.form.input.base,
            styles.form.input.size.regular,
            styles.input,
            error && styles.errorWrapper.errorInput,
            inheritedStyle
          ]}
          type={type}
          value={this.getInputValue(key)}
        />
        {(key !== fields.length - 1) &&
          <span className="delimiter" style={styles.delimiter}>{delimiter}</span>
        }
      </span>
    );
  }

  render() {
    const {fields, label, name, error} = this.props;

    return (
      <div name={`${name}MultiField`} style={[styles.errorWrapper.base, error && styles.errorWrapper.hasError]}>
        <label>
          <span style={styles.label}>{label}</span>
          {fields.map(this.renderInput.bind(this))}
        </label>
        {this.renderError()}
      </div>
    );
  }
}

const styles = {
  label: {
    color:        'hsl(0, 0%, 30%)',
    display:      'block',
    fontWeight:   '900',
    marginBottom: '4px',
    marginTop:    '16px'
  },

  input: {
    borderColor: 'hsl(0, 0%, 30%)',
    display:     'inline-block',
    lineHeight:  '40px',
    marginRight: '0 6px',
    padding:     '0px 12px',
    textAlign:   'center'
  },

  delimiter: {
    margin: '0 10px'
  },

  form: {
    input: {
      base: {
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
    },

    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'hsl(0, 0%, 30%)'
    },

    hint: {
      fontSize: '14px',
      color: 'hsl(0, 0%, 40%)'
    },

    textArea: {
      fontSize: '18px',
      fontWeight: '300',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d4d4d4',
      outline: 'none',
      padding: '20px 20px',
      WebkitAppearance: 'none',
      borderRadius: 0
    }
  },

  errorWrapper: {
    base: {
      borderLeft: '4px solid transparent',
      display: 'block',
      margin: '10px 0 25px 0',
      transition: 'border-left 0.2s'
    },
    hasError: {
      borderLeft: '4px solid hsl(351, 100%, 42%)',
      paddingLeft: '16px',
    },
    errorInput: {
      borderColor: 'hsl(351, 100%, 42%)',
      boxShadow: 'none',
      transition: 'box-shadow 0.2s',
      ':focus': {
        borderColor: '#a60017',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ff405a'
      }
    }
  }
};
