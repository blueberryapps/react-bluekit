/* eslint-disable no-undef, no-console */
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import mochaRunCreator from './test/mochaRunCreator';
import os from 'os';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import webpackBuild from './webpack/build';
import yargs from 'yargs';

import createComponentLibraryGenerator from '../src/createGenerator';

createComponentLibraryGenerator({
  // base file of start - this is location where componentsIndex.js will be generated to
  baseDir: `${__dirname}/src/browser/componentLibrary`,
  // relative paths from base dir where to look for components
  paths: ['../components/'],
  // if you want to use gulp tasks pass gulp
  gulp: gulp,
  // specify name for build command -> gulp build-component-library
  buildCommand: 'build-component-library',
  // specify name for watch command -> gulp watch-component-library
  watchCommand: 'watch-component-library'
});

const args = yargs
  .alias('p', 'production')
  .argv;

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-component-library-lib', () => {
  return gulp.src('../src/**/*.js')
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch-component-library-lib', () => {
  gulp.watch('../src/**/*.js', ['build-component-library-lib']);
});

gulp.task('clean', done => del('build/*', done));

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-component-library-lib', 'build-component-library', 'build-webpack']);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});

// Continuous test running
gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRunCreator('log')
  );
});

gulp.task('test', done => {
  runSequence('eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
// Shell fixes Windows este/issues/522, bg is still needed for server-hot.
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon src/server')
));

gulp.task('server', ['env'], done => {
  if (args.production)
    runSequence('clean', 'build', 'server-node', done);
  else
    runSequence('server-hot', 'server-nodemon', done);
});

gulp.task('default', ['build-component-library-lib', 'build-component-library', 'server', 'watch-component-library-lib', 'watch-component-library']);

// React Native

// Fix for custom .babelrc cache issue.
// https://github.com/facebook/react-native/issues/1924#issuecomment-120170512
gulp.task('clear-react-packager-cache', function() {
  // Clear react-packager cache
  const tempDir = os.tmpdir();

  const cacheFiles = fs.readdirSync(tempDir).filter(function(fileName) {
    return fileName.indexOf('react-packager-cache') === 0;
  });

  cacheFiles.forEach(function(cacheFile) {
    const cacheFilePath = path.join(tempDir, cacheFile);
    fs.unlinkSync(cacheFilePath);
    console.log('Deleted cache: ', cacheFilePath);
  });

  if (!cacheFiles.length) {
    console.log('No cache files found!');
  }
});
