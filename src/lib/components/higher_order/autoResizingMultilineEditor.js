import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const autoResizingMultilineEditor = (WrappedComponent) => {
  return (props) => (
    <WrappedComponent
      {...props}
      multilineEditor={true}
      editingElement={TextareaAutosize} />
  );
};

export default autoResizingMultilineEditor;