import React, {Component} from '../../node_modules/react';
import BlueKit, {BlueKitDetail} from '../../src';
import ExampleComponentsButton from '../../example_components/Button.react.js';
import SrcAppAtomsIcon from '../../src/app/atoms/Icon.react.js';
import SrcAppAtomsInput from '../../src/app/atoms/Input.react.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Example of Browser</h1>
        <BlueKit components={
          {Form: [ExampleComponentsButton], Inputs: [SrcAppAtomsIcon],
            Src: {
              App: {
                Atoms: {
                  SrcAppAtomsIcon,
                  SrcAppAtomsInput
                }
              }
            },

            SrcAppAtomsIcon, SrcAppAtomsInput}

          } inline />
         <h1>Example of Detail</h1>
         <BlueKitDetail component={ExampleComponentsButton} />
      </div>
    );
  }
}

