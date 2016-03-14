import font from './styles/Font';
import DirectoryTree from '../helpers/directoryTree'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import SearchBar from './SearchBar'

@Radium
export default class ComponentsSidebar extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  state = {
    nodes: [],
    searchedAtoms: Object.keys(this.props.componentsIndex),
  }

  componentWillMount() {
    let nodes = [];
    DirectoryTree.generateTree(this.state.searchedAtoms).iterate(node=> { nodes.push(node) })
    this.setState({
      nodes
    });
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom} = this.props
    const {nodes} = this.state
    return (
      <div style={styles.wrapper}>
        <SearchBar
            componentsIndex={componentsIndex}
            searchAtoms={this.searchAtoms.bind(this)}
        />
        <ul style={styles.sidebar}>
          <li key={name} style={styles.sidebarElement}>
            <div
              key="all-components"
              onClick={() => selectAtom(null)}
              style={[styles.link, !selectedAtom && styles.sidebarLinkActive, font]}
            >
                All components
            </div>
          </li>
          {nodes.reverse().map(node => this.renderAtom(node))}
        </ul>
      </div>
    );
  }

  searchAtoms(searchInput) {
    const {componentsIndex} = this.props
    let nodes = [];
    let searchedAtoms = Object.keys(componentsIndex)
    if (!!searchInput) {
      searchedAtoms = Object.keys(componentsIndex)
        .filter(name => name.toLowerCase().includes(searchInput) || searchInput.includes(name.toLowerCase()))
    }
    DirectoryTree.generateTree(searchedAtoms).iterate(node=> { nodes.push(node) })
    this.setState({nodes, searchedAtoms})
  }


  renderAtom(node) {
    const {selectAtom, selectedAtom} = this.props
    const data = this.getComponentData(node.fullName())
    if (!!data) {
      return (
      <li key={node.fullName()} style={styles.sidebarElement}>
        <div
          key={node.fullName()}
          onClick={() => selectAtom(node.fullName())}
          style={[styles.link, selectedAtom === node.data && styles.sidebarLinkActive, font]}
        >
            {data.menu}
        </div>
      </li>
      );
    }
    else {
      return (
        <li style={styles.sidebarElement}>
          <div key={node.fullName()} style={[styles.link, dynamicMargin(node.depth)]}>
            {node.data}
          </div>
        </li>
      )
    }
  }

  getComponentData(name) {
    const {componentsIndex} = this.props

    return componentsIndex[name]
  }

}

const dynamicMargin = function(depth) {
  return {
    marginLeft: `${depth * 10}px`
  }
}

const styles = {
  wrapper: {
    backgroundColor: 'white',
  },

  sidebarElement: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  link: {
    padding: '8px 20px',
    fontSize: '12px',
    fontWeight: 'normal',
    color: 'rgb(27, 111, 159)',
    display: 'block',
    textDecoration: 'none',
    ':hover': {
      color: 'white',
      backgroundColor: 'rgb(255, 134, 43)'
    }
  },

  sidebarLinkActive: {
    backgroundColor: 'hsl(202, 100%, 96%)',
  },
};
