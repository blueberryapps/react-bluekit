import extendComponentProps from '../helpers/extendComponentProps';
import headingStyles from './styles/Headings';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../helpers/resolveComponent';
import * as colors from './styles/Colors'

@Radium
export default class List extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    selectAtom: RPT.func.isRequired
  }

  render() {
    const {componentsIndex} = this.props

    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapper.row}>
          {Object.keys(componentsIndex).map(
            (name, index) => this.renderAtom(name, index % 2)
          )}
        </div>
      </div>
    );
  }

  renderAtom(name, isOdd) {
    const {componentsIndex, selectAtom} = this.props
    const data = componentsIndex[name]
    const ExampleComponent = resolveComponent(data.component)

    return (
      <div
        key={name}
        style={[
          styles.atom.wrapper,
          isOdd && styles.atom.wrapper.odd
        ]}
      >
        <div
          key={name}
          onClick={() => selectAtom(name)}
          style={headingStyles}
        >
          {data.menu}
        </div>
        <div style={styles.column}>
          <ExampleComponent {...extendComponentProps(data.simpleProps, data.propsDefinition)} />
        </div>
        <div style={styles.column}>
          <ExampleComponent {...extendComponentProps(data.fullProps, data.propsDefinition)} />
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
      textAlign: 'center'
    }
  }
}
