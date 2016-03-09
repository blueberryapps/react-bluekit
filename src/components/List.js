import extendComponentProps from '../helpers/extendComponentProps';
import getComponentLink from '../helpers/getComponentLink'
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../helpers/resolveComponent';
import {Link} from 'react-router';

const RadiumLink = Link;

@Radium
export default class List extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    mountPoint: RPT.string.isRequired
  }

  render() {
    const {componentsIndex} = this.props

    return (
      <div>
        {Object.keys(componentsIndex).map(name => this.renderAtom(name))}
      </div>
    );
  }

  renderAtom(name) {
    const {componentsIndex, mountPoint} = this.props
    const data = componentsIndex[name]
    const ExampleComponent = resolveComponent(data.component)

    return (
      <div key={name}>
        <RadiumLink
          key={name}
          style={styles.headingLink}
          to={getComponentLink({mountPoint, name})}
        >
          {data.menu}
        </RadiumLink>
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
  column: {
    width: '49%',
    display: 'inline-block',
    borderLeft: '10px solid hsl(202, 100%, 85%)',
    marginTop: '5px',
    marginBottom: '0',
    marginRight: '10px',
    paddingTop: '20px',
    paddingBottom: '50px',
    paddingLeft: '20px',
    paddingRight: '30px',
    background: 'hsl(202, 100%, 96%)',
  },

  headingLink: {
    display: 'block',
    color: 'hsl(26, 100%, 58%)',
    textDecoration: 'underline',
    padding: '30px 0 10px 0',
  }
}
