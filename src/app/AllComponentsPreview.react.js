import AtomPreview from './atoms/AtomPreview.react';
import Component from './PureRenderComponent.react';
import headingStyles from './styles/Headings';
import {mediaQueries} from './styles/MediaQueries';
import NotFound from './atoms/NotFound.react';
import parseHighlightedMenu from '../libraries/parseHighlightedMenu';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import ZoomContent from './atoms/ZoomContent.react';
import * as colors from './styles/Colors';

@Radium
export default class AllComponentsPreview extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired
  }

  render() {
    const {componentsIndex} = this.props
    let index = 0
    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapper.row}>
          {componentsIndex.sortBy((value, key) => key).reduce(
            (acc, atom, name) => acc.concat(this.renderAtom(name, atom, (index++ % 2)))
          , [])}
          {Object.keys(componentsIndex.toJS()).length === 0 && this.renderNotFound()}
        </div>
      </div>
    );
  }

  renderNotFound() {
    return <NotFound>No components to display</NotFound>
  }

  renderAtom(name, atom, isOdd) {
    const {selectAtom} = this.props
    const heading = parseHighlightedMenu(atom.get('highlightedMenu') || atom.get('menu'))

    return (
      <div
        key={name}
        style={[
          styles.atom.wrapper,
          isOdd && styles.atom.wrapper.odd
        ]}
      >
        <div style={styles.headingWrapper}>
          <h2
            dangerouslySetInnerHTML={{__html: heading}}
            key={name}
            onClick={() => selectAtom(name)}
            style={[headingStyles, headingStyles.allComponents]}
          />
        </div>
        <div style={styles.atom.column}>
          <ZoomContent>
            <AtomPreview atom={atom} />
          </ZoomContent>
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

  headingWrapper: {
    marginBottom: '20px',
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
      },
      [mediaQueries.breakpointTablet]: {
        width: '100%',
        borderRight: 0,
        padding: '15px 0'
      }
    },
    column: {
      clear: 'both'
    }
  }
}
