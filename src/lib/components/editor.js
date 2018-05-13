import React from 'react';
import PropTypes from 'prop-types';

const Editor = (props) => {
  const onEditorSubmit = (e) => {
    if (props.multilineEditor && e.shiftKey && e.key === 'Enter') {
      props.activateDisplayMode();
    } else if (!props.multilineEditor && e.key === 'Enter') {
      props.activateDisplayMode();
    }
  };

  const onEditorBlur = (e) => props.activateDisplayMode();

  const editorProps = {
    onBlur: onEditorBlur,
    onKeyPress: onEditorSubmit,
    onChange: (e) => props.onValueChanged(e.target.value),
    onFocus: (e) => e.target.select(),
    autoFocus: true
  };

  return (
    <props.editingElement {...editorProps} value={props.value} />
  );
}

Editor.propTypes = {
  activateDisplayMode: PropTypes.func.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  editingElement: PropTypes.string,
  value: PropTypes.string
};

export default Editor;
