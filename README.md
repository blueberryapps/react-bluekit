# React Component Library


## Install

```sh
$ npm install --save react-component-library
```

## Usage in gulpfile to generate Components Index

```js
import createComponentLibraryGenerator from 'react-component-library/lib/createGenerator'

createComponentLibraryGenerator({
  // base file of start - this is location where componentsIndex.js will be generated to
  baseDir: `${__dirname}/src/browser/componentLibrary`,
  // relative paths from base dir where to look for components
  paths: ['../components/', '../auth'],
  // if you want to use gulp tasks pass gulp
  gulp: gulp,
  // specify name for build command -> gulp build-component-library
  buildCommand: 'build-component-library',
  // specify name for watch command -> gulp watch-component-library
  watchCommand: 'watch-component-library',
})
```

you can setup components index on application start and then watch components for changes by editing default task to:
```js
// from gulp.task('default', ['server']); to:
gulp.task('default', ['build-component-library', 'server', 'watch-component-library']);
```

if you don't want componentIndex to be in your git
then add `componentsIndex.js` to `.gitignore`
and add build command to build task
```js
gulp.task('build', ['build-component-library', 'build-webpack']);
// make sure that component build is before webpack
```
it will be build when needed

## Add it to your project

look at example directory
and you need to add only:

```js
// createRoutes.js
import libraryRouter from './componentLibrary/libraryRouter'; // eslint-disable-line import/default

export default function createRoutes(getState) {
  return (
    <Route component={App} path="/"> // example
      {libraryRouter()} // actual code to insert
    </Route>
  )
}
```

## Development of Component library
```
npm install
cd ./example_app
npm install
gulp
```
this will start development server and then you can play with Library components

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)
