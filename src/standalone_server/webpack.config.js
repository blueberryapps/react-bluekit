import path from 'path'
import webpack from 'webpack'

export default function createWebpackConfiguration(config) {
  const componentPaths = config.paths.map(file => path.join(config.baseDir, file))
  console.log(componentPaths)
  return {
    // or devtool: 'eval' to debug issues with compiled output:
    devtool: 'cheap-module-eval-source-map',
    entry: [
      // necessary for hot reloading with IE:
      'eventsource-polyfill',
      // listen to code updates emitted by hot middleware:
      'webpack-hot-middleware/client',
      // your code:
      path.join(__dirname, 'index.js')
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, '..'), ...componentPaths]
      }]
    }
  };
}
