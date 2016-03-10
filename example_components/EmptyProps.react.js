import {Component} from 'react';
import React from 'react';

export default class EmptyProps extends Component {
  static propTypes = {}

  render() {
    return (
      <div>Empty props component</div>
    );
  }
}
