import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ElegantEditor from './index';
import Display from './components/display';
import Editor from './components/editor';

// Enzyme configuration
configure({ adapter: new Adapter() });

const value = "Hello, World!";

describe('<ElegantEditor />', () => {
  it('renders <Display> with correct value', () => {
    const wrapper = shallow(<ElegantEditor value={value} />);
    const display = wrapper.find(Display);

    expect(display).toHaveLength(1);
    expect(display.html()).toEqual(`<p>${value}</p>`);
  });

  it('renders editor if isEditing={true}', () => {
    const wrapper = shallow(<ElegantEditor value={value} isEditing={true} />);
    const editor = wrapper.find(Editor);

    expect(editor).toHaveLength(1);
    expect(editor.html()).toEqual(`<input autofocus="" value="${value}"/>`);
  });

  it('displays an editor on double-click', () => {
    const elegantEditor = mount(<ElegantEditor value={value} />);

    expect(elegantEditor.text()).toEqual(value);
    elegantEditor.simulate('doubleClick');
    expect(elegantEditor.html()).toEqual(`<input value="${value}">`);
  });

  it('displays an editor on single-click if singleClickToEdit={true}', () => {
    const elegantEditor = mount(
      <ElegantEditor value={value} singleClickToEdit={true} />
    );

    expect(elegantEditor.text()).toEqual(value);
    elegantEditor.simulate('click');
    expect(elegantEditor.html()).toEqual(`<input value="${value}">`);
  });

  it('editor submits edits with <Enter>', () => {
    const elegantEditor = mount(
      <ElegantEditor value={value} isEditing={true} />
    );

    expect(elegantEditor.html()).toEqual(`<input value="${value}">`);
    elegantEditor.find('input').simulate('change', { target: { value: 'test' } });
    elegantEditor.find('input').simulate('keyPress', { key: 'Enter' });
    expect(elegantEditor.text()).toEqual('test');
  });

  it('multiline editor submits edits with <Shift> + <Enter>', () => {
    const elegantEditor = mount(
      <ElegantEditor
        value={value}
        isEditing={true}
        editingElement="textarea" />
    );
    const textArea = elegantEditor.find('textarea');

    expect(elegantEditor.html()).toEqual(`<textarea>${value}</textarea>`);
    textArea.simulate('change', { target: { value: 'test\nline2' } });

    // Sending just 'Enter' should do nothing
    textArea.simulate('keyPress', { key: 'Enter' })
    expect(elegantEditor.html()).toEqual(`<textarea>test\nline2</textarea>`);

    // Close editing with Shift + Enter
    textArea.simulate('keyPress', { shiftKey: true, key: 'Enter' });
    expect(elegantEditor.text()).toEqual('test\nline2');
  });

  it('multiline display keeps whitespace', () => {
    const elegantEditor = mount(
      <ElegantEditor
        value={value}
        editingElement="textarea" />
    );

    expect(elegantEditor.html()).toContain('style="white-space: pre;"');
  });

  it('executes a callback on entering/leaving edit mode', () => {
    var isCurrentlyEditMode = false;
    const elegantEditor = mount(
      <ElegantEditor
        value={value}
        onEditingChange={isEditMode => isCurrentlyEditMode = isEditMode} />
    );

    elegantEditor.simulate('doubleClick');
    expect(isCurrentlyEditMode).toEqual(true);
    elegantEditor.find('input').simulate('keyPress', { key: 'Enter' })
    expect(isCurrentlyEditMode).toEqual(false);
  });
});