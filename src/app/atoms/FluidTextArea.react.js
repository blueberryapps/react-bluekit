import Radium from 'radium'
import React, {Component, PropTypes as RPT} from 'react'

@Radium
export default class TextField extends Component {
  static propTypes = {
    onChange: RPT.func.isRequired,
    value: RPT.string
  };

  render() {
    const {value, onChange} = this.props

    return (
      <textarea
        onChange={onChange}
        rows={this.numberOfRows()}
        style={styles}
        value={value}
      />
    );
  };

  numberOfRows() {
    const {value} = this.props

    return `${value}`.split(/\n/g).length
  }

};

const styles = {
  width: '100%'
};
