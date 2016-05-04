import Component from 'react-pure-render/component';
import CopyToClipboard from 'react-copy-to-clipboard';
import font from '../styles/Font';
import Icon from '../atoms/Icon.react';
import * as colors from '../styles/Colors';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';

@Radium
export default class CopyCode extends Component {

  static propTypes = {
    inheritedStyles: RPT.object,
    source: RPT.node.isRequired
  }

  state = {
    copied: false
  }

  render() {
    const {inheritedStyles, source} = this.props;
    const {copied} = this.state;

    return (
      <CopyToClipboard onCopy={this.onCopy.bind(this)} text={source}>
        <div style={[styles.copyCode.wrapper, inheritedStyles]}>
          <div style={[styles.copyCode.inner, copied && styles.copyCode.copied]}>
            <Icon
              color={colors.BLUE}
              kind='copy'
              size='20px'
            />
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
    wrapper: {
      backgroundColor: 'white',
      position: 'absolute',
      padding: '11px 10px',
      top: '1px',
      right: '1px',
      zIndex: 2
    },
    inner: {
      ...font,
      ...font.bold,
      color: colors.BLUE,
      textTransform: 'uppercase',
      paddingLeft: '15px',
      borderLeft: `1px solid ${colors.GRAY_DARKER}`,
      ':hover': {
        cursor: 'pointer'
      }
    },
    copied: {
      opacity: '.3',
      ':hover': {
        cursor: 'default'
      }
    }
  }
}
