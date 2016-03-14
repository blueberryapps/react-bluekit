import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import SearchBar from './SearchBar.react'
import spaces from './styles/Spaces'
import {nodesStyles} from './ComponentsSidebar.react'
import * as colors from './styles/Colors'

@Radium
export default class SearchBox extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    nodeOnClick: RPT.func.isRequired,
    searchAtoms: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  render() {
    const {componentsIndex, nodeOnClick, searchAtoms, selectedAtom} = this.props

    return (
      <div style={styles.wrapper}>
        <img src='src/img/bluekit-logo.svg' style={styles.logo} />
        <SearchBar
            componentsIndex={componentsIndex}
            searchAtoms={searchAtoms.bind(this)}
        />
        <div
          onClick={nodeOnClick}
          style={[styles.all, nodesStyles.link, !selectedAtom && nodesStyles.sidebarLinkActive]}
        >
            All components
        </div>
      </div>
     );
  }
}

const styles = {
  all: {
    marginTop: spaces.small
  },

  wrapper: {
    padding: spaces.normal,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`
  },

  logo: {
    maxWidth: '120px'
  }
}
