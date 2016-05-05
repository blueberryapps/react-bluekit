import React, {Component} from 'react';
import BlueKit from '../../index.js';
import componentsIndex from './componentsIndex';

export default class App extends Component {
  render() {
    return (
      <BlueKit
        componentsIndex={componentsIndex || {}}
      />
    );
  }
}
