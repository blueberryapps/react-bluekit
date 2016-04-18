import font from './styles/Font';
import generateTree from '../helpers/generateTree'
import MenuNode from './MenuNode.react'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react'
import SearchBar from './SearchBar'

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

export const styles = {
  wrapper: {
    backgroundColor: 'white',
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
