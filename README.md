# React BlueKit

## Install

```sh
$ npm install --save react-bluekit
```

## Usage in gulpfile to configure BlueKit

```js
import createBlueKit from 'react-bluekit/lib/createBlueKit';

createBlueKit({
  // your directory where components are located
  baseDir: `${__dirname}/src/browser`,
  // relative paths from base dir where to look for components
  paths: ['./components/', './auth']
});
```

this will provide you with two gulp tasks: `build-bluekit` and `watch-bluekit` which are doing static analysis of your components.

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
import BlueKit from 'react-bluekit';
import componentsIndex from '../componentsIndex';
import React, { Component } from 'react';

export default class PageWithBlueKit extends Component {
  render() {
    return (
      <BlueKit
        componentsIndex={componentsIndex}
        inline // display inline (not full page)
      />
    );
  }
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
cd ./example
npm install
gulp
open http://127.0.0.1:8001
```
this will start development server and then you can play with Library components

Generate new svg icons from `src/icons` directory
```
gulp svg-icon
```

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)
