const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: true
}).listen(8001, 'localhost', function(err, result) {
  if (err) {
    return console.log(err); // eslint-disable-line
  }

  console.log('Listening at http://localhost:8001/'); // eslint-disable-line
});
