import font from './styles/Font';
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
    searchedAtoms: Object.keys(this.props.componentsIndex)
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom} = this.props
    const {searchedAtoms} = this.state

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
          { searchedAtoms.map(name => this.renderAtom(name))}
        </ul>
      </div>
    );
  }

  searchAtoms(searchInput) {
    const {componentsIndex} = this.props
    let searchedAtoms = Object.keys(componentsIndex)
    if (!!searchInput) {
      searchedAtoms = Object.keys(componentsIndex)
        .filter(name => name.toLowerCase().includes(searchInput) || searchInput.includes(name.toLowerCase()))
    }
    this.setState({searchedAtoms})
  }

  renderAtom(name) {
    const {selectAtom, selectedAtom} = this.props
    const data = this.getComponentData(name)

    return (
      <li key={name} style={styles.sidebarElement}>
        <div
          key={name}
          onClick={() => selectAtom(name)}
          style={[styles.link, selectedAtom === name && styles.sidebarLinkActive, font]}
        >
            {data.menu}
        </div>
      </li>
    );
  }

  getComponentData(name) {
    const {componentsIndex} = this.props

    return componentsIndex[name]
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
