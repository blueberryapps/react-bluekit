import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Input from './Input.react';
import Radium from 'radium';
import ReactDOM from 'react-dom';
import React from 'react';
import Textarea from './Textarea.react';
import * as colors from '../styles/Colors'

@Radium
export default class ExpandableInput extends Component {

  state = {
    textarea: false
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.textarea && this.state.textarea) {
      const node = ReactDOM.findDOMNode(this.refs.textarea)
      if (node)
        node.focus()
    }
  }

  handleClick() {
    this.setState({textarea: true})
  }


  handleClose() {
    this.setState({textarea: false})
  }

  renderInput() {
    return <Input {...this.props} />
  }

  renderTextarea() {
    return <Textarea {...this.props} ref='textarea' />
  }

  render() {
    const {textarea} = this.state;

    return (
      <div>
        <p
          onClick={this.handleClose.bind(this)}
          style={[
            styles.close,
            textarea && styles.close.visible
          ]}
        >
          DONE
        </p>
        <div onClick={this.handleClick.bind(this)}>
          {textarea ? this.renderTextarea() : this.renderInput()}
        </div>
      </div>
    );
  }

};

const styles = {
  close: {
    ...font,
    ...font.bold,
    ...font.size.small,
    color: colors.BLUE,
    display: 'none',
    margin: '0 0 5px 0',
    ':hover': {
      cursor: 'pointer'
    },
    visible: {
      display: 'block'
    }
  }
}
