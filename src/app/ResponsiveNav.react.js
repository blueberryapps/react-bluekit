import {breakPoints, mediaQueries} from './styles/MediaQueries';
import Component from './PureRenderComponent.react';
import font from './styles/Font';
import Icon from './atoms/Icon.react';
import MediaQuery from 'react-responsive';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import spaces from './styles/Spaces';
import * as colors from './styles/Colors';

@Radium
export default class ResponsiveNav extends Component {

  static propTypes = {
    allComponentsPreview: RPT.bool.isRequired,
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired,
    selectedAtom: RPT.string,
    toggleSidebar: RPT.func.isRequired,
  }

  renderPath(pathName, index) {
    return (
      <span key={pathName}>
        {index > 0 &&
          <Icon
            color={colors.GRAY_BRIGHT}
            kind="chevron-right"
            size={12}
            style={styles.separator}
          />
        }
        {pathName}
      </span>
    );
  }

  render() {
    const {allComponentsPreview, componentsIndex, selectedAtom, toggleSidebar} = this.props
    const selectedComponentIndex = componentsIndex.get(selectedAtom)
    const path = allComponentsPreview ? ['', 'All components'] : selectedComponentIndex.get('menu').split(/\s/)
    const componentName = path[path.length - 1]

    return (
      <div style={styles.wrapper}>
        <Icon
          color={colors.GRAY_BRIGHT}
          kind="menu"
          onClick={toggleSidebar.bind(this)}
          size={22}
          style={styles.button}
        />
        <div style={styles.text}>
          <MediaQuery minWidth={breakPoints.tablet + 1}>
            {path.map((pathName, index) => this.renderPath(pathName, index))}
          </MediaQuery>
          <MediaQuery maxWidth={breakPoints.tablet}>
            {componentName}
          </MediaQuery>
        </div>
      </div>
    );
  }

}

const styles = {
  wrapper: {
    position: 'relative',
    zIndex: 9,
    backgroundColor: 'white',
    padding: `6px ${spaces.normal} 6px 50px`,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`
  },

  button: {
    padding: '5px',
    position: 'absolute',
    left: `calc(${spaces.normal} - 5px)`,
    top: '50%',
    transform: 'translateY(-50%)',
    ':hover': {
      cursor: 'pointer'
    }
  },

  text: {
    ...font,
    display: 'inline-block',
    padding: '8px',
    [mediaQueries.breakpointTablet]: {
      ...font.size.medium,
      padding: '5px 8px 6px'
    }
  },

  separator: {
    position: 'relative',
    top: '1px',
    padding: '0 3px'
  }
}
