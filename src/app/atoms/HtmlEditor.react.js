import AceEditor from './AceEditor.react';
import Component from 'react-pure-render/component';
import Radium from 'radium'
import React, {PropTypes as RPT} from 'react'

@Radium
export default class HtmlEditor extends Component {
  static propTypes = {
    name: RPT.string,
    onChange: RPT.func.isRequired,
    value: RPT.any
  };

  state = {
    value: this.props.value
  }

  render() {
    const {name} = this.props
    const {value} = this.state

    return (
      <div>
        <AceEditor
          editorProps={{$blockScrolling: true}}
          fontSize={11}
          height="auto"
          highlightActiveLine={false}
          maxLines={this.numberOfRows() + 1}
          minLines={this.numberOfRows()}
          mode="html"
          name={`${name}-html-editor`}
          onChange={this.onChange.bind(this)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
          }}
          showGutter
          tabSize={2}
          theme="chrome"
          value={value}
          width="100%"
        />
      </div>
    );
  };

  onChange(value) {
    const {onChange} = this.props

    this.setState({error: null, value})
    onChange({value}) // eslint-disable-line no-eval
  }

  numberOfRows() {
    const {value} = this.state

    return `${value}`.split(/\n/g).length
  }

};
