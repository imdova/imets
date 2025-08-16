import { useState, useEffect } from "react";
import { DefaultValues, useForm, FieldValues, Path } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  variant = "drawer", // Default to drawer
  minHight = 300,
}: FormDrawerProps<T> & { variant?: "drawer" | "modal" }) {
  const form = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });
  const [groupOpenStates, setGroupOpenStates] = useState<boolean[]>([]);

  useEffect(() => {
    if (initialValues) {
      (Object.keys(initialValues) as Array<Path<T>>).forEach((key) => {
        form.setValue(key, initialValues[key]);
      });
    }
    setGroupOpenStates(groups.map((group) => group.defaultOpen ?? false));
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
                <h3 className="p-2 text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>

                <form
                  className={`relative flex flex-col justify-between`}
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <div
                    style={{ minHeight: minHight }}
                    className={`no-scrollbar relative mt-6 space-y-4 overflow-y-auto pb-16 ${
                      variant === "drawer" ? "max-h-[650px]" : "max-h-[600px]"
                    }`}
                  >
                    {groups.map((group, groupIndex) => (
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

                  <div className="absolute bottom-0 left-0 z-10 mt-8 flex w-full justify-end space-x-3 bg-white p-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      {cancelText}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-md border border-transparent bg-main px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
                    >
                      {loading ? "Processing..." : submitText}
                    </button>
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
