"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import { BlockEditorToolbar, EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { CSSProperties, useEffect } from "react";
import { cn } from "@/util";

interface TextEditorProps {
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  error?: boolean;
  helperText?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const editor = useEditor({
    extensions,
    content: value as string | undefined,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange({
          target: { value: editor.getHTML() },
        } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>);
      }
    },
    // Add this to fix SSR issue
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    // Explicitly disable immediate rendering
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-white shadow-sm",
        error && "border-red-500",
      )}
    >
      <EditorToolbar editor={editor} />
      <EditorContentWrapper editor={editor} />
      {error && <p className="text-red-500">{helperText}</p>}
    </div>
  );
};

export const BlockTextEditor: React.FC<{
  value: string;
  onChange: (e: string) => void;
  isSelected: boolean;
  style: CSSProperties;
}> = ({ value, onChange, style, isSelected }) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // Add this to fix SSR issue
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    // Explicitly disable immediate rendering
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div style={style} className="mt-2 w-full">
      <div className={isSelected ? "block" : "hidden group-hover/block:block"}>
        <BlockEditorToolbar editor={editor} />
      </div>
      <div className="w-full">
        <EditorContent
          editor={editor}
          className="prose prose-sm min-h-0 w-full border-none p-0 outline-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TextEditor;
