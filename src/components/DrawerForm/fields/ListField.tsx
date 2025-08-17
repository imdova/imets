import { Plus, Edit, Trash2, Check, X, GripVertical } from "lucide-react";
import { FieldValues, Path, UseFormReturn, PathValue } from "react-hook-form";
import { useState } from "react";
import { TextFormField } from "../types";
import DynamicModal from "@/components/UI/DynamicModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface List {
  id: string;
  name: string;
}

interface ListsFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: TextFormField<Path<T>>;
  label?: string;
}

export const ListsField = <T extends FieldValues>({
  fields: { name },
  form,
}: ListsFieldProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStageName, setNewStageName] = useState("");
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [editStageName, setEditStageName] = useState("");

  const lists: List[] = (form.watch(name) as List[]) ?? [];

  const handleAddStage = () => {
    if (newStageName.trim() === "") return;

    const newStage: List = {
      id: Date.now().toString(),
      name: newStageName.trim(),
    };

    const currentLists = (form.getValues(name) as List[]) || [];
    form.setValue(name, [...currentLists, newStage] as PathValue<T, Path<T>>);
    setNewStageName("");
    setIsModalOpen(false);
  };

  const handleStartEdit = (stage: List) => {
    setEditingStageId(stage.id);
    setEditStageName(stage.name);
  };

  const handleSaveEdit = () => {
    if (!editingStageId || editStageName.trim() === "") return;

    const updatedLists = lists.map((stage) =>
      stage.id === editingStageId
        ? { ...stage, name: editStageName.trim() }
        : stage,
    );

    form.setValue(name, updatedLists as PathValue<T, Path<T>>);
    setEditingStageId(null);
    setEditStageName("");
  };

  const handleCancelEdit = () => {
    setEditingStageId(null);
    setEditStageName("");
  };

  const handleDeleteStage = (id: string) => {
    const updatedLists = lists.filter((stage) => stage.id !== id);
    form.setValue(name, updatedLists as PathValue<T, Path<T>>);
    if (editingStageId === id) {
      setEditingStageId(null);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    form.setValue(name, items as PathValue<T, Path<T>>);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-2 flex items-center gap-1 rounded px-3 py-1 text-sm text-main"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {lists.map((stage, index) => (
                <Draggable key={stage.id} draggableId={stage.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between rounded border-l-4 border-secondary bg-white p-3 shadow-md hover:bg-gray-50"
                    >
                      {editingStageId === stage.id ? (
                        <div className="flex w-full items-center gap-2">
                          <input
                            type="text"
                            value={editStageName}
                            onChange={(e) => setEditStageName(e.target.value)}
                            className="flex-1 rounded border px-2 py-2 text-sm outline-none"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="p-1 text-main"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="cursor-grab text-gray-400 hover:text-gray-600">
                              <GripVertical size={16} />
                            </div>
                            <span className="text-sm">{stage.name}</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(stage)}
                              className="flex items-center gap-1 p-1 text-xs"
                            >
                              <Edit size={13} />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStage(stage.id)}
                              className="flex items-center gap-1 p-1 text-xs"
                            >
                              <Trash2 size={13} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <DynamicModal
        title="Add New"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="new-list-name" className="text-sm font-medium">
            List Name
          </label>
          <input
            id="new-list-name"
            type="text"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            className="rounded border p-2 text-sm outline-none"
            placeholder="Enter a name for the new list"
            onKeyDown={(e) => e.key === "Enter" && handleAddStage()}
          />
          <button
            type="button"
            onClick={handleAddStage}
            className="mt-2 rounded bg-main px-4 py-2 text-white"
          >
            Create New
          </button>
        </div>
      </DynamicModal>
    </div>
  );
};
