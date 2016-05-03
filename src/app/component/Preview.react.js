import AtomPreview from '../atoms/AtomPreview.react';
import font from '../styles/Font';
import headingStyles from '../styles/Headings';
import Icon from '../atoms/Icon.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import SourceCode from './SourceCode.react';
import spaces from '../styles/Spaces';
import Variants from './Variants.react';
import * as colors from '../styles/Colors';

@Radium
export default class Preview extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
  }

  state = {
    visiblePreviewSource: true
  }

  render() {
    const {atom, currentProps} = this.props
    const {visiblePreviewSource} = this.state

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first, !visiblePreviewSource && styles.panel.source]}>
          <h2 id='preview' style={[headingStyles, headingStyles.preview]}>Preview</h2>
          <div style={styles.atomWrapper}>
            <AtomPreview atom={atom} variantProps={currentProps}/>
          </div>
          <div
            onClick={this.handlePreviewSourceClick.bind(this)}
            style={[styles.sourceHeader, !visiblePreviewSource && styles.sourceHeader.hiddenSource]}
          >
            <Icon color={colors.BLUE} kind='code' size='28px' wrapperStyle={styles.icon.code} />
            {visiblePreviewSource ? 'Hide ' : 'Show '}
            source code
            <Icon
              color={colors.BLUE}
              kind='arrow'
              size='10px'
              wrapperStyle={[
                styles.icon.arrow,
                visiblePreviewSource && styles.sourceHeader.hiddenSource.arrow
              ]}
            />
          </div>
          <SourceCode atom={atom} componentProps={currentProps} visible={visiblePreviewSource} />
        </div>
        <Variants atom={atom} componentProps={currentProps} styles={styles} />
      </div>
    )
  }

  handlePreviewSourceClick() {
    const {visiblePreviewSource} = this.state

    this.setState({visiblePreviewSource: !visiblePreviewSource})
  }

}

const styles = {
  atomWrapper: {
    position: 'relative',
    clear: 'both'
  },

  sourceHeader: {
    ...font,
    borderTop: `1px solid ${colors.GRAY_DARKER}`,
    borderRight: `1px solid ${colors.GRAY_DARKER}`,
    borderBottom: '1px solid transparent',
    borderLeft: `1px solid ${colors.GRAY_DARKER}`,
    backgroundColor: colors.GRAY,
    fontSize: '15px',
    padding: `${spaces.smaller} ${spaces.smaller} ${spaces.smaller} 55px`,
    position: 'relative',
    top: '30px',
    zIndex: 1,
    ':hover': {
      cursor: 'pointer'
    },
    hiddenSource: {
      borderBottom: `1px solid ${colors.GRAY_DARKER}`,
      arrow: {
        transform: 'rotate(180deg)'
      }
    }
  },

  wrapper: {
    padding: '30px'
  },

  headingStyles,

  panel: {
    paddingTop: '50px',
    marginBottom: '50px',
    borderTop: `1px solid ${colors.GRAY_DARKER}`,
    position: 'relative',
    clear: 'both',
    display: 'table',
    width: '100%',
    first: {
      paddingTop: 0,
      borderTop: 0,
      paddingBottom: '20px',
      marginBottom: 0
    },
    source: {
      paddingBottom: '80px'
    }
  },

  icon: {
    code: {
      position: 'absolute',
      left: '15px',
      top: '10px'
    },
    arrow: {
      position: 'absolute',
      right: '61px',
      top: '15px'
    }
  },

  pre: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
    position: 'relative'
  },

  clear: {
    display: 'block',
    after: {
      clear: 'both'
    }
  }
};
