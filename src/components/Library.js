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

  renderAtom(file) {
    const {mountPoint} = this.props

    return (
      <li key={file} style={styles.sidebarElement}>
        <Link
          activeStyle={styles.sidebarLinkActive}
          style={styles.sidebarLink}
          to={`/${mountPoint}/${file}`}
        >
            {file.replace(/\.?(react)?.jsx?/, '')}
        </Link>
      </li>
    );
  }

  render() {
    const {componentsIndex} = this.props

    return (
      <div style={styles.mainContainer}>
        <ul style={styles.sidebar}>
          {Object.keys(componentsIndex).map(file => this.renderAtom(file))}
        </ul>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
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
