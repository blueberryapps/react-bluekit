import Component from './Component';
import createLibrary from './createLibrary';
import React from 'react';
import {Route} from 'react-router';

export default function createRoutes(mountPoint) {
  return (
    <Route component={createLibrary(mountPoint)} path={mountPoint}>
      <Route component={Component} path=":atom" />
    </Route>
  )
}
