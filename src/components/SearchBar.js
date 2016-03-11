import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';

@Radium
export default class SearchBar extends Component {

  static propTypes = {
    searchAtoms: RPT.func.isRequired,
  }

  render() {
    const {searchAtoms} = this.props

    return (
      <div>
        <input onChange={e => searchAtoms(e.target.value)} type="text" />
      </div>
     );
  }
}
