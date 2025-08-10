"use client";

import { EditorContent, type Editor } from "@tiptap/react";

interface EditorContentProps {
  editor: Editor;
}

export function EditorContentWrapper({ editor }: EditorContentProps) {
  return (
    <EditorContent
      editor={editor}
      placeholder="<p>Start writing...<p/>"
      className="prose prose-sm focus:outline-none  [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-[200px] px-2"
    />
  );
}
