"use Client";

import { X } from "lucide-react";
import IconButton from "./Buttons/IconButton";

const ItemTag: React.FC<{
  item?: string;
  label: React.ReactNode;
  onRemove?: (item: string) => void;
}> = ({ item, label, onRemove }) => (
  <div className="rounded-base bg-primary-100 flex items-center space-x-2 border py-1 pl-2 pr-1 text-main duration-100">
    {typeof label === "string" ? (
      <span className="text-xs">{label}</span>
    ) : (
      label
    )}
    {onRemove && item && (
      <IconButton
        className="block w-fit p-1 hover:bg-red-100 hover:text-red-500"
        onClick={() => onRemove(item)}
        Icon={X}
      />
    )}
  </div>
);

export default ItemTag;
