'use client';
import renderLeaf from '@/components/Editor/RenderLeaf';
import { RenderElements } from '@/components/Editor/RenderElement';
import editorUtiliy from '@/lib/editorUtility';
import { Editor } from 'slate';

export default function useEditorConfig(editor: Editor) {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return ['image'].includes(element.type) || isVoid(element);
  };
  return { renderLeaf, RenderElements, editorUtiliy };
}
