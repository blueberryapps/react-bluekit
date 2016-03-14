import Atom from './Atom.react';
import ComponentsSidebar from './ComponentsSidebar.react';
import HighlightStyle from './styles/HighlightStyle';
import List from './List.react';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import StateProvider from './StateProvider.react'
import * as colors from './styles/Colors.js'

@StateProvider
@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    height: RPT.string,
    inline: RPT.bool,
    mountPoint: RPT.string,
    selectedAtom: RPT.string,
    simplePropsSelected: RPT.bool
  }

  static contextTypes = {
    resetPropsToDefault: RPT.func.isRequired,
    selectAtom: RPT.func.isRequired,
    toggleProps: RPT.func.isRequired
  }

  static defaultProps = {
    height: '500px',
    inline: false
  }

  render() {
    const {componentsIndex, height, inline, selectedAtom} = this.props
    const {selectAtom} = this.context

    return (
      <div>
        <div style={[styles.wrapper.base, inline ? {height: height} : styles.wrapper.full]}>
          <div style={styles.sidebar}>
            <ComponentsSidebar
              componentsIndex={componentsIndex}
              selectAtom={selectAtom.bind(this)}
              selectedAtom={selectedAtom}
            />
          </div>
          <div style={styles.content}>
            {selectedAtom ? this.renderAtom() : this.renderList()}
          </div>
        </div>
        <HighlightStyle />
      </div>
    );
  }

  renderAtom() {
    const {componentsIndex, customProps, selectedAtom, simplePropsSelected} = this.props

    return (
      <Atom
        componentsIndex={componentsIndex}
        customProps={customProps}
        selectedAtom={selectedAtom}
        simplePropsSelected={simplePropsSelected}
      />
    );
  }

  renderList() {
    const {componentsIndex, selectedAtom} = this.props
    const {selectAtom} = this.context

    return (
      <div style={[styles.list]}>
        <List
          componentsIndex={componentsIndex}
          selectAtom={selectAtom}
          selectedAtom={selectedAtom}
        />
      </div>
    );
  }

}

const styles = {
  wrapper: {
    base: {
      background: 'white',
      width: '100%'
    },
    full: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  sidebar: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    overflowY: 'auto',
    boxSizing: 'border-box',
    borderRight: `1px solid ${colors.GRAY_DARKER}`
  },
  content: {
    width: '80%',
    height: '100%',
    display: 'inline-block',
    position: 'relative'
  },
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto'
  }
};
