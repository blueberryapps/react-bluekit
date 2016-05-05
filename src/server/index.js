require('babel-core/register')
const path = require('path');
const createBluekit = require('../createBlueKit').default;
const directory = process.cwd()

const bluekit = createBluekit({
  // your directory where components are located
  baseDir: directory,
  componentsIndexDir: path.join(__dirname, 'src'),
  // relative paths from base dir where to look for components
  paths: ['.']
})
bluekit()

require('./server')
