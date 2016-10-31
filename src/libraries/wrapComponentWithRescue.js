import ErrorContainer from '../app/atoms/Error.react';
import React from 'react';

const wrapWithTryCatch = (component, method) => {
  const unsafe = component[method];

  component[method] = function lifecycleWithRescue() {
    try {
      return unsafe.apply(this, arguments);
    }
    catch (err) {
      const errorReport = {
        component: component.constructor.name,
        method: method,
        props: this.props,
        error: err
      };
      if (arguments.length > 0) {
        errorReport.arguments = arguments;
      }
      if (method === 'render') {
        return (<ErrorContainer error={err} />);
      }
    }
  };
};

export default function wrapReactLifecycleMethodsWithTryCatch(ComponentConstructor) {
  [
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
  ].forEach(method =>
    ComponentConstructor.prototype[method] &&
      wrapWithTryCatch(ComponentConstructor.prototype, method)
  );

  return ComponentConstructor;
};
