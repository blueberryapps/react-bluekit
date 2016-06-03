import React, {Component} from '../../node_modules/react';
import {BlueKitDetail} from '../../src';
import SrcAppAtomsIcon from '../../src/app/atoms/Icon.react.js';
import ExampleComponentsButton from '../../example_components/Button.react';

export default class App extends Component {
  render() {
    return (
      <div>
         <h1>Example of Button</h1>
         <p>You can use this button like this:</p>
         <pre><code>&lt;BlueKitDetail component=&#123;Button&#125; /&gt;</code></pre>
         <BlueKitDetail component={ExampleComponentsButton} />

         <h1>Example of Icon</h1>
         <BlueKitDetail component={SrcAppAtomsIcon} />
      </div>
    );
  }
}

