import '../libraries/BluekitEvent';
import Content from './Content.react';
import Component from './PureRenderComponent.react';
import FontBold from './styles/FontBold';
import MediaQuery from 'react-responsive';
import Radium, {StyleRoot} from 'radium';
import React from 'react';
import RPT from 'prop-types';
import ResponsiveNav from './ResponsiveNav.react';
import ResponsivePropsNav from './ResponsivePropsNav.react';
import Sidebar from './Sidebar.react';
import StateProvider from './StateProvider.react';
import {FontStyle} from './styles/Font';
import {breakPoints} from './styles/MediaQueries';

if (typeof window !== 'undefined') {
  require('brace');
  require('brace/ext/language_tools');
  require('brace/mode/jsx');
  require('brace/mode/html');
  require('brace/mode/javascript');
  require('brace/theme/chrome');
}

@StateProvider
@Radium
export default class Page extends Component {

  static propTypes = {
    children: RPT.any,
    componentsIndex: RPT.object.isRequired,
    customProps: RPT.object,
    filteredComponentsIndex: RPT.object.isRequired,
    height: RPT.string,
    inline: RPT.bool,
    mountPoint: RPT.string,
    searchedText: RPT.string,
    selectedAtom: RPT.string,
    showMobileProps: RPT.bool,
    showMobileSidebar: RPT.bool,
    simplePropsSelected: RPT.bool,
    sourceBackground: RPT.string,
    triggeredProps: RPT.object
  }

  static contextTypes = {
    resetLocalStorage: RPT.func.isRequired,
    resetPropsToDefault: RPT.func.isRequired,
    selectAtom: RPT.func.isRequired,
    searchAtoms: RPT.func.isRequired,
    toggleProps: RPT.func.isRequired,
    toggleMobileProps: RPT.func.isRequired,
    toggleSidebar: RPT.func.isRequired
  }

  static defaultProps = {
    height: '500px',
    inline: false
  }

  render() {
    const {
      children, componentsIndex, customProps, simplePropsSelected, filteredComponentsIndex, sourceBackground,
      height, inline, showMobileSidebar, showMobileProps, searchedText, triggeredProps
    } = this.props
    let {selectedAtom} = this.props;
    const {selectAtom, searchAtoms, toggleMobileProps, toggleSidebar} = this.context
    selectedAtom = componentsIndex.get(selectedAtom) ? selectedAtom : null;
    const allComponentsPreview = selectedAtom === null

    return (
      <StyleRoot>
        <div style={[styles.wrapper.base, inline ? {height: height} : styles.wrapper.full]}>
          <MediaQuery maxWidth={breakPoints.large}>
            <ResponsiveNav
              allComponentsPreview={allComponentsPreview}
              componentsIndex={componentsIndex}
              selectAtom={selectAtom}
              selectedAtom={selectedAtom}
              toggleSidebar={toggleSidebar}
            />
            <div
              onClick={toggleSidebar}
              style={[styles.overlay, showMobileSidebar && styles.overlay.active]}
            />
          </MediaQuery>
          <MediaQuery maxWidth={breakPoints.tablet}>
            {!allComponentsPreview &&
              <ResponsivePropsNav
                showMobileProps={showMobileProps}
                toggleMobileProps={toggleMobileProps}
              />
            }
          </MediaQuery>
          <Sidebar
            children={children}
            componentsIndex={filteredComponentsIndex}
            searchAtoms={searchAtoms}
            searchedText={searchedText}
            selectAtom={selectAtom}
            selectedAtom={selectedAtom}
            showMobileSidebar={showMobileSidebar}
            toggleSidebar={toggleSidebar}
          />
          <Content
            componentsIndex={componentsIndex}
            customProps={customProps}
            filteredComponentsIndex={filteredComponentsIndex}
            selectAtom={selectAtom}
            selectedAtom={selectedAtom}
            showMobileProps={showMobileProps}
            simplePropsSelected={simplePropsSelected}
            sourceBackground={sourceBackground}
            toggleMobileProps={toggleMobileProps}
            triggeredProps={triggeredProps}
          />
        </div>
        <FontStyle />
        <FontBold />
      </StyleRoot>
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

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: '100%',
    bottom: 0,
    zIndex: 9,
    opacity: 0,
    transition: 'opacity .2s ease-out',
    active: {
      right: 0,
      opacity: 1
    }
  }
};
