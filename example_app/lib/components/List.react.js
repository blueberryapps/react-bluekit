import Component from './Component';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Link} from 'react-router';

@Radium
export default class Library extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    mountPoint: RPT.string.isRequired
  }

  renderAtom(file) {
    const {mountPoint} = this.props

    return (
      <div>
        <h2>
          <Link
            to={`/${mountPoint}/${file}`}
          >
            {file.replace(/\.?(react)?.jsx?/, '')}
          </Link>
        </h2>
      </div>
    );
  }

  render() {
    const {componentsIndex} = this.props

    return (
      <div>
        {Object.keys(componentsIndex).map(file => this.renderAtom(file))}
      </div>
    );
  }
}
