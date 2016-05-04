import Component from 'react-pure-render/component';
import font from './styles/Font';
import generateTree from '../helpers/generateTree'
import MenuNode from './MenuNode.react'
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react'
import SearchBox from './SearchBox.react'
import * as colors from './styles/Colors'

@Radium
export default class Sidebar extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    searchAtoms: RPT.func.isRequired,
    searchedText: RPT.string,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom, searchAtoms, searchedText} = this.props
    const nodes = generateTree(componentsIndex)
    return (
      <div style={nodesStyles.wrapper}>
        <SearchBox
            nodeOnClick={() => selectAtom(null)}
            searchAtoms={searchAtoms}
            searchedText={searchedText}
            selectedAtom={selectedAtom}
        />
        <div style={styles.componentsTree}>
          <ul style={nodesStyles.sidebar}>
            <MenuNode nodes={nodes.toJS()} parent={[]} selectAtom={selectAtom} selectedAtom={selectedAtom} />
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  componentsTree: {
    flex: '1 1 auto',
    position: 'relative',
    overflowY: 'auto'
  }
}

export const nodesStyles = {
  wrapper: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  sidebar: {
    paddingLeft: 0
  },

  sidebarElement: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list: {
    paddingLeft: '10px'
  },

  link: {
    ...font,
    padding: '10px 20px',
    fontSize: '13px',
    color: colors.BLACK_BRIGHT,
    display: 'block',
    textDecoration: 'none',
    transition: 'all .1s ease-out',
    position: 'relative',
    ':hover': {
      backgroundColor: colors.GRAY_DARKER,
      cursor: 'pointer'
    },
    overview: {
      padding: '10px 20px 10px 30px'
    }
  },

  sidebarLinkActive: {
    backgroundColor: colors.GRAY
  },
};
