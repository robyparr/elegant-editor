import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.onEditorSubmit = this.onEditorSubmit.bind(this);
    this.onEditorBlur = this.onEditorBlur.bind(this);
  }

  onEditorSubmit(e) {
    if (this.props.multilineEditor && e.shiftKey && e.key === 'Enter') {
      this.props.activateDisplayMode();
    } else if (!this.props.multilineEditor && e.key === 'Enter') {
      this.props.activateDisplayMode();
    } else {
      return;
    }
  }

  onEditorBlur(e) {
    this.props.activateDisplayMode();
  }

  render() {
    const props = {
      onBlur: this.onEditorBlur,
      onKeyPress: this.onEditorSubmit,
      onChange: (e) => this.props.onValueChanged(e.target.value),
      onFocus: (e) => e.target.select(),
      autoFocus: true
    };

    if (this.props.editingElement === "input") {
      return (
        <this.props.editingElement
          {...props}
          value={this.props.value} />
      );
    }

    return (
      <this.props.editingElement {...props} value={this.props.value}>
        {this.props.value}
      </this.props.editingElement>
    );
  }
}

Editor.propTypes = {
  activateDisplayMode: PropTypes.func.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  editingElement: PropTypes.string,
  value: PropTypes.string
};

export default Editor;
