import {CompactPicker as Color} from 'react-color';
import React, {Component} from 'react';
import RPT from 'prop-types';

export default class ColorPicker extends Component {

  static propTypes = {
    color: RPT.string,
    onChangeComplete: RPT.func,
    visible: RPT.bool.isRequired
  }

  render() {
    const {onChangeComplete} = this.props

    return (
      <Color
        color={this.props.color}
        onChangeComplete={onChangeComplete}
      />
    )
  }
}
