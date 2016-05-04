import AtomPreview from './atoms/AtomPreview.react';
import Component from 'react-pure-render/component';
import headingStyles from './styles/Headings';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import * as colors from './styles/Colors';

@Radium
export default class AllComponentsPreview extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired
  }

  render() {
    const {componentsIndex} = this.props

    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapper.row}>
          {Object.keys(componentsIndex).map(
            (name, index) => this.renderAtom(name, index % 2)
          )}
        </div>
      </div>
    );
  }

  renderAtom(name, isOdd) {
    const {componentsIndex, selectAtom} = this.props
    const atom = componentsIndex[name]

    return (
      <div
        key={name}
        style={[
          styles.atom.wrapper,
          isOdd && styles.atom.wrapper.odd
        ]}
      >
        <div
          key={name}
          onClick={() => selectAtom(name)}
          style={headingStyles}
        >
          {atom.menu}
        </div>
        <div style={styles.atom.column}>
          <AtomPreview atom={atom} disableFunctionProps />
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    padding: '15px',
    row: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },

  atom: {
    wrapper: {
      width: '50%',
      float: 'left',
      padding: '15px 15px 15px 0',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${colors.GRAY_DARKER}`,
      borderRight: `1px solid ${colors.GRAY_DARKER}`,
      odd: {
        borderRight: 0,
        padding: '15px 0 15px 15px'
      }
    },
    column: {
      clear: 'both'
    }
  }
}
