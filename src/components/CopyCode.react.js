import CopyToClipboard from 'react-copy-to-clipboard';
import font from './styles/Font';
import * as colors from './styles/Colors';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';

@Radium
export default class CopyCode extends Component {

  static propTypes = {
    source: RPT.node.isRequired
  }

  state = {
    copied: false
  }

  render() {
    const {source} = this.props;
    const {copied} = this.state;

    return (
      <CopyToClipboard onCopy={this.onCopy.bind(this)} text={source}>
        <div>
          <div style={styles.copyCode}>
            {copied ? 'copied' : 'Copy'}
          </div>
        </div>
      </CopyToClipboard>
    );
  }

  onCopy() {
    this.setState({copied: true})
    setTimeout(() => this.setState({copied: false}), 3000)
  }

}

const styles = {
  copyCode: {
    ...font,
    ...font.bold,
    color: colors.BLUE,
    textTransform: 'uppercase',
    position: 'absolute',
    top: '10px',
    right: '10px',
    paddingLeft: '10px',
    borderLeft: `1px solid ${colors.GRAY_DARKER}`,
    ':hover': {
      cursor: 'pointer'
    }
  }
}
