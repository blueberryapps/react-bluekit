import Component from 'react-pure-render/component';

export default (typeof window !== 'undefined')
  ? require('react-ace')
  : class AceEditor extends Component {
    render() { return null }
  }
