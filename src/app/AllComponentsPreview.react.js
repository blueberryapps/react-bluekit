import AtomPreview from './Detail/AtomPreview.react';
import Component from 'react-pure-render/component';
import getComponentProps from '../helpers/getComponentProps';
import getComponentPropsDefinition from '../helpers/getComponentPropsDefinition';
import headingStyles from './styles/Headings';
import NotFound from './atoms/NotFound.react';
import parseHighlightedMenu from '../helpers/parseHighlightedMenu';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import ZoomContent from './atoms/ZoomContent.react';
import * as colors from './styles/Colors';

@Radium
export default class AllComponentsPreview extends Component {

  static propTypes = {
    components: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired,
    sourceBackground: RPT.string
  }

  render() {
    const {components} = this.props
    let index = 0
    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapper.row}>
          {components.sortBy((value, key) => key).map(
            (component, name) => this.renderComponent(name, component, (index++ % 2))
          )}
          {components.size === 0 && this.renderNotFound()}
        </div>
      </div>
    );
  }

  renderNotFound() {
    return <NotFound>No components to display</NotFound>
  }

  renderComponent(name, component, isOdd) {
    const {selectAtom} = this.props
    const heading = parseHighlightedMenu(component.get('highlightedMenu') || component.get('name'))
    const definition = getComponentPropsDefinition(component.get('component'))

    return (
      <div
        key={name}
        style={[
          styles.atom.wrapper,
          isOdd && styles.atom.wrapper.odd
        ]}
      >
        <div style={styles.headingWrapper}>
          <h2
            dangerouslySetInnerHTML={{__html: heading}}
            key={name}
            onClick={() => selectAtom(name)}
            style={[headingStyles, headingStyles.allComponents]}
          />
        </div>
        <div style={styles.atom.column}>
          <ZoomContent>
            <AtomPreview
              Component={component.get('component')}
              componentProps={getComponentProps(definition, true)}
              componentPropsDefinition={definition}
            />
          </ZoomContent>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    padding: '15px',
    row: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },

  headingWrapper: {
    marginBottom: '20px',
  },

  atom: {
    wrapper: {
      width: '50%',
      float: 'left',
      padding: '15px 15px 15px 0',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${colors.GRAY_DARKER}`,
      borderRight: `1px solid ${colors.GRAY_DARKER}`,
      odd: {
        borderRight: 0,
        padding: '15px 0 15px 15px'
      }
    },
    column: {
      clear: 'both'
    }
  }
}
