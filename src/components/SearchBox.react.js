import Input from './atoms/Input.react'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import spaces from './styles/Spaces'
import {nodesStyles} from './ComponentsSidebar.react'
import * as colors from './styles/Colors'

@Radium
export default class SearchBox extends Component {

  static propTypes = {
    nodeOnClick: RPT.func.isRequired,
    searchAtoms: RPT.func.isRequired,
    searchedText: RPT.string,
    selectedAtom: RPT.string
  }

  render() {
    const {nodeOnClick, searchAtoms, selectedAtom, searchedText} = this.props

    return (
      <div style={styles.wrapper}>
        <img src="src/img/bluekit-logo.svg" style={styles.logo} />
        <Input
          onChange={({target: {value}}) => searchAtoms(value)}
          placeholder="Search your component"
          type="text"
          value={searchedText}
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
