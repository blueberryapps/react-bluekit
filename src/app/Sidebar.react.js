import Component from 'react-pure-render/component'
import generateTree from '../helpers/generateTree'
import MenuNode from './MenuNode.react'
import NotFound from './atoms/NotFound.react'
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react'
import SearchBox from './SearchBox.react'

@Radium
export default class Sidebar extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    searchAtoms: RPT.func.isRequired,
    searchedText: RPT.string,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  render() {
    const {componentsIndex, selectAtom, selectedAtom, searchAtoms, searchedText} = this.props
    const nodes = generateTree(componentsIndex).toJS()
    return (
      <div style={styles.wrapper}>
        <SearchBox
            nodeOnClick={() => selectAtom(null)}
            searchAtoms={searchAtoms}
            searchedText={searchedText}
            selectedAtom={selectedAtom}
        />
        <div style={styles.componentsTree}>
          <div style={styles.nodes}>
            <MenuNode nodes={nodes} parent={[]} selectAtom={selectAtom} selectedAtom={selectedAtom} />
            {this.renderNoComponentFound(nodes)}
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
