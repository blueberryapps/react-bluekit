import Component from './PureRenderComponent.react';
import Icon from './atoms/Icon.react';
import nodesStyles from './styles/Nodes';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';

class MenuNode extends Component {

  static propTypes = {
    nodes: RPT.object.isRequired,
    parent: RPT.array.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    toggleSidebar: RPT.func.isRequired,
  }

  static contextTypes = {
    toggleFoldersOpened: RPT.func,
    uiFoldersOpened: RPT.object
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
    const {toggleFoldersOpened, uiFoldersOpened} = this.context
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
    const opened = !uiFoldersOpened.includes(node)

    return (
      <li key={node}>
        <div
          key={node}
          onClick={parent ? () => toggleFoldersOpened(node) : null}
          style={[
            selected ? mergedStyles : nodesStyles.link,
          ]}
        >
          {parent &&
            <Icon
              kind="arrow"
              size={8}
              style={[nodesStyles.icon, !opened && nodesStyles.icon.closed]}
              wrapperStyle={nodesStyles.iconWrapper} />
          }
          <span dangerouslySetInnerHTML={{__html: node}} />
        </div>
        {subnodes && opened &&
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
