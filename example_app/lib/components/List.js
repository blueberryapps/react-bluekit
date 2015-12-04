import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../resolveComponent';
import {Link} from 'react-router';

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
        <h2><Link to={`/${mountPoint}/${name}`}>{data.menu}</Link></h2>
        <div style={styles.column}>
          <ExampleComponent {...data.simpleProps} />
        </div>
        <div style={styles.column}>
          <ExampleComponent {...data.fullProps} />
        </div>
      </div>
    );
  }
}

const styles = {
  column: {
    width: '49%',
    display: 'inline-block'
  }
}
