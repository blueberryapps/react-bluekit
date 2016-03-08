// import Highlight from 'react-highlight/lib/optimized';
// import hljs from 'highlight.js/lib/highlight';
// import javascriptHighlight from 'highlight.js/lib/languages/javascript';
//
// hljs.registerLanguage('javascript', javascriptHighlight)
//
// export default Highlight;

import React, {Component, PropTypes as RPT} from 'react';

export default class Highlight extends Component {
  static propTypes = {
    children: RPT.object.isRequired,
  }

  render() {
    const {children} = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}
