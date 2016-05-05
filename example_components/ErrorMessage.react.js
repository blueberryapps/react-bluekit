import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';


@Radium
export default class ErrorMessage extends Component {
  static propTypes = {
    children: RPT.any.isRequired,
    type:     RPT.string
  }

  render() {
    const {children} = this.props;

    return (
      <div style={styles.wrapper}>
        <div className="errorMessage" style={styles.errorMessage}>{children}</div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    color: 'hsl(351, 100%, 42%)',
    marginTop: '6px',
    padding: '3px 0px',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '400px'
  },

  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightWidth: '4px',
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
    borderBottomWidth: '4px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'hsl(351, 100%, 42%)',
    fontSize: 0,
    lineHeight: 0,
    position: 'absolute',
    top: '-4px',
    left: '25px'
  }
};
