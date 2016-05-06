import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';


@Radium
export default class ErrorMessage extends Component {
  static propTypes = {
    children: RPT.any.isRequired,
    kind: RPT.oneOf([
      'plain',
      'block'
    ])
  }

  static defaultProps = {
    kind: 'block'
  }

  render() {
    const {children, kind} = this.props;

    return (
      <div
        style={[
          styles.wrapper,
          styles.wrapper[kind]
        ]}
      >
        <div style={styles.errorMessage}>
          {children}
        </div>
        {kind === 'block' &&
          <div style={styles.arrow} />
        }
      </div>
    );
  }
}

const styles = {
  wrapper: {
    color: 'hsl(351, 100%, 42%)',
    marginTop: '10px',
    padding: '3px 0px',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '400px',
    block: {
      backgroundColor: 'hsl(351, 100%, 42%)',
      color: 'white',
      marginTop: '18px',
      padding: '3px 10px',
    }
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
