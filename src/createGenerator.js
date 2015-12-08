import buildProps from './buildProps';
import fs from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import toSource from 'tosource';
import {parse as docgenParse} from 'react-docgen';

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
  const content = fs.readFileSync(filePath)
    .toString()
    .replace('_interopRequireDefault(_react)', 'require("react")');

  try {
    const docgen = docgenParse(content);
    const doc = {
      ...docgen,
      propsDefinition: objectToString(docgen.props)
    }

    const menu = file
      .replace(/\.\.\//g, '')
      .replace('.react', '')
      .replace(/\.(js|jsx)$/, '')
      .replace(/(?:^|[-_/])(\w)/g, (_, c) => c ? ` ${c.toUpperCase()}` : '')
      .replace(/\//g, '')
      .trim();

    const name = menu.replace(/\s/g, '');

    const importFile = getImportFile(directory, file)
    const componentName = file.replace(/.*\//, '').split('.')[0];
    const simpleProps = objectToString(buildProps(docgen.props))
    const fullProps = objectToString(buildProps(docgen.props, true))

    return {
      file: importFile,
      componentName,
      menu,
      name,
      simpleProps,
      fullProps,
      ...doc,
    };
  }
  catch (error) {
    if (error.message !== 'No suitable component definition found.')
      console.error(`\u001b[31mError parsing component ${file}: ${error.message}\u001b[0m`) // eslint-disable-line no-console
    // console.log(`Skipping ${file} because it is not containing valid react component`, error); // eslint-disable-line no-console
    return null;
  }
}

function getValidFiles(files) {
  return [].concat.apply([], files).filter(file => !!file);
}

export default function createGenerator(config) {

  if (config.gulp) {
    const {buildCommand, gulp, watchCommand} = config

    gulp.task(buildCommand, () => {
      console.log('Rebuilding component library'); // eslint-disable-line no-console
      generate();
    })

    gulp.task(watchCommand, () => {
      const watchPaths = config.paths.map(file => (
        path.join(config.baseDir, file, '**/*.js')
      ));

      console.log('Watching component library in and automatically rebuilding on paths:') // eslint-disable-line no-console
      console.log(watchPaths.join('\n')); // eslint-disable-line no-console
      gulp.watch(watchPaths, [buildCommand]);
    })
  }

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

    fs.writeFileSync(
      path.join(config.baseDir, 'componentsIndex.js'),
      nunjuckEnv.render('componentsIndex.nunjucks', {components: components.concat(packageComponents)})
    );

    return () => {};
  };

  return generate;
}
