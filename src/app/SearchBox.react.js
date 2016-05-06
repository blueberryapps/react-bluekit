import Component from 'react-pure-render/component';
import Icon from './atoms/Icon.react'
import Input from './atoms/Input.react';
import Logo from './atoms/Logo.react';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import ReactDOM from 'react-dom';
import spaces from './styles/Spaces';
import nodesStyles from './styles/Nodes';
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
        <div style={styles.search.group}>
          <Input
            inheritedStyle={styles.search.input}
            kind="inputSearch"
            onChange={({target: {value}}) => searchAtoms(value)}
            placeholder="Search your component"
            ref="searchbox"
            type="text"
            value={searchedText}
          />
          {this.renderSearchIcon()}
        </div>
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
            size={14}
            style={styles.overviewIcon}
          />
            All components
        </div>
      </div>
     );
  }

  clearText() {
    const {searchAtoms} = this.props

    searchAtoms('')
    ReactDOM.findDOMNode(this.refs.searchbox).focus()
  }

  renderSearchIcon() {
    const {searchedText} = this.props

    if (searchedText)
      return (
        <Icon
          color={colors.BLUE}
          kind='close'
          onClick={() => this.clearText('')}
          size={18}
          wrapperStyle={[styles.search.icon, styles.search.clear]}
        />
      )

    return (
      <Icon
        color={colors.BLUE}
        kind='search'
        size={18}
        wrapperStyle={styles.search.icon}
      />
    )
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

  search: {
    clear: {
      ':hover': {
        cursor: 'pointer'
      }
    },
    group: {
      paddingTop: '8px',
      position: 'relative'
    },
    input: {
      padding: '10px 35px 10px 10px'
    },
    icon: {
      position: 'absolute',
      top: '19px',
      right: '10px'
    }
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
