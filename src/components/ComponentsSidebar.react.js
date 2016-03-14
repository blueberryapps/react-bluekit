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
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  state = {
    nodes: {},
    searchedAtoms: Object.keys(this.props.componentsIndex),
  }

  componentWillMount() {
    const {componentsIndex} = this.props

    this.setState({
      nodes: generateTree(componentsIndex)
    });
  }

  componentWillReceiveProps(nextProps) {
    const {componentsIndex} = this.props

    if (nextProps.componentsIndex !== this.props.componentsIndex) {
      this.setState({
        nodes: generateTree(componentsIndex)
      });
    }
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom} = this.props
    const {nodes} = this.state

    return (
      <div style={nodesStyles.wrapper}>
        <SearchBox
            componentsIndex={componentsIndex}
            nodeOnClick={() => selectAtom(null)}
            searchAtoms={this.searchAtoms}
            selectedAtom={selectedAtom}
        />
        <ul style={nodesStyles.sidebar}>
          <MenuNode nodes={nodes} selectAtom={selectAtom} selectedAtom={selectedAtom} />
          {JSON.stringify(nodes)}
        </ul>
      </div>
    );
  }
//{nodes.map(node => this.renderAtom(node))}
  searchAtoms(searchInput) {
    const {componentsIndex} = this.props
    const searchedAtoms = (!!searchInput)
      ? Object.keys(componentsIndex).filter(name => name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput.toLowerCase().includes(name.toLowerCase()))
      : Object.keys(componentsIndex)

    this.setState({
      nodes: generateTree(componentsIndex),
      searchedAtoms
    })
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
    fontSize: '16px',
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
