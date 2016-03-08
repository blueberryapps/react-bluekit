import createRoutes from '../components/createRoutes'
import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router'

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        {createRoutes()}
      </Router>
    );
  }
}
