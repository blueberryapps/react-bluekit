import Component from 'react-pure-render/component';

export default (typeof window !== 'undefined')
  ? require('react-ace').default
  : class AceEditor extends Component {
    render() { return null }
  }
