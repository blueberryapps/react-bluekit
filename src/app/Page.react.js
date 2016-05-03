import '../helpers/BluekitEvent';
import * as colors from './styles/Colors.js'
import AllComponentsPreview from './AllComponentsPreview.react';
import ComponentPage from './component/Page.react';
import HighlightStyle from './styles/HighlightStyle';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import Sidebar from './Sidebar.react';
import StateProvider from './StateProvider.react'
import {FontStyle} from './styles/Font';

@StateProvider
@Radium
export default class Page extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    height: RPT.string,
    inline: RPT.bool,
    mountPoint: RPT.string,
    searchedText: RPT.string,
    selectedAtom: RPT.string,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.array
  }

  static contextTypes = {
    resetPropsToDefault: RPT.func.isRequired,
    selectAtom: RPT.func.isRequired,
    searchAtoms: RPT.func.isRequired,
    toggleProps: RPT.func.isRequired
  }

  static defaultProps = {
    height: '500px',
    inline: false
  }

  render() {
    const {componentsIndex, height, inline, selectedAtom, searchedText} = this.props
    const {selectAtom, searchAtoms} = this.context

    return (
      <div>
        <div style={[styles.wrapper.base, inline ? {height: height} : styles.wrapper.full]}>
          <div style={styles.sidebar}>
            <Sidebar
              componentsIndex={componentsIndex}
              searchAtoms={searchAtoms}
              searchedText={searchedText}
              selectAtom={selectAtom}
              selectedAtom={selectedAtom}
            />
          </div>
          <div style={styles.content}>
            {selectedAtom ? this.renderAtom() : this.renderList()}
          </div>
        </div>
        <HighlightStyle />
        <FontStyle />
      </div>
    );
  }

  renderAtom() {
    const {componentsIndex, customProps, selectedAtom, simplePropsSelected, sourceBackground, triggeredProps} = this.props

    return (
      <ComponentPage
        componentsIndex={componentsIndex}
        customProps={customProps}
        selectedAtom={selectedAtom}
        simplePropsSelected={simplePropsSelected}
        sourceBackground={sourceBackground}
        triggeredProps={triggeredProps}
      />
    );
  }

  renderList() {
    const {componentsIndex, selectedAtom} = this.props
    const {selectAtom} = this.context

    return (
      <div style={[styles.list]}>
        <AllComponentsPreview
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
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: `1px solid ${colors.GRAY_DARKER}`,
    position: 'relative'
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
