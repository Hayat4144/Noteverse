'use client';
import React, { useState, useCallback } from 'react';
import { Editor, Selection } from 'slate';
import deepEqual from 'deep-equal';

export default function useSelection(editor: Editor) {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection: Selection) => {
      // don't update the component state if selection hasn't changed.
      if (deepEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection],
  );

  return [selection, setSelectionOptimized];
}
