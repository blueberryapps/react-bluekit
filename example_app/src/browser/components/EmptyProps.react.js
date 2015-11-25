import Component from 'react-pure-render/component';
import React from 'react';

export default class EmptyProps extends Component {
  static propTypes = {}

  render() {
    return (
      <div>Empty props component</div>
    );
  }
}
