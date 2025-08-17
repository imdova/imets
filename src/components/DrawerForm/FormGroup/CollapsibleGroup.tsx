import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";

interface CollapsibleGroupProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  icon?: LucideIcon;
  onToggle: () => void;
}

export const CollapsibleGroup = ({
  title,
  children,
  isOpen,
  onToggle,
  icon: Icon,
}: CollapsibleGroupProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-white">
              {Icon && <Icon className="h-4 w-4" />}
            </div>
          )}
          <span>{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
