import Radium, {Style} from 'radium';
import React, {Component} from 'react';

@Radium
export class FontStyle extends Component {
  render() {
    return (
      <Style rules={{
        '@font-face': {
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          src: "local('Open Sans'), local('OpenSans'), url(https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3ZBw1xU1rKptJj_0jans920.woff2) format('woff2')",
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
        }
      }}/>
    )
  }
}

export default {
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: 'normal',
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  }

}
