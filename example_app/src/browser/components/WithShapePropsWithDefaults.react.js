import Component from 'react-pure-render/component';
import React, {PropTypes as RPT} from 'react';

export default class WithShapeWithDefaults extends Component {

  static propTypes = {
    interval:     RPT.shape({
      value: RPT.number.isRequired,
      text:  RPT.string.isRequired,
    }).isRequired
  }

  static defaultProps = {
    interval: {
      value: 123,
      text: 'Foo'
    }
  }

  render() {
    return (
      <div>No props component</div>
    );
  }
}
