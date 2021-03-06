import React from 'react';
import PropTypes from 'prop-types';

import Editor from './components/editor';
import Display from './components/display';

import autoResizingMultilineEditor from './components/higher_order/autoResizingMultilineEditor';
import markdownDisplay from './components/higher_order/markdownDisplay';

class ElegantEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: props.isEditing || false,
      value: props.value,
      editingElement: props.editingElement || "input",
      displayElement: props.displayElement || "p",
      multilineEditor: this.props.editingElement === 'textarea'
        || this.props.multilineEditor
    };

    this.activateEditMode = this.activateEditMode.bind(this);
    this.activateDisplayMode = this.activateDisplayMode.bind(this);
  }

  /**
   * Handles activation of edit mode.
   * Calls this.props.onEditingChange(true);
   */
  activateEditMode() {
    if (this.state.isEditing) return;

    this.setState({ isEditing: true });

    if (this.props.onEditingChange) {
      this.props.onEditingChange(true);
    }
  }

  /**
   * Handles activation of display mode.
   * Calls this.props.onEditModeChange(false);
   */
  activateDisplayMode() {
    if (!this.state.isEditing) return;

    this.setState({ isEditing: false });

    if (this.props.onEditingChange) {
      this.props.onEditingChange(false);
    }

    if (this.props.onChange != null && this.state.value != this.props.value) {
      this.props.onChange(this.props.name, this.state.value);
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <Editor
          className={this.props.editorClassName}
          activateDisplayMode={this.activateDisplayMode}
          multilineEditor={this.state.multilineEditor}
          onValueChanged={newValue => this.setState({ value: newValue })}
          editingElement={this.state.editingElement}
          value={this.state.value} />
      );
    }

    return (
      <Display
        className={this.props.displayClassName}
        activateEditMode={this.activateEditMode}
        displayElement={this.state.displayElement}
        multilineEditor={this.state.multilineEditor}
        singleClickToEdit={this.props.singleClickToEdit}
        value={this.state.value} />
    )
  }
}

ElegantEditor.propTypes = {
  value: PropTypes.string.isRequired,
  displayElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string
  ]),
  editingElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string
  ]),
  isEditing: PropTypes.bool,
  onChange: PropTypes.func,
  onEditingChange: PropTypes.func,
  singleClickToEdit: PropTypes.bool,
  multilineEditor: PropTypes.bool,
  displayClassName: PropTypes.string,
  editorClassName: PropTypes.string
};

export default ElegantEditor;
export { autoResizingMultilineEditor, markdownDisplay };
