import AtomPreview from '../app/atoms/AtomPreview.react';
import React from 'react';
import RPT from 'prop-types';
import ReactDOM from 'react-dom/server';

const variantChecksum = ({atom, variantProps, context}) => {
  const Context = contextCreator(context);
  const html = ReactDOM.renderToStaticMarkup(
    <Context context={context}>
      <AtomPreview atom={atom} variantProps={variantProps} />
    </Context>
  )
  const pureHtml = html.replace(/<([a-zA-Z]+)\s?([^>])+>/ig, '<$1>');
  const style = (html.match(/style="[^"]+"/ig) || []).toString();
  const classes = (html.match(/class="[^"]+"/ig) || []).toString();
  return JSON.stringify([pureHtml, style, classes]);
}

const contextCreator = (context) => class ContextProvider extends React.Component {
  static childContextTypes = Object.keys(context).reduce((out, key)=> ({...out, [key]: RPT.any}), {});

  static propTypes = {
    children: RPT.node
  }

  getChildContext() {
    return context;
  }

  render() {
    return this.props.children;
  }
}

export default variantChecksum;
