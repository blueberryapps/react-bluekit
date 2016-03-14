import Atom from './Atom.react';
import ComponentsSidebar from './ComponentsSidebar.react';
import HighlightStyle from './HighlightStyle';
import List from './List';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import StateProvider from './StateProvider.react'

@StateProvider
@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
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

  render() {
    const {componentsIndex, selectedAtom} = this.props
    const {selectAtom} = this.context

    return (
      <div>
        <div style={[styles.wrapper.base, !selectedAtom && styles.wrapper.noAtom]}>
          <ComponentsSidebar
            componentsIndex={componentsIndex}
            selectAtom={selectAtom.bind(this)}
            selectedAtom={selectedAtom}
          />
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
      <List
        componentsIndex={componentsIndex}
        selectAtom={selectAtom}
        selectedAtom={selectedAtom}
      />
    );
  }
}

const styles = {
  wrapper: {
    base: {
      paddingLeft: '550px'
    },
    noAtom: {
      paddingLeft: '250px'
    }
  }
};
