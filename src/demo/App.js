import React from 'react';
import ElegantEditor, { autoResizingMultilineEditor, markdownDisplay } from '../lib';

const DEFAULT_VALUE = "Hello, World!";

const AutoResizingElegantEditor = autoResizingMultilineEditor(ElegantEditor);
const MarkdownDisplayEditor = markdownDisplay(ElegantEditor);
const AutoResizingMarkdownEditor = autoResizingMultilineEditor(MarkdownDisplayEditor);

const App = () => (
  <div>
    <h1>Examples</h1>
    <p>
      Elegant Editor defaults to displaying <code>value</code> in uneditable
      form. You can double-click the display to trigger edit mode, which will
      allow you to edit in-place. The value will be saved and displayed when
      the editor loses focus or enter (shift + enter for multiline) is hit.
    </p>

    <h2>Default Options</h2>
    <ElegantEditor value={DEFAULT_VALUE} />

    <h2>Custom Editor</h2>
    <p>A multiline editor using <code>&lt;textarea /&gt;</code>.</p>

    <ElegantEditor
      value={DEFAULT_VALUE}
      editingElement="textarea" />

    <h2>Custom styling with classes</h2>
    <ElegantEditor
      value={DEFAULT_VALUE}
      displayClassName="red-text" />

    <ElegantEditor
      value={DEFAULT_VALUE}
      isEditing={true}
      editorClassName="red-text" />

    <h2>Auto-resizing multiline editor</h2>
    <AutoResizingElegantEditor value={DEFAULT_VALUE} />

    <h2>Markdown Display</h2>
    <MarkdownDisplayEditor value="This is a **markdown display** component." />

    <h2>Markdown Display with auto-resizing editor</h2>
    <AutoResizingMarkdownEditor value="This is also a **markdown** component." />
  </div>
);

export default App;
