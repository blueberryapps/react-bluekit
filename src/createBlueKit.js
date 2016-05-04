import buildProps from './helpers/buildProps';
import fs from 'fs';
import packagedGulp from 'gulp';
import normalizePath from './helpers/normalizePath';
import nunjucks from 'nunjucks';
import path from 'path';
import toSource from 'tosource';
import {parse as docgenParse} from 'react-docgen';
import {packSourceCode} from './helpers/reformatSourceCode';

const nunjuckEnv = nunjucks.configure(`${__dirname}/../nunjucks/`, {autoescape: false});

function getAllFilesInDir(dir, relativeDirectory = []) {
  const resolvedDir = path.join(dir, relativeDirectory);

  if (!fs.existsSync(resolvedDir)) return null

  return [].concat.apply([], fs.readdirSync(resolvedDir).map(file => {
    const absolutePath = path.join(dir, relativeDirectory, file);

    if (fs.lstatSync(absolutePath).isDirectory()) {
      return getAllFilesInDir(dir, path.join(relativeDirectory, file));
    }

    const filePath = path.join(`./${relativeDirectory}`, file);
    if (!filePath.match(/\.(js|jsx)$/))
      return null
    if (filePath.match(/__test__/))
      return null
    return filePath
  }));
}

function objectToString(object) {
  return toSource(object || {}, null, 0)
}

function getImportFile(directory, file) {
  if (directory.match(/node_modules/)) {
    const pathParts = file.replace(/\.(js|jsx)$/, '').split(path.sep)
    pathParts[1] = 'lib'
    return pathParts.join(path.sep)
  }

  return file[0] === '.' ? file : `./${file}`
}

function generateComponentData(config, file, directory) {
  const filePath = path.join(directory, file);
  const originalSource = fs.readFileSync(filePath).toString()
  const content = originalSource
    .replace('_interopRequireDefault(_react)', 'require("react")')
    .replace(/import Component from ["']react-pure-render\/component["']/, 'import {Component} from "react"')
    .replace(/export default Radium\((.*)\)/, 'export default $1;')

  try {
    const docgen = docgenParse(content);
    const doc = {
      ...docgen,
      propsDefinition: objectToString(docgen.props)
    }

    const normalizedFile = normalizePath(file);
    const menu = normalizedFile
      .replace(/\.\.\//g, '')
      .replace('.react', '')
      .replace(/\.(js|jsx)$/, '')
      .replace(/(?:^|\/)(\w)/g, (_, c) => c ? ` ${c.toUpperCase()}` : '')
      .replace(/(?:^|[-_])(\w)/g, (_, c) => c ? `${c.toUpperCase()}` : '')
      .replace(/\//g, '')
      .trim();
    const name = menu.replace(/\s/g, '');

    const importFile = normalizePath(getImportFile(directory, file));
    const componentName = normalizedFile.replace(/.*\//, '').split('.')[0];
    const simpleProps = objectToString(buildProps(docgen.props))
    const fullProps = objectToString(buildProps(docgen.props, true))

    return {
      file: importFile,
      componentName,
      menu,
      name,
      originalSource: packSourceCode(originalSource),
      simpleProps,
      fullProps,
      ...doc,
    };
  }
  catch (error) {
    if (error.message !== 'No suitable component definition found.')
      console.error(`\u001b[31mError parsing component ${file}: ${error.message}\u001b[0m`, error.stack) // eslint-disable-line no-console
    else
      console.warn(`\u001b[33m No suitable component definition found in ${file}\u001b[0m`) // eslint-disable-line no-console
    return null;
  }
}

function getValidFiles(files) {
  return [].concat.apply([], files).filter(file => !!file);
}

export default function createBlueKit(config) {

  const {buildCommand, watchCommand, gulp} = config

  const gulpRuntime = gulp || packagedGulp
  const buildCommandName = buildCommand || 'build-bluekit'
  const watchCommandName = watchCommand || 'watch-bluekit'

  const watch = function() {
    const watchPaths = config.paths.map(file => (
      path.relative(process.cwd(), path.join(config.baseDir, file, '**/*.js'))
    ));

    console.log('Watching BlueKit in and automatically rebuilding on paths:') // eslint-disable-line no-console
    console.log(watchPaths.join('\n')); // eslint-disable-line no-console
    gulpRuntime.watch(watchPaths, [buildCommandName]);
  }

  gulpRuntime.task(buildCommandName, () => {
    console.log('Rebuilding BlueKit'); // eslint-disable-line no-console
    generate();
  })

  gulpRuntime.task(watchCommandName, () => {
    watch();
  })

  function generate() {
    const files = config.paths.map(file => (
      getAllFilesInDir(config.baseDir, file)
    ));

    const components = getValidFiles(files).map(file => {
      return generateComponentData(config, file, config.baseDir)
    }).filter(component => component !== null);

    const packages = config.nodeModulesDir && config.packages ? config.packages : []
    const packageFiles = packages.map(file => (
      getAllFilesInDir(config.nodeModulesDir, path.join(file, 'lib'))
        .concat(getAllFilesInDir(config.nodeModulesDir, path.join(file, 'dist')))
    ));

    const packageComponents = getValidFiles(packageFiles).map(file => {
      return generateComponentData(config, file, config.nodeModulesDir)
    }).filter(component => component !== null);

    const indexFile = path.join(config.baseDir, 'componentsIndex.js')
    fs.writeFileSync(
      indexFile,
      nunjuckEnv.render('componentsIndex.nunjucks', {components: components.concat(packageComponents)})
    );

    console.log(`BlueKit generated components index to file: ${indexFile}`) // eslint-disable-line no-console

    return () => {};
  };

  return generate;
}
