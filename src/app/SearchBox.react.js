import Icon from './atoms/Icon.react'
import Input from './atoms/Input.react'
import Logo from './atoms/Logo.react'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import spaces from './styles/Spaces'
import {nodesStyles} from './Sidebar.react'
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
        <Logo />
        <Input
          onChange={({target: {value}}) => searchAtoms(value)}
          placeholder="Search your component"
          type="text"
          value={searchedText}
        />
        <div
          onClick={nodeOnClick}
          style={[
            styles.all,
            nodesStyles.link,
            nodesStyles.link.overview,
            !selectedAtom && nodesStyles.sidebarLinkActive
          ]}
        >
          <Icon
            color={colors.BLUE}
            kind='overview'
            size='14px'
            style={styles.overviewIcon}
          />
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

  overviewIcon: {
    position: 'absolute',
    left: '8px',
    top: '10px'
  },

  wrapper: {
    flex: '0 0 auto',
    padding: spaces.normal,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`
  },

  logo: {
    maxWidth: '120px'
  }
}
