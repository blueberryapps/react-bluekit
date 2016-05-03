import Radium from 'radium'
import React, {Component, PropTypes as RPT} from 'react'
import {nodesStyles} from './Sidebar.react'

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
        {Object.keys(nodes).sort().map((key) => this.renderNode(key, nodes[key]))}
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
            dangerouslySetInnerHTML={{__html: node}}
            onClick={() => selectAtom(subnodes)}
            style={selected ? mergedStyles : nodesStyles.link}
          />
        </li>
      )
    }

    const selected = selectedAtom && selectedAtom.indexOf(parent.concat(node).join('')) !== -1
    return (
      <li key={node} style={nodesStyles.sidebarElement} >
        <div
          dangerouslySetInnerHTML={{__html: node}}
          key={node}
          style={selected ? mergedStyles : nodesStyles.link}
        />
        {subnodes && <MenuNode nodes={subnodes} parent={parent.concat(node)} selectAtom={selectAtom} selectedAtom={selectedAtom} />}
      </li>
    )
  }
}
