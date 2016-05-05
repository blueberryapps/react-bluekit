import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import Spinner from './Spinner.react';

@Radium
export default class Button extends Component {

  static propTypes = {
    children:       RPT.any.isRequired,
    className:      RPT.string,
    disabled:       RPT.bool,
    fullWidth:      RPT.bool,
    inheritedStyle: RPT.object,
    kind:           RPT.oneOf(['primary', 'primaryInverted', 'secondary', 'simple']),
    loading:        RPT.bool,
    loadingText:    RPT.string,
    name:           RPT.string,
    onClick:        RPT.func,
    size:           RPT.oneOf(['small', 'large']),
    type:           RPT.string,
  }

  static defaultProps = {
    kind:    'primary',
    loading: false
  }

  render() {
    const {className, disabled, kind, size, fullWidth, loading, loadingText, name, onClick, inheritedStyle, children, type} = this.props;

    return (
      <button
        className={className}
        disabled={disabled}
        name={name}
        onClick={onClick}
        style={[
          styles.base,
          styles.size[size],
          styles.kind[kind],
          fullWidth && styles.fullWidth,
          inheritedStyle,
          disabled && styles.disabled,
          disabled && styles.disabled[kind]
        ]}
        type={type}
      >
        {loading && <Spinner color='white' />}
        {loading && loadingText || children}
      </button>
    );
  }
}

const styles = {
  base: {
    backgroundColor: '#909090',
    borderColor:     'transparent',
    borderRadius:    0,
    borderStyle:     'solid',
    borderWidth:     '1px',
    boxShadow:       '0 1px 2px rgba(0 , 0, 0, 0.3)',
    color:           '#fff',
    cursor:          'pointer',
    display:         'inline-block',
    fontSize:        '20px',
    fontWeight:      'normal',
    lineHeight:      '1',
    margin:          '15px 10px 0 0',
    outline:         'none',
    padding:         '0 34px 0',
    minHeight:       '50px',
    textDecoration:  'none',
    transition:      'background-color .2s ease-in-out, color .2s, border-color .2s ease-in-out',
    verticalAlign:   'top',
    minWidth: '300px'
  },

  kind: {
    primary: {
      backgroundColor: '#00b2d5',
      ':hover': {
        backgroundColor: '#037d95'
      }
    },

    primaryInverted: {
      color: '#00b2d5',
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#00b2d5',
      boxShadow: 'none',
      padding: '15px 34px 11px',
      minWidth: '1px',
      ':hover': {
        backgroundColor: '#037d95',
        color: 'white',
        borderColor: '#037d95'
      }
    },

    secondary: {
      backgroundColor: '#FFCC00',
      ':hover': {
        backgroundColor: '#ddb100'
      }
    },

    simple: {
      color: '#00b2d5',
      padding: '16px 0px 0px',
      borderBottom: '1px solid #00b2d5',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      transition: 'color .2s',
      minHeight: 0,
      minWidth: '1px',
      ':hover': {
        borderBottom: '1px solid #037d95',
        color: '#037d95'
      }
    }
  },

  size: {
    small: {
      padding: '10px 18px',
      fontSize: '14px'
    },

    large: {
      padding: '25px 30px',
      fontSize: '18px'
    }
  },

  fullWidth: {
    width: '100%'
  },

  disabled: {
    cursor:          'default',
    pointerEvents:   'none',
    userSelect:      'none',
    primary: {
      backgroundColor: '#7BBDB5'
    },
    secondary: {
      backgroundColor: 'hsl(0, 0%, 70%)'
    }
  }
};
