const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const createConfig = require('./webpack.config');

const directory = process.cwd()
const config = createConfig(directory)

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Bluekit is listening at http://localhost:3000/');
});
