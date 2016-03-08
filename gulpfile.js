require('babel-register')
const gulp = require('gulp')
const express = require('express')
const createBlueKit = require('./src/createGenerator').default

createBlueKit({
  // base file of start - this is location where componentsIndex.js will be generated to
  baseDir: `${__dirname}`,
  // relative paths from base dir where to look for components
  paths: ['components'],
  // if you want to use gulp tasks pass gulp
  gulp: gulp,
  express: express,
  // specify name for build command -> gulp build-component-library
  buildCommand: 'build-component-library',
  // specify name for watch command -> gulp watch-component-library
  watchCommand: 'watch-component-library',
})
