import editorUtiliy from '@/lib/editorUtility';
import isUrl from 'is-url';
import { Editor, Element, Range, Transforms } from 'slate';

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor: Editor, url: string, urlText: string) => {
  const { selection } = editor;
  const isLinkActive = editorUtiliy.isLinkNodeatSelection(editor, selection);
  if (isLinkActive) {
    unwrapLink(editor);
  }
  const isCollapsed = selection && Range.isCollapsed(selection);
  const linkElement = editorUtiliy.linkElement(url, urlText);

  if (isCollapsed) {
    Transforms.insertNodes(editor, linkElement);
  } else {
    Transforms.wrapNodes(editor, linkElement, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const withLink = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text, 'click here');
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    if (data && isUrl(text)) {
      wrapLink(editor, text, 'click here');
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default withLink;
