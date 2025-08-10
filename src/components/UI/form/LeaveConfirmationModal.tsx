import React from "react";
import Dialog from "../dialog";
import { ButtonColor } from "@/types/forms";
import DynamicButton from "../Buttons/DynamicButton";

type ButtonVariant = "text" | "outlined" | "contained";

interface ButtonConfig {
  text: string;
  onClick: () => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  autoFocus?: boolean;
}

interface LeaveConfirmationModalProps {
  isOpen: boolean;
  onLeave: () => void;
  onStay: () => void;
  title?: string;
  description?: string;
  hideDefaultButtons?: boolean;
  additionalButtons?: ButtonConfig[];
  defaultButtonColors?: {
    leave?: string;
    stay?: string;
  };
}

const LeaveConfirmationModal: React.FC<LeaveConfirmationModalProps> = ({
  isOpen,
  onLeave,
  onStay,
  title = "Are you sure you want to leave?",
  description = "You have unsaved changes. Are you sure you want to leave without saving?",
  hideDefaultButtons = false,
  additionalButtons = [],
}) => {
  const defaultButtons: ButtonConfig[] = !hideDefaultButtons
    ? [
        {
          text: "Stay",
          onClick: onStay,
          color: "success",
          variant: "outlined",
        },
        {
          text: "Leave",
          onClick: onLeave,
          color: "danger",
          variant: "contained",
          autoFocus: true,
        },
      ]
    : [];

  const allButtons: ButtonConfig[] = [...defaultButtons, ...additionalButtons];

  return (
    <Dialog
      open={isOpen}
      onClose={onStay}
      aria-labelledby="leave-dialog-title"
      aria-describedby="leave-dialog-description"
      maxWidth="xs"
    >
      <div className="p-2 text-xl" id="leave-dialog-title">
        {title}
      </div>
      <div>
        <div id="leave-dialog-description">{description}</div>
      </div>
      <div className="flex gap-2">
        {allButtons.map((button, index) => (
          <DynamicButton
            key={index}
            onClick={button.onClick}
            variant="primary"
            label={button.text}
          />
        ))}
      </div>
    </Dialog>
  );
};

export default LeaveConfirmationModal;
