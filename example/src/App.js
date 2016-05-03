import React, {Component} from '../../node_modules/react';
import BlueKit from '../../src';
import componentsIndex from './componentsIndex';

export default class App extends Component {
  render() {
    return (
      <BlueKit
        componentsIndex={componentsIndex}
      />
    );
  }
}
