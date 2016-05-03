import font from './styles/Font';
import generateTree from '../helpers/generateTree'
import MenuNode from './MenuNode.react'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react'
import SearchBox from './SearchBox.react'
import * as colors from './styles/Colors'

@Radium
export default class ComponentsSidebar extends Component {

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
            componentsIndex={componentsIndex}
            nodeOnClick={() => selectAtom(null)}
            searchAtoms={searchAtoms}
            searchedText={searchedText}
            selectedAtom={selectedAtom}
        />
        <ul style={nodesStyles.sidebar}>
          <MenuNode nodes={nodes} parent={[]} selectAtom={selectAtom} selectedAtom={selectedAtom} />
        </ul>
      </div>
    );
  }
}

export const nodesStyles = {
  wrapper: {
    backgroundColor: 'white',
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
    ':hover': {
      backgroundColor: colors.GRAY_DARKER,
      cursor: 'pointer'
    }
  },

  sidebarLinkActive: {
    backgroundColor: colors.GRAY
  },
};
