import React, {Component} from '../../node_modules/react';
import {BlueKitDetail} from '../../src';
// import componentsIndex from './componentsIndex';
import ExampleComponentsButton from '../../example_components/Button.react.js';

const Test = (props) => <div> Ahoj </div>
Test.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Example</h1>
        <BlueKitDetail Component={ExampleComponentsButton} />
        <h1>Rest</h1>
        <BlueKitDetail Component={Test} />
      </div>
    );
  }
}
      // <BlueKit
      //   componentsIndex={componentsIndex}
      // />
