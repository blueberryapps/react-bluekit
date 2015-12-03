import List from './List';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Link} from 'react-router';

@Radium
export default class Library extends Component {

  static childContextTypes = {
    componentsIndex: RPT.object
  }

  static propTypes = {
    children: RPT.object,
    componentsIndex: RPT.object.isRequired,
    mountPoint: RPT.string.isRequired
  }

  getChildContext() {
    return {
      componentsIndex: this.props.componentsIndex
    };
  }

  getComponentData(name) {
    const {componentsIndex} = this.props

    return componentsIndex[name]
  }

  renderAtom(name) {
    const {mountPoint} = this.props
    const data = this.getComponentData(name)

    return (
      <li key={name} style={styles.sidebarElement}>
        <Link
          activeStyle={styles.sidebarLinkActive}
          style={styles.sidebarLink}
          to={`/${mountPoint}/${name}`}
        >
            {data.menu}
        </Link>
      </li>
    );
  }

  render() {
    const {children, componentsIndex} = this.props

    return (
      <div style={styles.mainContainer}>
        <ul style={styles.sidebar}>
          {Object.keys(componentsIndex).map(name => this.renderAtom(name))}
        </ul>
        <div style={styles.content}>
          {children || this.renderList()}
        </div>
      </div>
    );
  }

  renderList() {
    const {componentsIndex, mountPoint} = this.props

    return (
      <List componentsIndex={componentsIndex} mountPoint={mountPoint} />
    );
  }
}

const styles = {
  mainContainer: {
    backgroundColor: 'hsl(0, 0%, 100%)',
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'horizontal',
  },

  sidebar: {
    position: 'relative',
    zIndex: 2,
    flex: '0 0 20rem',
    margin: '0 20px 0 0',
    padding: '0',
    backgroundColor: 'hsl(0, 0%, 95%)',
  },

  sidebarElement: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  sidebarLink: {
    padding: '.5rem .7rem',
    fontWeight: 'normal',
    color: 'hsl(0, 0%, 25%)',
    display: 'block',
  },

  sidebarLinkActive: {
    background: 'hsl(0, 0%, 85%)',
  },

  content: {
    flex: '1 1 0',
    overflow: 'auto',
  },
};
