import Component from './PureRenderComponent.react';
import generateTree from '../libraries/generateTree';
import {mediaQueries} from './styles/MediaQueries';
import MenuNode from './MenuNode.react';
import NotFound from './atoms/NotFound.react';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import SearchBox from './SearchBox.react';
import * as colors from './styles/Colors';

@Radium
export default class Sidebar extends Component {

  static propTypes = {
    children: RPT.any,
    componentsIndex: RPT.object.isRequired,
    searchAtoms: RPT.func.isRequired,
    searchedText: RPT.string,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    showMobileSidebar: RPT.bool.isRequired,
    toggleSidebar: RPT.func.isRequired
  }

  render() {
    const {
      children, componentsIndex, selectAtom, selectedAtom, searchAtoms, searchedText,
      showMobileSidebar, toggleSidebar
    } = this.props
    const nodes = generateTree(componentsIndex).toJS()

    return (
      <div style={[styles.sidebar, showMobileSidebar && styles.sidebar.visible]}>
        <div style={styles.wrapper}>
          <SearchBox
            children={children}
            nodeOnClick={() => selectAtom(null)}
            searchAtoms={searchAtoms}
            searchedText={searchedText}
            selectedAtom={selectedAtom}
            toggleSidebar={toggleSidebar}
          />
          <div style={styles.componentsTree}>
            <div style={styles.nodes}>
              <MenuNode
                nodes={nodes}
                parent={[]}
                selectAtom={selectAtom}
                selectedAtom={selectedAtom}
                toggleSidebar={toggleSidebar}
              />
              {this.renderNoComponentFound(nodes)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNoComponentFound(nodes) {
    const {searchedText} = this.props

    if (Object.keys(nodes).length !== 0)
      return null

    if (`${searchedText}`.length > 0)
      return <NotFound>No components found by: <b>{searchedText}</b></NotFound>
    return <NotFound>No components</NotFound>
  }
}

const styles = {
  componentsTree: {
    flex: '1 1 auto',
    position: 'relative',
    overflowY: 'auto'
  },

  sidebar: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: `1px solid ${colors.GRAY_DARKER}`,
    position: 'relative',
    verticalAlign: 'top',
    transition: 'left .2s ease-out',
    [mediaQueries.breakpointLarge]: {
      position: 'absolute',
      top: 0,
      width: '250px',
      left: '-250px',
      zIndex: 10
    },
    visible: {
      [mediaQueries.breakpointLarge]: {
        left: 0
      }
    }
  },

  wrapper: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  nodes: {
    padding: '10px 0'
  }
};
