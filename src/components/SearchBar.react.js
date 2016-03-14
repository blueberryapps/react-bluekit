import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import Input from './atoms/Input.react'

@Radium
export default class SearchBar extends Component {

  static propTypes = {
    searchAtoms: RPT.func.isRequired,
  }

  render() {
    const {searchAtoms} = this.props

    return (
      <div>
        <Input onChange={e => searchAtoms(e.target.value)} placeholder='Search your component' type='text' />
      </div>
     );
  }
}
