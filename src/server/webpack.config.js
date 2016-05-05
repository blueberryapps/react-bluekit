var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(directory) {
  return {
    devtool: 'eval',
    context: __dirname,
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src', 'index.js')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'index.html',
        template: path.join(__dirname, '..', '..', 'templates', 'index.html')
      })
    ],
    module: {
      loaders: [{
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, '..'), directory]
      }]
    }
  };
};
