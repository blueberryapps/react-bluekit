import Radium, {Style} from 'radium';
import React, {Component} from 'react';

@Radium
export class FontStyle extends Component {
  render() {
    return (
      <Style rules={{
        '@font-face': {
          fontFamily: 'Source Sans Pro',
          fontStyle: 'normal',
          fontWeight: 400,
          src: "local('Source Sans Pro'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlJbPFduIYtoLzwST68uhz_Y.woff2) format('woff2')",
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
        },
        iframe: {
          border: 'none'
        }
      }}/>
    )
  }
}

export default {
  fontFamily: 'Source Sans Pro, sans-serif',
  fontWeight: 'normal',
  fontSize: '14px',
  textAlign: 'left',
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  size: {
    medium: {
      fontSize: '18px'
    },
    normal: {
      fontSize: '14px'
    },
    small: {
      fontSize: '12px'
    }
  }

}
