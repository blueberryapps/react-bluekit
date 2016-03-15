import Radium, {Style} from 'radium';
import React, {Component} from 'react';

@Radium
export default class HighlightStyle extends Component {
  render() {
    return (
      <Style rules={{
        '.hljs': {
          display:' block',
          background: 'white',
          padding: '0.5em',
          color: '#333333',
          overflowX: 'auto',
        },

        '.hljs-comment, .hljs-meta': {
          color: '#969896',
        },

        '.hljs-string, .hljs-variable, .hljs-template-variable, .hljs-strong, .hljs-emphasis, .hljs-quote': {
          color: '#df5000',
        },

        '.hljs-keyword, .hljs-selector-tag, .hljs-type': {
          color: '#a71d5d',
        },

        '.hljs-literal, .hljs-symbol, .hljs-bullet, .hljs-attribute': {
          color: '#0086b3',
        },

        '.hljs-section, .hljs-name': {
          color: '#63a35c',
        },

        '.hljs-tag': {
          color: '#333333',
        },

        '.hljs-title, .hljs-attr, .hljs-selector-id, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo': {
          color: '#795da3',
        },

        '.hljs-addition': {
          color: '#55a532',
          backgroundColor: '#eaffea',
        },

        '.hljs-deletion': {
          color: '#bd2c00',
          backgroundColor: '#ffecec',
        },

        '.hljs-link': {
          textDecoration: 'underline',
        },

        '.javascript': {
          border: '1px solid #b3e3ff',
          margin: 0,
          padding: '10px 20px',
          fontSize: '14px',
        }
      }}/>
    )
  }
}
