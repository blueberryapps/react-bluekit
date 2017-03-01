#! /usr/bin/env node
const createBlueKit = require('../lib/createBlueKit').default;
const path = require('path');

const argv = require('yargs')
    .usage('Usage: \nyarn bluekit -- --baseDir [./src/browser] --paths [./components/ ./auth]')
    .help('h')
    .alias('h', 'help')

    .describe('baseDir', 'your directory where components are located')

    .array('paths')
    .describe('paths', 'relative paths from base dir where to look for components')

    .boolean('noSpecialReplacements')
    .describe('noSpecialReplacements', 'set to true when providing simple components such as `export default function MyComponent() { <div>Hello</div> }`')

    .example('--baseDir ./src --paths ./components')
    .demand(['baseDir', 'paths'])

    .array('exclude')
    .describe('exclude', 'exclude files or directories from components listing`')
    .argv;

const baseDir = path.join(process.cwd(), argv.baseDir);

const config = {
  baseDir: baseDir,
  paths: [].concat(argv.paths),
  exclude: [].concat(argv.exclude),
  noSpecialReplacements: argv.noSpecialReplacements,
  gulp: {
    task: function() { }
  }
}

createBlueKit(config)();
