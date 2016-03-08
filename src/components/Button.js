import color from 'color';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';

class Button extends Component {

  static propTypes = {
    children: RPT.any.isRequired,
    kind:     RPT.string,
    onClick:  RPT.func
  }

  render() {
    const {children, onClick, kind} = this.props

    return (
      <button
        onClick={onClick}
        style={[styles.button, styles.kind[kind]]}
      >
        {children}
      </button>
    );
  }

}

const styles = {
  button: {
    backgroundColor: 'hsl(202, 40%, 50%)',
    border: 'none',
    borderRadius: 0,
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '5px 10px',
    marginRight: '5px',
    outline: 'none',
    ':hover': {
      backgroundColor: color('hsl(202, 40%, 50%)').darken(0.2).hexString()
    }
  },

  kind: {
    primary: {
      backgroundColor: 'hsl(26, 100%, 58%)',
      ':hover': {
        backgroundColor: color('hsl(26, 100%, 58%)').darken(0.2).hexString()
      }
    },

    secondary: {
      backgroundColor: 'hsl(0, 0%, 50%)',
      ':hover': {
        backgroundColor: color('hsl(0, 0%, 50%)').darken(0.2).hexString()
      }
    }
  }
};

export default Radium(Button)
