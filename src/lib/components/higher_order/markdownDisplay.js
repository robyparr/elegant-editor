import React from 'react';
import marked from 'marked';

const MarkdownRenderer = (props) => {
  marked.setOptions({ sanitize: true });

  // Filter out 'children' from the props both
  // because it's not needed and because React dissallows
  // setting both children and dangerouslySetInnerHTML.
  // https://stackoverflow.com/a/38750895
  const childlessProps = Object.keys(props)
    .filter(key => key != 'children')
    .reduce((newProps, key) => {
      newProps[key] = props[key]
      return newProps;
    }, {});

  return (
    <div
      dangerouslySetInnerHTML={{__html: marked(props.children)}}
      {...childlessProps} />
  );
};

const markdownDisplay = (WrappedComponent) => {
  return (props) => {
    return (
      <WrappedComponent
        {...props}
        displayElement={MarkdownRenderer} />
    );
  };
};

export default markdownDisplay;