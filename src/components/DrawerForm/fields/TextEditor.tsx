import { useState, useEffect } from "react";

interface RichTextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextField = ({ value, onChange }: RichTextFieldProps) => {
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="rounded-md border border-gray-300">
      <div className="flex border-b border-gray-300 p-1">
        <button
          type="button"
          className="p-1 hover:bg-gray-100"
          onClick={() => document.execCommand("bold", false, "")}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-100"
          onClick={() => document.execCommand("italic", false, "")}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-100"
          onClick={() => document.execCommand("underline", false, "")}
        >
          <u>U</u>
        </button>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="h-40 w-full p-2 focus:outline-none"
      />
    </div>
  );
};
