import ExampleSource from './ExampleSource';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import resolveComponent from '../helpers/resolveComponent';
import Variants from './Variants';

@Radium
export default class Detail extends Component {

  static propTypes = {
    atom: RPT.object,
    currentProps: RPT.object,
    extendedProps: RPT.object
  }

  render() {
    const {atom, currentProps, extendedProps} = this.props
    const ExampleAtom = resolveComponent(atom.component)

    return (
      <div>
        <h1 style={styles.heading}>
          {atom.componentName}
          <small style={styles.headingSmall}>{atom.file}</small>
        </h1>
        <div style={styles.panel}>
          <h3 style={styles.blockHeading}>Example</h3>
          <div>
            <ExampleAtom {...extendedProps} />
          </div>
        </div>
        <div style={styles.panel}>
          <h3 style={styles.blockHeading}>Code</h3>
          <ExampleSource atom={atom} componentProps={currentProps} />
        </div>
        <h3 style={styles.blockHeading}>
          Prop Variants
        </h3>
        <Variants atom={atom} componentProps={currentProps} styles={styles} />
      </div>
    )
  }

}

const styles = {
  heading: {
    color: 'hsl(26, 100%, 58%)',
    fontSize: '32px',
    fontWeight: '400',
    padding: '30px 10px 0 10px',
    margin: '0',
  },

  headingSmall: {
    color: 'hsl(202, 40%, 50%)',
    fontSize: '14px',
    fontWeight: '300',
    display: 'block',
    width: '100%'
  },

  blockHeading: {
    color: 'hsl(202, 40%, 50%)',
    marginRight: '20px',
    display: 'inline-block'
  },

  panel: {
    borderLeft: '10px solid hsl(202, 100%, 85%)',
    marginTop: '2rem',
    marginBottom: '2rem',
    background: 'hsl(202, 100%, 96%)',
    padding: '10px 10px 30px 20px'
  },

  pre: {
    background: 'white',
    border: '1px solid hsl(0, 0%, 70%)',
  },
};
