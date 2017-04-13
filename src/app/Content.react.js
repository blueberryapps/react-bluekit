import AllComponentsPreview from './AllComponentsPreview.react';
import Component from 'react-pure-render/component';
import ComponentPage from './component/Page.react';
import {mediaQueries} from './styles/MediaQueries';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';

@Radium
export default class Content extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    filteredComponentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    showMobileProps: RPT.bool,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    toggleMobileProps: RPT.func.isRequired,
    triggeredProps: RPT.object
  }

  renderAtom() {
    const {
      componentsIndex, customProps, selectedAtom, showMobileProps, simplePropsSelected,
      sourceBackground, toggleMobileProps, triggeredProps, selectAtom
    } = this.props

    return (
      <ComponentPage
        componentsIndex={componentsIndex}
        customProps={customProps}
        selectAtom={selectAtom}
        selectedAtom={selectedAtom}
        showMobileProps={showMobileProps}
        simplePropsSelected={simplePropsSelected}
        sourceBackground={sourceBackground}
        toggleMobileProps={toggleMobileProps}
        triggeredProps={triggeredProps}
      />
    );
  }

  renderList() {
    const {filteredComponentsIndex, selectAtom, selectedAtom} = this.props

    return (
      <div style={[styles.list]}>
        <AllComponentsPreview
          componentsIndex={filteredComponentsIndex}
          selectAtom={selectAtom}
          selectedAtom={selectedAtom}
        />
      </div>
    );
  }

  render() {
    const {selectedAtom} = this.props

    return (
      <div style={styles.content}>
        {selectedAtom ? this.renderAtom() : this.renderList()}
      </div>
    );
  }

}

const styles = {
  content: {
    width: '80%',
    height: '100%',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top',
    [mediaQueries.breakpointLarge]: {
      width: '100%'
    }
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
