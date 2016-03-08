import Component from './Component';
import Library from './Page.react';
import React from 'react';
import {Route} from 'react-router';

export default function createRoutes() {
  return (
    <Route component={Library} path="/">
      <Route component={Component} path=":atom" />
    </Route>
  )
}
