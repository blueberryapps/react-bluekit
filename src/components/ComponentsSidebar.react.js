import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import font from './styles/Font';

@Radium
export default class ComponentsSidebar extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom} = this.props

    return (
      <div style={styles.wrapper}>
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
          {Object.keys(componentsIndex).map(name => this.renderAtom(name))}
        </ul>
      </div>
    );
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
