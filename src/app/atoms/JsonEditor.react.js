import AceEditor from './AceEditor.react';
import Component from 'react-pure-render/component';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';

@Radium
export default class JsonEditor extends Component {
  static propTypes = {
    name: RPT.string,
    onChange: RPT.func,
    value: RPT.any
  };

  state = {
    error: null,
    value: JSON.stringify(this.props.value, null, 2)
  }

  render() {
    const {name} = this.props
    const {value, error} = this.state

    return (
      <div>
        <AceEditor
          editorProps={{$blockScrolling: true}}
          fontSize={11}
          height="auto"
          highlightActiveLine={false}
          maxLines={this.numberOfRows() + 1}
          minLines={this.numberOfRows()}
          mode="javascript"
          name={`${name}-json-editor`}
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
        {error && <div style={{color: 'red'}}>{error.message}</div>}
      </div>
    );
  };

  onChange(value) {
    const {onChange} = this.props

    try {
      this.setState({error: null, value})
      onChange({value: eval(`[${value}][0]`)}) // eslint-disable-line no-eval
    }
    catch (error) {
      this.setState({error, value})
    }
  }

  numberOfRows() {
    const {value} = this.state

    return `${value}`.split(/\n/g).length
  }

};
