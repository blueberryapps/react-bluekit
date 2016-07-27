# React BlueKit [![CircleCI](https://circleci.com/gh/blueberryapps/react-bluekit/tree/master.svg?style=svg)](https://circleci.com/gh/blueberryapps/react-bluekit/tree/master)

## Install

```sh
$ npm install --save react-bluekit
```

## Gulpfile configuration

```js
import createBlueKit from 'react-bluekit/lib/createBlueKit';

createBlueKit({
  // your directory where components are located
  baseDir: `${__dirname}/src/browser`,
  // relative paths from base dir where to look for components
  paths: ['./components/', './auth']
});
```

This will provide you with two gulp tasks: `build-bluekit` and `watch-bluekit`, which perform static analysis of your components.

You can setup the build of BlueKit on application start and then watch components for changes by editing the `default` task to:

```js
// from gulp.task('default', ['server']); to:
gulp.task('default', ['build-bluekit', 'server', 'watch-bluekit']);
```

Do not forget to add it to build process (for example on stage or production):
```js
gulp.task('build', ['build-bluekit', 'build-webpack']);
// make sure that component build is before webpack
```
It will be built when needed.

## Add it to your project

Look at the `example` directory, you only need to add:

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

## BlueKit development
```
npm install
cd ./example
npm install
gulp
open http://127.0.0.1:8001
```
This will start the development server and then you can play with components in BlueKit.

This is how you can generate new svg icons from `src/icons` directory:
```
gulp svg-icon
```

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)
