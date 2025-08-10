import React from "react";
import { FormActions } from "./FormActions";
import { cn } from "@/util";
import { FormGrid } from "./FormGrid";
import { FormContentProps } from "@/types/forms";

export const FormContent = React.forwardRef<HTMLFormElement, FormContentProps>(
  (
    {
      fields,
      onSubmit,
      formMethods,
      hiddenFields,
      onCheckboxChange,
      children,
      loading = false,
      deleteLoading = false,
      resetValues,
      onDelete,
      onCancel,
      submitButtonText = "Save",
      deleteButtonText = "Delete",
      cancelButtonText = "Cancel",
      removeField,
      onChange,
      dialog = false,
      onReset,
      enableResetButton = false,
      resetAfterSubmit,
    },
    ref
  ) => {
    const {
      control,
      handleSubmit,
      formState: { isDirty, isValid, isSubmitting },
      getValues,
      reset,
    } = formMethods;

    const submitHandler = async (data: unknown) => {
      if (!isDirty) {
        onCancel?.();
        return;
      }

      try {
        const result = await onSubmit?.(data);

        if (result?.error) return;

        // Handle post-submit reset logic
        if (resetAfterSubmit === "new") {
          reset(data);
        } else if (resetAfterSubmit === "default") {
          onReset?.();
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    };

    const handleDelete = () => {
      if (!onDelete) return;
      const data = getValues();
      onDelete(data);
    };

    return (
      <form
        onSubmit={handleSubmit(submitHandler)}
        ref={ref}
        className="h-full flex flex-col"
      >
        <div
          className={cn(
            "scroll-bar-minimal overflow-y-auto bg-background flex-grow",
            dialog ? "max-h-[calc(100dvh-354px)]" : "max-h-[calc(100dvh-254px)]"
          )}
        >
          <FormGrid
            fields={fields}
            control={control}
            hiddenFields={hiddenFields}
            onCheckboxChange={onCheckboxChange}
            onChange={onChange}
            removeField={removeField}
            getValues={getValues}
            resetValues={resetValues}
            dialog={dialog}
          />
          {children}
        </div>

        {(onSubmit || onDelete) && (
          <FormActions
            onDelete={onDelete ? handleDelete : undefined}
            onCancel={onCancel}
            isDirty={isDirty}
            onReset={onReset}
            isValid={isValid}
            loading={loading || isSubmitting}
            enableResetButton={enableResetButton}
            deleteLoading={deleteLoading}
            submitButtonText={submitButtonText}
            deleteButtonText={deleteButtonText}
            cancelButtonText={cancelButtonText}
          />
        )}
      </form>
    );
  }
);

FormContent.displayName = "FormContent";
