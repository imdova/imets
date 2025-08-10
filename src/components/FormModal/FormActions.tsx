import React, { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DynamicButton from "../UI/Buttons/DynamicButton";

interface FormActionsProps {
  onCancel: () => void;
  onDelete?: () => void;
  loading?: boolean;
  deleteLoading?: boolean;
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  enableResetButton?: boolean;
  onReset?: () => void;
  isDirty?: boolean;
  isValid?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onDelete,
  loading,
  deleteLoading,
  submitButtonText = "Save",
  deleteButtonText = "Delete",
  cancelButtonText = "Cancel",
  enableResetButton = false,
  onReset,
  isDirty,
  isValid,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onDeleteOpen = () => setOpenDialog(true);
  const onDeleteCancel = () => setOpenDialog(false);
  return (
    <>
      <div className="border-t border-gray-200 p-2 pt-4">
        <div className="flex w-full justify-between">
          {onDelete && (
            <DynamicButton
              onClick={onDeleteOpen}
              variant="primary"
              label={deleteButtonText}
            />
          )}
          <div className="flex flex-1 justify-end gap-2">
            {!enableResetButton && (
              <DynamicButton
                onClick={onCancel}
                variant="primary"
                label={cancelButtonText}
              />
            )}
            {enableResetButton && isDirty && (
              <DynamicButton
                onClick={onReset}
                variant="outline"
                label="Reset"
              />
            )}
            <DynamicButton
              disabled={enableResetButton && (!isValid || !isDirty)}
              type="submit"
              label={String(loading ? "Loading..." : submitButtonText)}
              variant="primary"
            />
          </div>
        </div>
      </div>
      {onDelete && (
        <DeleteConfirmationDialog
          open={openDialog}
          title="Confirm Deletion"
          loading={deleteLoading}
          message={`Are you sure you want to ${deleteButtonText}? This action cannot be undone.`}
          onDelete={onDelete}
          onClose={onDeleteCancel}
        />
      )}
    </>
  );
};
