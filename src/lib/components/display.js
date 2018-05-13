import React from 'react';
import PropTypes from 'prop-types';

const Display = (props) => {
  const clickEvent = props.singleClickToEdit ? 'onClick' : 'onDoubleClick';
  const displayProps = { [clickEvent]: props.activateEditMode };

  const styles = {};
  if (props.multilineEditor) {
    styles['whiteSpace'] = 'pre';
  }

  return (
    <props.displayElement {...displayProps} style={styles}>
      {props.value}
    </props.displayElement>
  );
}

Display.propTypes = {
  displayElement: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  activateEditMode: PropTypes.func.isRequired,
  singleClickToEdit: PropTypes.bool
};

export default Display;
