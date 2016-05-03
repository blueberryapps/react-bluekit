require('babel-register')

const gulp = require('gulp')
const path = require('path')
const createBlueKit = require('../src/createBlueKit').default

createBlueKit({
  // base file of start - this is location where componentsIndex.js will be generated to
  baseDir: path.join(__dirname, 'src'),
  gulp,
  // relative paths from base dir where to look for components
  paths: ['../../src/app/atoms', '../../example_components'],
})

gulp.task('server', function() {
  require('./server')
})

gulp.task('default', ['build-bluekit', 'server', 'watch-bluekit'])
