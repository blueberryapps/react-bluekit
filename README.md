# React BlueKit

## Install

```sh
$ npm install --save react-bluekit
```

## Usage in gulpfile to configure BlueKit

```js
import {createBlueKit} from 'react-bluekit'

createBlueKit({
  // your directory where components are located
  baseDir: `${__dirname}/src/browser`,
  // relative paths from base dir where to look for components
  paths: ['./components/', './auth']
})
```

you can setup build of BlueKit on application start and then watch components for changes by editing default task to:
```js
// from gulp.task('default', ['server']); to:
gulp.task('default', ['build-bluekit', 'server', 'watch-bluekit']);
```

do not forget to add it to build process (for example on stage or production)
```js
gulp.task('build', ['build-bluekit', 'build-webpack']);
// make sure that component build is before webpack
```
it will be build when needed

## Add it to your project

look at example directory
and you need to add only:

```js
// createRoutes.js
import {createBlueKitRoutes} from 'react-bluekit';

export default function createRoutes(getState) {
  return (
    <Route component={App} path="/"> // example
      {createBlueKitRoutes('/bluekit')} // actual code to insert
    </Route>
  )
}
```

What it exactly does:
- it takes previous props
- merge to them your own defined functions or values
- this is returned to props in component library

you can use `library.setValue(propName, newValue)` which take two arguments:
- propName: name of the prop where you need to change value
- newValue: exact value which will be set to props

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
