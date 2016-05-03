import Radium from 'radium'
import React, {Component, PropTypes as RPT} from 'react'
import {nodesStyles} from './ComponentsSidebar.react'

@Radium
export default class MenuNode extends Component {

  static propTypes = {
    nodes: RPT.object.isRequired,
    parent: RPT.array.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string
  }

  render() {
    const {nodes} = this.props

    return (
      <ul style={nodesStyles.list}>
        {nodes.map((subnodes, node) => this.renderNode(node, subnodes))}
      </ul>
    )
  }

  renderNode(node, subnodes) {
    const {parent, selectAtom, selectedAtom} = this.props
    const mergedStyles = {...nodesStyles.link, ...nodesStyles.sidebarLinkActive}


    if (typeof subnodes === 'string') {
      const selected = selectedAtom === subnodes

      return (
        <li key={node} style={nodesStyles.sidebarElement}>
          <div
            onClick={() => selectAtom(subnodes)}
            style={selected ? mergedStyles : nodesStyles.link}
          >
            {node}
          </div>
        </li>
      )
    }

    const selected = selectedAtom && selectedAtom.indexOf(parent.concat(node).join('')) !== -1

    return (
      <li key={node} style={nodesStyles.sidebarElement} >
        <div
          key={node}
          style={selected ? mergedStyles : nodesStyles.link}
        >
          {node}
        </div>
        {subnodes && <MenuNode nodes={subnodes} parent={parent.concat(node)} selectAtom={selectAtom} selectedAtom={selectedAtom} />}
      </li>
    )
  }
}
