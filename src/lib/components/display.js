import React from 'react';
import PropTypes from 'prop-types';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const clickEvent = this.props.singleClickToEdit ? 'onClick' : 'onDoubleClick';
    const props = {
      [clickEvent]: this.props.activateEditMode
    };

    const styles = {};

    if (this.props.multilineEditor) {
      styles['whiteSpace'] = 'pre';
    }


    return (
      <this.props.displayElement {...props} style={styles}>
        {this.props.value}
      </this.props.displayElement>
    );
  }
}

Display.propTypes = {
  displayElement: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  activateEditMode: PropTypes.func.isRequired,
  singleClickToEdit: PropTypes.bool
};

export default Display;
