import Component from '../PureRenderComponent.react';

export default (typeof window !== 'undefined')
  ? require('react-ace').default
  : class AceEditor extends Component {
    render() { return null }
  }
