import Highlight from 'react-highlight/lib/optimized';
import hljs from 'highlight.js/lib/highlight';
import javascriptHighlight from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascriptHighlight)

export default Highlight;
