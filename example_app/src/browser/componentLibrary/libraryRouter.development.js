import Library from './Page.react';
import React from 'react';
import LibraryComponent from '../../../lib/components/Component'; // eslint-disable-line
import {Route} from 'react-router';

export default function libraryRouter() {
  return (
    <Route component={Library} path="component-library">
      <Route component={LibraryComponent} path=":atom" />
    </Route>
  );
}
