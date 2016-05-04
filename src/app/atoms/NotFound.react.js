import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';

@Radium
export default class NotFound extends Component {

  static propTypes = {
    children: RPT.node.isRequired
  }

  static defaultProps = {
    children: 'Not found'
  }

  render() {
    const {children} = this.props

    return (
      <div style={[styles, font]}>
        {children}
      </div>
    )
  };

}

const styles = {
  padding: '10px 20px'
}
