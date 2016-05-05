import Radium, {Style} from 'radium';
import React, {Component} from 'react';

@Radium
export default class FontBoldStyle extends Component {
  render() {
    return (
      <Style rules={{
        '@font-face': {
          fontFamily: 'Source Sans Pro',
          fontStyle: 'normal',
          fontWeight: 700,
          src: "local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGJkF8H8ye47wsfpWywda8og.woff2) format('woff2')",
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
        }
      }}/>
    )
  }
}
