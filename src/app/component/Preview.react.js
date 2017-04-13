import AtomPreview from '../atoms/AtomPreview.react';
import Component from 'react-pure-render/component';
import headingStyles from '../styles/Headings';
import {mediaQueries} from '../styles/MediaQueries';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import SourceCode from './SourceCode.react';
import styles from '../styles/Sources';
import Variants from './Variants.react';

@Radium
export default class Preview extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    headingColor: RPT.string.isRequired,
    sortedProps: RPT.object
  }

  render() {
    const {atom, currentProps, headingColor, sortedProps} = this.props

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first, componentStyles.panelFirst]}>
          <h2
            id="component-preview"
            style={[
              headingStyles,
              headingStyles.preview,
              componentStyles.heading,
              {color: headingColor}
            ]}
          >
            Preview
          </h2>
          <div style={styles.atomWrapper}>
            <AtomPreview atom={atom} variantProps={currentProps}/>
          </div>
          <SourceCode atom={atom} componentProps={currentProps} name={`${atom.get('name')}-preview`} showToggle />
        </div>
        <Variants
          atom={atom}
          componentProps={currentProps}
          headingColor={headingColor}
          sortedProps={sortedProps}
          styles={styles}
        />
      </div>
    )
  }
}

const componentStyles = {
  heading: {
    [mediaQueries.breakpointTablet]: {
      marginBottom: 0
    }
  },

  panelFirst: {
    [mediaQueries.breakpointTablet]: {
      paddingTop: 0
    }
  }
}
