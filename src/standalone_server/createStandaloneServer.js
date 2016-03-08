import webpack from 'webpack'
import createWebpackConfiguration from './webpack.config'

export default function createStandaloneServer(config) {
  const webpackConfig = createWebpackConfiguration(config)
  const app = config.express()
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.use('/public', config.express.static('public'))

  app.get('*', function(req, res) {
    res.send(`
      <!doctype html>
      <html>
        <head>
          <title>React BlueKit</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
    `)
  });

  app.listen(3000, function(err) {
    if (err) {
      console.log(err) // eslint-disable-line no-console
      return;
    }

    console.log('Listening at http://localhost:3000')  // eslint-disable-line no-console
  });
}
