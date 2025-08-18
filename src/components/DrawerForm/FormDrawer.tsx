import { useState, useEffect } from "react";
import { DefaultValues, useForm, FieldValues, Path } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FormDrawerProps } from "./types";
import { FormGroupRenderer } from "./FormGroup/FormGroup";

export function FormDrawer<T extends FieldValues>({
  isOpen,
  onClose,
  onSubmit,
  groups,
  initialValues,
  title = "Form",
  submitText = "Submit",
  cancelText = "Cancel",
  loading = false,
  variant = "drawer",
  minHight = 300,
  stages = [], // New prop for stages
}: FormDrawerProps<T> & { variant?: "drawer" | "modal"; stages?: string[] }) {
  const form = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });
  const [groupOpenStates, setGroupOpenStates] = useState<boolean[]>([]);
  const [currentStage, setCurrentStage] = useState(0); // Track current stage

  useEffect(() => {
    if (initialValues) {
      (Object.keys(initialValues) as Array<Path<T>>).forEach((key) => {
        form.setValue(key, initialValues[key]);
      });
    }
    setGroupOpenStates(groups.map((group) => group.defaultOpen ?? false));
    setCurrentStage(0); // Reset to first stage when form opens
  }, [initialValues, form, groups]);

  useEffect(() => {
    if (groups.length > 0 && groupOpenStates.length === 0) {
      setGroupOpenStates(groups.map((_, index) => index === 0));
    }
  }, [groups, groupOpenStates.length]);

  const handleSubmit = (data: T) => onSubmit(data);

  const toggleGroup = (index: number) => {
    setGroupOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const nextStage = () => {
    if (currentStage < (stages.length || groups.length) - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  };

  const currentVariants = variant === "drawer" ? drawerVariants : modalVariants;

  // Determine which groups to show based on current stage
  const visibleGroups =
    stages.length > 0
      ? groups.filter((_, index) => index === currentStage)
      : groups;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />

          {/* Container */}
          <div
            className={`flex h-full w-full ${variant === "drawer" ? "justify-end" : "items-center justify-center"}`}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={currentVariants}
              className={`relative bg-white shadow-xl transition-all ${
                variant === "drawer"
                  ? "w-full max-w-2xl"
                  : "w-full max-w-lg rounded-lg"
              }`}
            >
              <div className="absolute right-0 top-0 z-10 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-orange-50 text-orange-600"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="h-full px-2 pb-4 pt-5 sm:p-3 sm:pb-4">
                <div className="flex items-center justify-between p-2 px-7">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </h3>
                  {stages.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        Step {currentStage + 1} of {stages.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stage indicators */}
                {stages.length > 0 && (
                  <div className="mb-4 flex space-x-2 px-2">
                    {stages.map((stage, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentStage(index)}
                        className={`h-1 flex-1 rounded-full ${
                          index <= currentStage ? "bg-main" : "bg-gray-200"
                        }`}
                        aria-label={`Go to ${stage}`}
                      />
                    ))}
                  </div>
                )}

                <form
                  className={`relative flex flex-col justify-between`}
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <div
                    style={{ minHeight: minHight }}
                    className={`no-scrollbar relative space-y-4 overflow-y-auto pb-16 ${
                      variant === "drawer" ? "max-h-[650px]" : "max-h-[600px]"
                    }`}
                  >
                    {visibleGroups.map((group, groupIndex) => (
                      <FormGroupRenderer<T>
                        key={groupIndex}
                        group={group}
                        collapsible={group.collapsible}
                        form={form}
                        isOpen={groupOpenStates[groupIndex] ?? false}
                        onToggle={() => toggleGroup(groupIndex)}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 z-10 mt-8 flex w-full justify-between bg-white p-3">
                    <div>
                      {stages.length > 0 && currentStage > 0 && (
                        <button
                          type="button"
                          onClick={prevStage}
                          className="flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" />
                          Previous
                        </button>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                      >
                        {cancelText}
                      </button>
                      {stages.length > 0 && currentStage < stages.length - 1 ? (
                        <button
                          type="button"
                          onClick={nextStage}
                          className="flex items-center rounded-md border border-transparent bg-main px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
                        >
                          Next
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="rounded-md border border-transparent bg-main px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
                        >
                          {loading ? "Processing..." : submitText}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
