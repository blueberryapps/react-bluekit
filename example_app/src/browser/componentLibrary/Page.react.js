import Component from 'react-pure-render/component';
import componentsIndex from './componentsIndex';
import Library from '../../../lib/components/Library'; // eslint-disable-line
import React, {PropTypes as RPT} from 'react';
import './style.sass';

export default class Handler extends Component {
  static propTypes = {
    children: RPT.object,
  }

  render() {
    const {children} = this.props;

    return (
      <Library children={children} componentsIndex={componentsIndex} mountPoint='component-library'/>
    );
  }
}
