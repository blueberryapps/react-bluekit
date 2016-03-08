import Library from './Library'
import React, {Component, PropTypes as RPT} from 'react';

export default class Page extends Component {
  static propTypes = {
    children: RPT.object.isRequired,
  }

  render() {
    const {children} = this.props

    return (
      <Library children={children}/>
    )
  }
}
