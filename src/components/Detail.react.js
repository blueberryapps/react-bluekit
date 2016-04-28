import ExampleSource from './ExampleSource.react';
import headingStyles from './styles/Headings';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../helpers/resolveComponent';
import Variants from './Variants.react';
import * as colors from './styles/Colors.js';

@Radium
export default class Detail extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    extendedProps: RPT.object
  }

  render() {
    const {atom, currentProps, extendedProps} = this.props
    const ExampleAtom = resolveComponent(atom.component)

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first]}>
          <h2 id='preview' style={headingStyles}>Preview</h2>
          <div style={styles.atomWrapper}>
            <ExampleAtom {...extendedProps} />
          </div>
          <ExampleSource atom={atom} componentProps={currentProps} />
        </div>
        <Variants atom={atom} componentProps={currentProps} styles={styles} />
      </div>
    )
  }

}

const styles = {
  atomWrapper: {
    position: 'relative',
    clear: 'both'
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
      paddingBottom: '40px',
      marginBottom: 0
    }
  },

  pre: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },

  clear: {
    display: 'block',
    after: {
      clear: 'both'
    }
  }
};
