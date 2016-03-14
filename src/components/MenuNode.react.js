import Radium from 'radium'
import React, {Component, PropTypes as RPT} from 'react'
import {nodesStyles} from './ComponentsSidebar.react'

@Radium
export default class MenuNode extends Component {

  static propTypes = {
    nodes: RPT.object.isRequired,
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
    const {selectAtom, selectedAtom} = this.props
    const mergedStyles = {...nodesStyles.link, ...nodesStyles.sidebarLinkActive}

    if (typeof subnodes === 'string')
      return (
        <li key={node} style={nodesStyles.sidebarElement}>
          <div
            onClick={() => selectAtom(subnodes)}
            style={selectedAtom ? mergedStyles : nodesStyles.link}
          >
            {node}
          </div>
        </li>
      )

    return (
      <li key={node} style={nodesStyles.sidebarElement} >
        {node}
        {subnodes && <MenuNode nodes={subnodes} selectAtom={selectAtom} selectedAtom={selectedAtom} />}
      </li>
    )
  }
}
