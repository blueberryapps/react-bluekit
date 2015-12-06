//import './header.sass';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import {Link} from 'react-router';

@Radium
export default class Header extends Component {

  static propTypes = {
    mountPoint: RPT.string.isRequired
  }

  render() {
    const {mountPoint} = this.props

    return (
      <header>
        <h1>
          <Link to='/'>Back to APP</Link>
          :
          <Link to={mountPoint}>Component Library</Link>
        </h1>
      </header>
    );
  }

}

const styles = {
  mainContainer: {
    backgroundColor: 'hsl(0, 0%, 100%)',
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'horizontal',
  },
};
