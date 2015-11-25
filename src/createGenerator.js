import fs from 'fs';
import path from 'path';
import toSource from 'tosource';
import {parse as docgenParse} from 'react-docgen';
import nunjucks from 'nunjucks';

const nunjuckEnv = nunjucks.configure(`${__dirname}/../nunjucks/`, {autoescape: false});

function getAllFilesInDir(dir, relativeDirectory = []) {
  const resolvedDir = path.join(dir, relativeDirectory);

  return [].concat.apply([], fs.readdirSync(resolvedDir).map(file => {
    const absolutePath = path.join(dir, relativeDirectory, file);

    if (fs.lstatSync(absolutePath).isDirectory()) {
      return getAllFilesInDir(dir, path.join(relativeDirectory, file));
    }
    return path.join(`./${relativeDirectory}`, file);
  }));
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
    const flattendFiles = [].concat.apply([], files);
    const components = flattendFiles.map(file => {
      const filePath = path.join(config.baseDir, file);
      const content = fs.readFileSync(filePath).toString();

      try {
        const docgen = docgenParse(content);
        const doc = {
          ...docgen,
          props: toSource(docgen.props || {}, null, 0)
        }
        const name = file
          .replace(/\.\.\//g, '')
          .replace('.react', '')
          .replace('.js', '')
          .replace(/(?:^|[-_/])(\w)/g, (_, c) => c ? c.toUpperCase() : '')
          .replace(/\//g, '');

        const importFile = file[0] === '.' ? file : `./${file}`

        return {
          file: importFile,
          name,
          ...doc,
        };
      }
      catch (error) {
        console.log(`Skipping ${file} because it is not containing valid react component`); // eslint-disable-line no-console
        return null;
      }
    }).filter(component => component !== null);

    fs.writeFileSync(
      path.join(config.baseDir, 'componentsIndex.js'),
      nunjuckEnv.render('componentsIndex.nunjucks', {components})
    );

    return () => {};
  };

  return generate;
}
