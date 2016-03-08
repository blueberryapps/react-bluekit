import React from 'react';
import {render} from 'react-dom';
import App from './App';

try {
  render(<App />, document.getElementById('root'));
}
catch (e) {
  React.render(<App />, document.getElementById('root'));
}
