"use client";

import type { Editor } from "@tiptap/react";
import { ToolbarButton } from "./toolbar-button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  RotateCcw,
  Underline,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-1 border-b p-2">
      <ToolbarButton
        icon={Bold}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <ToolbarButton
        icon={Underline}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <ToolbarButton
        icon={List}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <ToolbarButton
        icon={AlignLeft}
        label="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={AlignCenter}
        label="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={AlignRight}
        label="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      />
      <div className="flex-1" />
      <ToolbarButton
        icon={RotateCcw}
        label="Clear Formatting"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      />
    </div>
  );
}
export function BlockEditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="absolute top-0 z-10 flex -translate-y-1/2 items-center gap-1">
      <ToolbarButton
        icon={Bold}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <ToolbarButton
        icon={Underline}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <ToolbarButton
        icon={List}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <ToolbarButton
        icon={AlignLeft}
        label="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={AlignCenter}
        label="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={AlignRight}
        label="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      />
      <div className="flex-1" />
      <ToolbarButton
        icon={RotateCcw}
        label="Clear Formatting"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      />
    </div>
  );
}
