import AtomPreview from '../atoms/AtomPreview.react';
import Component from 'react-pure-render/component';
import headingStyles from '../styles/Headings';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import SourceCode from './SourceCode.react';
import styles from '../styles/Sources';
import Variants from './Variants.react';

@Radium
export default class Preview extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
  }

  render() {
    const {atom, currentProps} = this.props

    return (
      <div style={styles.wrapper}>
        <div style={[styles.panel, styles.panel.first]}>
          <h2 id='preview' style={[headingStyles, headingStyles.preview]}>Preview</h2>
          <div style={styles.atomWrapper}>
            <AtomPreview atom={atom} variantProps={currentProps}/>
          </div>
          <SourceCode atom={atom} componentProps={currentProps} name={atom.name} showToggl />
        </div>
        <Variants atom={atom} componentProps={currentProps} />
      </div>
    )
  }
}
