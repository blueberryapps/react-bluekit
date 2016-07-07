import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import nodesStyles from './styles/Nodes';

class MenuNode extends Component {

  static propTypes = {
    nodes: RPT.object.isRequired,
    parent: RPT.array.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    toggleSidebar: RPT.func.isRequired,
  }

  render() {
    const {nodes, parent} = this.props

    return (
      <ul
        style={[
          nodesStyles.list,
          parent.length === 0 && nodesStyles.list.first
        ]}
      >
        {Object.keys(nodes).sort().map((key) => this.renderNode(key, nodes[key]))}
      </ul>
    )
  }

  handleNodeClick(subnodes) {
    const {selectAtom, toggleSidebar} = this.props;

    selectAtom(subnodes)
    toggleSidebar()
  }

  renderNode(node, subnodes) {
    const {parent, selectAtom, selectedAtom, toggleSidebar} = this.props
    const mergedStyles = {...nodesStyles.link, ...nodesStyles.sidebarLinkActive}

    if (typeof subnodes === 'string') {
      const selected = selectedAtom === subnodes

      return (
        <li key={node}>
          <div
            dangerouslySetInnerHTML={{__html: node}}
            key={node}
            onClick={() => this.handleNodeClick(subnodes)}
            style={selected ? mergedStyles : nodesStyles.link}
          />
        </li>
      )
    }

    const selected = selectedAtom && selectedAtom.indexOf(parent.concat(node).join('')) !== -1
    return (
      <li key={node}>
        <div
          dangerouslySetInnerHTML={{__html: node}}
          key={node}
          style={[
            selected ? mergedStyles : nodesStyles.link,
            parent && selected ? nodesStyles.link.folder.selected : nodesStyles.link.folder
          ]}
        />
        {subnodes &&
          <RadiumMenuNode
            nodes={subnodes}
            parent={parent.concat(node)}
            selectAtom={selectAtom}
            selectedAtom={selectedAtom}
            toggleSidebar={toggleSidebar}
          />
        }
      </li>
    )
  }
}

const RadiumMenuNode = Radium(MenuNode)
export default RadiumMenuNode
