# React BlueKit [![CircleCI](https://circleci.com/gh/blueberryapps/react-bluekit/tree/master.svg?style=svg)](https://circleci.com/gh/blueberryapps/react-bluekit/tree/master)

![BlueKit usage](http://bb-share.s3.amazonaws.com/BlueKit_usage.gif)

BlueKit automatically generates a library from your React components with editable props and live preview.

Point BlueKit to folders with your React components and it will generate a library for you. You'll be able to browse through the components, tweak their props, and see the changes live. Furthermore, any changes that you make to your components' code will be reflected in the library.

DEMO here: [http://bluekit.blueberry.io](http://bluekit.blueberry.io)

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
  paths: ['./components/', './auth'],
  // set to true when providing simple components such as `export default function MyComponent() { <div>Hello</div> }`
  noSpecialReplacements: true,
  // set to true for creating componentsIndex.ts instead of componentsIndex.js
  typescript: false
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

        // display inline (not full page)
        inline

        // this name is used for bluekit local storage as namespace
        // it is optional
        name="MyProjectName"
      />
    );
  }
}
```
You can also pass `children` to BlueKit, which will be displayed above the search field (e.g. for themes or other stuff).

To add jsdoc **descriptions** see example [example_components/Checkbox.react.js](https://github.com/blueberryapps/react-bluekit/blob/master/example_components/Checkbox.react.js).

## Typescript support

Bluekit automatically finds `.tsx` files and uses [react-docgen-typescript](https://github.com/pvasek/react-docgen-typescript) parser for it.

It is optional dependency so you need to install it manually by:

```
npm install react-docgen-typescript
# or
yarn add react-docgen-typescript
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

## Gulp tasks
```
# generate svg icons from src/icons directory
gulp svg-icon

# run unit tests
gulp ava

# run eslint
gulp eslint
```

## Additional info

BlueKit automatically hides props that don’t affect the component’s look.

If you get some kind of weird error and BlueKit doesn't load at all, try to reset localStorage by running `localStorage.clear();`. We are working on automatic checks of localStorage values.

## License

MIT © [Ondrej Bartas](https://github.com/ondrejbartas)
