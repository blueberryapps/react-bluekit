const path = require('path')

const configureSvgIcon = require('react-svg-icon-generator').default;

configureSvgIcon({
  destination: path.join(__dirname, 'src', 'app', 'atoms', 'Icon.react.js'),
  radium: true,
  reactPureRender: true,
  svgDir: path.join(__dirname, 'src', 'icons')
});
