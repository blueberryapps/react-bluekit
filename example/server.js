const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: true
}).listen(3000, 'localhost', function(err, result) {
  if (err) {
    return console.log(err); // eslint-disable-line
  }

  console.log('Listening at http://localhost:3000/'); // eslint-disable-line
});
