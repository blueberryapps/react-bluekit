'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createBlueKit;

var _buildProps = require('./libraries/buildProps');

var _buildProps2 = _interopRequireDefault(_buildProps);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _normalizePath = require('./libraries/normalizePath');

var _normalizePath2 = _interopRequireDefault(_normalizePath);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tosource = require('tosource');

var _tosource2 = _interopRequireDefault(_tosource);

var _reactDocgen = require('react-docgen');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nunjuckEnv = _nunjucks2.default.configure(__dirname + '/../nunjucks/', { autoescape: false });
nunjuckEnv.addFilter('escapeJsString', function (input) {
  return JSON.stringify(input).replace(/'/g, '\\\'').slice(1, -1);
});

function getAllFilesInDir(dir) {
  var relativeDirectory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var resolvedDir = _path2.default.join(dir, relativeDirectory);

  if (!_fs2.default.existsSync(resolvedDir)) return null;

  return [].concat.apply([], _fs2.default.readdirSync(resolvedDir).map(function (file) {
    var absolutePath = _path2.default.join(dir, relativeDirectory, file);

    if (_fs2.default.lstatSync(absolutePath).isDirectory()) {
      return getAllFilesInDir(dir, _path2.default.join(relativeDirectory, file));
    }

    var filePath = _path2.default.join('./' + relativeDirectory, file);
    if (!filePath.match(/\.(js|jsx|tsx)$/)) return null;
    if (filePath.match(/__test__/)) return null;
    return filePath;
  }));
}

function objectToString(object) {
  return (0, _tosource2.default)(object || {}, null, 0);
}

function getImportFile(directory, file) {
  if (directory.match(/node_modules/)) {
    var pathParts = file.replace(/\.(js|jsx|tsx)$/, '').split(_path2.default.sep);
    pathParts[1] = 'lib';
    return pathParts.join(_path2.default.sep);
  }

  return file[0] === '.' ? file : './' + file;
}

function getDocgen(config, filePath) {
  if (filePath.match(/\.tsx$/)) return require('react-docgen-typescript').parse(filePath);

  var content = _fs2.default.readFileSync(filePath).toString();
  if (!config.noSpecialReplacements) {
    content = content.replace('_interopRequireDefault(_react)', 'require("react")').replace(/import Component from ["']react-pure-render\/component["']/, 'import {Component} from "react"').replace(/export default .*\((\w*)\)+/m, 'export default $1');
  }
  return (0, _reactDocgen.parse)(content);
}

function generateComponentData(config, file, directory) {
  var filePath = _path2.default.join(directory, file);

  try {
    var docgen = getDocgen(config, filePath);

    var doc = _extends({}, docgen, {
      propsDefinition: objectToString(docgen.props)
    });

    var normalizedFile = (0, _normalizePath2.default)(file);
    var menu = normalizedFile.replace(/\.\.\//g, '').replace('.react', '').replace(/\.(js|jsx|tsx)$/, '').replace(/(?:^|\/)(\w)/g, function (_, c) {
      return c ? ' ' + c.toUpperCase() : '';
    }).replace(/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? '' + c.toUpperCase() : '';
    }).replace(/\//g, '').trim();

    var name = menu.replace(/\W/g, '');

    var importFile = (0, _normalizePath2.default)(getImportFile(directory, file));
    var componentName = normalizedFile.replace(/.*\//, '').split('.')[0];
    var simpleProps = objectToString((0, _buildProps2.default)(docgen.props));
    var fullProps = objectToString((0, _buildProps2.default)(docgen.props, true));

    return _extends({
      file: importFile,
      componentName: componentName,
      menu: menu,
      name: name,
      simpleProps: simpleProps,
      fullProps: fullProps
    }, doc);
  } catch (error) {
    if (error.message !== 'No suitable component definition found.') console.error('\x1B[31mError parsing component ' + file + ': ' + error.message + '\x1B[0m', error.stack); // eslint-disable-line no-console
    else console.warn('\x1B[33m No suitable component definition found in ' + file + '\x1B[0m'); // eslint-disable-line no-console
    return null;
  }
}

function getValidFiles(files) {
  return [].concat.apply([], files).filter(function (file) {
    return !!file;
  });
}

function createBlueKit(config) {
  var buildCommand = config.buildCommand,
      watchCommand = config.watchCommand,
      gulp = config.gulp;


  var gulpRuntime = gulp || _gulp2.default;
  var buildCommandName = buildCommand || 'build-bluekit';
  var watchCommandName = watchCommand || 'watch-bluekit';

  var watch = function watch() {
    var watchPaths = config.paths.map(function (file) {
      return _path2.default.relative(process.cwd(), _path2.default.join(config.baseDir, file, '**/*.{js,jsx,tsx}'));
    });

    console.log('Watching BlueKit in and automatically rebuilding on paths:'); // eslint-disable-line no-console
    console.log(watchPaths.join('\n')); // eslint-disable-line no-console
    return gulpRuntime.watch(watchPaths, [buildCommandName]);
  };

  gulpRuntime.task(buildCommandName, function () {
    console.log('Rebuilding BlueKit'); // eslint-disable-line no-console
    generate();
  });

  gulpRuntime.task(watchCommandName, function (callback) {
    return watch();
  });

  function generate() {
    var files = config.paths.map(function (file) {
      return getAllFilesInDir(config.baseDir, file);
    });

    var components = getValidFiles(files).map(function (file) {
      return generateComponentData(config, file, config.baseDir);
    }).filter(function (component) {
      return component !== null;
    });

    var packages = config.nodeModulesDir && config.packages ? config.packages : [];
    var packageFiles = packages.map(function (file) {
      return getAllFilesInDir(config.nodeModulesDir, _path2.default.join(file, 'lib')).concat(getAllFilesInDir(config.nodeModulesDir, _path2.default.join(file, 'dist')));
    });

    var packageComponents = getValidFiles(packageFiles).map(function (file) {
      return generateComponentData(config, file, config.nodeModulesDir);
    }).filter(function (component) {
      return component !== null;
    });

    var indexFile = _path2.default.join(config.baseDir, 'componentsIndex.js');
    _fs2.default.writeFileSync(indexFile, nunjuckEnv.render('componentsIndex.nunjucks', { components: components.concat(packageComponents) }));

    console.log('BlueKit generated components index to file: ' + indexFile); // eslint-disable-line no-console

    return function () {};
  };

  return generate;
}