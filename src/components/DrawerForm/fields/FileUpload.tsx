import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { FileFormField } from "../types";
import Image from "next/image";
import { UseFormReturn, FieldValues, Path, FieldError } from "react-hook-form";

interface FileUploadFieldProps<T extends FieldValues> {
  field: FileFormField<string>;
  form: UseFormReturn<T>;
  value: File[] | null;
  onChange: (files: File[] | null) => void;
}

export const FileUploadField = <T extends FieldValues>({
  field,
  form,
  value,
  onChange,
}: FileUploadFieldProps<T>) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (
      field.maxSize &&
      newFiles.some((file) => file.size > field.maxSize! * 1024)
    ) {
      form.setError(field.name as Path<T>, {
        type: "manual",
        message: `File size must be less than ${field.maxSize}KB`,
      });
      return;
    }

    onChange([...(value || []), ...newFiles]);

    // Generate previews for images
    const imagePreviews = newFiles
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...imagePreviews]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...(value || [])];
    newFiles.splice(index, 1);
    onChange(newFiles.length ? newFiles : null);

    if (index < previews.length) {
      const newPreviews = [...previews];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
    }
  };

  const error = form.formState.errors[field.name] as FieldError | undefined;

  return (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed p-4 transition-colors hover:bg-gray-50">
        <div className="text-center">
          <Upload className="mx-auto h-6 w-6 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {field.accept || "Any file type"}{" "}
            {field.maxSize && `(Max ${field.maxSize}KB)`}
          </p>
          <input
            type="file"
            className="hidden"
            accept={field.accept}
            multiple={field.multiple}
            onChange={handleFileChange}
          />
        </div>
      </label>

      {(value?.length || 0) > 0 && (
        <div className="mt-2 space-y-2">
          {value?.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-50 p-2"
            >
              <div className="flex items-center space-x-2 truncate">
                {previews[index] ? (
                  <Image
                    width={100}
                    height={100}
                    src={previews[index]}
                    alt="Preview"
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
                    <span className="text-xs">File</span>
                  </div>
                )}
                <span className="truncate text-sm">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)}KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};
