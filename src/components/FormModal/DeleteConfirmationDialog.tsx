import React, { useState } from "react";
import TextField from "./fields/TextField";
import Dialog from "../UI/dialog";
import { ButtonColor } from "@/types/forms";
import DynamicButton from "../UI/Buttons/DynamicButton";

interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  message?: string;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
  color?: ButtonColor;
  buttonText?: string;
  hardDeleteText?: string; // ✅ NEW prop
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  title,
  message,
  onDelete,
  onClose,
  loading,
  color = "danger",
  buttonText = "Yes Delete",
  hardDeleteText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const colors: Record<ButtonColor, string> = {
    success: "text-green-600",
    primary: "text-green-600",
    secondary: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600",
    error: "text-red-600",
  };

  const handleDeleteClick = () => {
    if (hardDeleteText) {
      if (inputValue !== hardDeleteText) {
        setError("Text does not match. Please type it exactly.");
        return;
      }
    }
    onDelete();
  };

  const handleClose = () => {
    setInputValue("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={colors[color]}>{title}</div>
      <div>
        <p className="text-secondary">{message}</p>

        {hardDeleteText && (
          <div className="mt-4">
            <p className="text-sm text-red-500">
              To confirm, type this exactly: <strong>{hardDeleteText}</strong>
            </p>
            <TextField
              className="w-full"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              error={!!error}
              helperText={error}
            />
          </div>
        )}
      </div>
      <div className="">
        <DynamicButton onClick={handleClose} label="No" variant="primary" />
        <DynamicButton
          onClick={handleDeleteClick}
          label={loading ? "loading..." : buttonText}
          variant="primary"
          disabled={loading}
        />
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
