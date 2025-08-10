"use client";
import { ModalHeader } from "./ModalHeader";
import { FormContent } from "./FormContent";
import { getDefaultValues } from "@/util/forms";
import { cn } from "@/util";
import { useFormState } from "@/hooks/useFormState";
import { FormModalProps } from "@/types/forms";
import { useFieldVisibility } from "@/hooks/useFieldVisibility";
import useIsLeaving from "@/hooks/useIsLeaving";
import LeaveConfirmationModal from "../UI/form/LeaveConfirmationModal";
import Dialog from "../UI/dialog";

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  onDelete,
  onChange,
  maxWidth = "lg",
  enableResetButton,
  fields = [],
  title,
  description,
  initialValues = {},
  children,
  loading,
  deleteLoading,
  error,
  submitButtonText,
  deleteButtonText,
  cancelButtonText,
  removeField,
  mode,
  dialog,
  resetAfterSubmit,
}) => {
  const defaultValues = getDefaultValues(fields, initialValues);
  const {
    hiddenFields,
    handleCheckboxChange,
    reset: resetFieldVisibility,
  } = useFieldVisibility(fields, initialValues, open);

  const formMethods = useFormState(open, fields, initialValues, mode);
  const {
    reset,
    setValue,
    formState: { isDirty },
  } = formMethods;

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: open && isDirty,
  });

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const defaultValue = field.type === "checkbox" ? false : "";
        setValue(String(name), defaultValue, { shouldDirty: true });
      }
    });
  };

  const handleClose = () =>
    isDirty ? setLeavingManually(true) : handleCancel();
  const handleReset = () => {
    reset(defaultValues);
    resetFieldVisibility();
  };
  const handleCancel = () => {
    handleReset();
    onClose?.();
  };

  const Modal = dialog ? dialog : Dialog;
  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
          handleCancel();
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <Modal open={open} onClose={handleClose} maxWidth={maxWidth}>
        {onClose && (
          <ModalHeader
            title={title}
            description={description}
            error={error}
            handleCancel={handleCancel}
          />
        )}
        <div
          className={cn(
            "m-0 h-full p-0",
            dialog ? "max-h-[calc(100dvh-300px)]" : "max-h-[calc(100dvh-200px)]"
          )}
        >
          <FormContent
            fields={fields}
            onSubmit={onSubmit}
            resetAfterSubmit={resetAfterSubmit}
            error={error}
            formMethods={formMethods}
            hiddenFields={hiddenFields}
            onCheckboxChange={handleCheckboxChange}
            loading={loading}
            deleteLoading={deleteLoading}
            onDelete={onDelete}
            resetValues={resetValues}
            onCancel={handleCancel}
            onChange={onChange}
            submitButtonText={submitButtonText}
            deleteButtonText={deleteButtonText}
            cancelButtonText={cancelButtonText}
            enableResetButton={enableResetButton}
            removeField={removeField}
            onReset={handleReset}
            dialog={!!dialog}
          >
            {children}
          </FormContent>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
