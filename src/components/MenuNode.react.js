import font from './styles/Font'
import Radium from 'radium'
import React, {Component, PropTypes as RPT} from 'react'
import {styles} from './ComponentsSidebar.react'

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
      <ul style={styles.list}>
        {nodes.map((subnodes, node) => this.renderNode(node, subnodes))}
      </ul>
    )
  }

  renderNode(node, subnodes) {
    const {selectAtom, selectedAtom} = this.props

    if (typeof subnodes === 'string')
      return (
        <li key={node} style={styles.sidebarElement}>
          <div
            onClick={() => selectAtom(subnodes)}
            style={[styles.link, styles.sidebarLinkActive]}
          >
            {node}
          </div>
        </li>
      )

    return (
      <li key={node} style={styles.sidebarElement} >
        {node}
        {subnodes && <MenuNode nodes={subnodes} selectAtom={selectAtom} selectedAtom={selectedAtom} />}
      </li>
    )
  }
}
