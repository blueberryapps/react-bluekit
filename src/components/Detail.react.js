import ExampleSource from './ExampleSource.react';
import font from './styles/Font';
import headingStyles from './styles/Headings';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../helpers/resolveComponent';
import spaces from './styles/Spaces';
import Variants from './Variants.react';
import * as colors from './styles/Colors';

@Radium
export default class Detail extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    extendedProps: RPT.object
  }

  state = {
    visiblePreviewSource: false
  }

  render() {
    const {atom, currentProps, extendedProps} = this.props
    const {visiblePreviewSource} = this.state
    const ExampleAtom = resolveComponent(atom.component)

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first, !visiblePreviewSource && styles.panel.source]}>
          <h2 id='preview' style={[headingStyles, headingStyles.preview]}>Preview</h2>
          <div style={styles.atomWrapper}>
            <ExampleAtom {...extendedProps} />
          </div>
          <div
            onClick={this.handlePreviewSourceClick.bind(this)}
            style={[styles.sourceHeader, !visiblePreviewSource && styles.sourceHeader.hiddenSource]}
          >
            {visiblePreviewSource ? 'Hide ' : 'Show '}
            source code
          </div>
          <ExampleSource atom={atom} componentProps={currentProps} visible={visiblePreviewSource} />
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
    padding: spaces.smaller,
    position: 'relative',
    top: '30px',
    zIndex: 1,
    ':hover': {
      cursor: 'pointer'
    },
    hiddenSource: {
      borderBottom: `1px solid ${colors.GRAY_DARKER}`,
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
