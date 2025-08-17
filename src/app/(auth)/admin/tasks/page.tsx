"use client";

import {
  Check,
  Calendar,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  FileBox,
  FileText,
  Sheet,
} from "lucide-react";
import { Suspense, useState, useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";
import Image from "next/image";
import Link from "next/link";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { FilterBar } from "@/components/filters/FilterBar";
import { FilterOption } from "@/types/genral";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import AddTask from "@/components/forms/AddTask";

type TaskStatus =
  | "Pending"
  | "Inprogress"
  | "Rejected"
  | "Completed"
  | "Collab"
  | "Rated"
  | "Meeting"
  | "Email"
  | "Calls"
  | "Task";
type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  date?: string;
  dateGroup?: string;
  completed: boolean;
  labels?: string[];
  user: Contact;
}

const labels = {
  "/tasks": "Tasks",
};

// Raw list of tasks, to be grouped dynamically
const allTasks: Task[] = [
  {
    id: "1",
    title: "Add a form to Update Task",
    status: "Pending",
    priority: "medium",
    dateGroup: "Today",
    completed: false,
    user: contacts[0],
  },
  {
    id: "2",
    title: "Make all strokes thinner",
    status: "Inprogress",
    priority: "low",
    dateGroup: "Today",
    completed: false,
    user: contacts[0],
  },
  {
    id: "3",
    title: "Update original content",
    status: "Inprogress",
    priority: "high",
    dateGroup: "Yesterday",
    completed: false,
    user: contacts[0],
  },
  {
    id: "4",
    title: "Use only component colours",
    status: "Completed",
    priority: "medium",
    dateGroup: "Yesterday",
    completed: true,
    user: contacts[0],
  },
  {
    id: "5",
    title: "Add images to the cards section",
    status: "Rejected",
    priority: "medium",
    dateGroup: "Recent",
    completed: false,
    user: contacts[0],
  },
  {
    id: "6",
    title: "Promotion",
    status: "Rejected",
    priority: "high",
    date: "25 Apr 2025",
    dateGroup: "Recent",
    completed: false,
    user: contacts[0],
  },
  {
    id: "7",
    title: "Check new designs",
    status: "Rated",
    priority: "high",
    date: "23 Apr 2025",
    dateGroup: "23 Apr 2025",
    completed: false,
    user: contacts[0],
  },
  {
    id: "8",
    title: "Schedule marketing review",
    status: "Inprogress",
    priority: "medium",
    date: "24 Apr 2025",
    dateGroup: "24 Apr 2025",
    completed: false,
    user: contacts[0],
  },
  {
    id: "9",
    title: "Prepare report for Q3",
    status: "Completed",
    priority: "high",
    date: "22 Apr 2025",
    dateGroup: "22 Apr 2025",
    completed: true,
    user: contacts[0],
  },
  {
    id: "10",
    title: "Team sync meeting",
    status: "Meeting",
    priority: "low",
    date: "22 Apr 2025",
    dateGroup: "22 Apr 2025",
    completed: false,
    user: contacts[0],
  },
  {
    id: "11",
    title: "Follow up with client",
    status: "Email",
    priority: "medium",
    date: "21 Apr 2025",
    dateGroup: "21 Apr 2025",
    completed: false,
    user: contacts[0],
  },
];

const statusColors: Record<TaskStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Inprogress: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-800",
  Completed: "bg-green-100 text-green-800",
  Collab: "bg-purple-100 text-purple-800",
  Rated: "bg-indigo-100 text-indigo-800",
  Meeting: "bg-pink-100 text-pink-800",
  Email: "bg-cyan-100 text-cyan-800",
  Calls: "bg-orange-100 text-orange-800",
  Task: "bg-gray-100 text-gray-800",
};

const TasksFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
      { value: "draft", label: "Draft" },
    ],
  },
];

// Define a mapping for the special group colors
const specialGroupBorderColors: Record<string, string> = {
  Recent: "border-l-blue-500",
  Today: "border-l-blue-500",
  Yesterday: "border-l-green-500",
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Group tasks dynamically whenever the tasks state changes
  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {
      Recent: [],
      Today: [],
      Yesterday: [],
    };

    tasks.forEach((task) => {
      // Check for hardcoded groups first
      if (groups.hasOwnProperty(task.dateGroup || "")) {
        if (!groups[task.dateGroup!]) {
          groups[task.dateGroup!] = [];
        }
        groups[task.dateGroup!].push(task);
      } else if (task.date) {
        // Create a group for any specific date
        if (!groups[task.date]) {
          groups[task.date] = [];
        }
        groups[task.date].push(task);
      }
    });

    // Combine all groups in the desired order
    const finalGroups: Record<string, Task[]> = {
      ...groups,
    };

    return finalGroups;
  }, [tasks]);

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const toggleCollapse = (groupName: string) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [groupName]: !prevState[groupName],
    }));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceGroup = result.source.droppableId;
    const destGroup = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    // A bit more complex since we're using a single list of tasks
    const sourceTaskIds = groupedTasks[sourceGroup].map((task) => task.id);
    const destTaskIds = groupedTasks[destGroup].map((task) => task.id);

    const movedTaskId = sourceTaskIds[sourceIndex];
    const newTasks = [...tasks];
    const movedTaskIndex = newTasks.findIndex(
      (task) => task.id === movedTaskId,
    );

    if (movedTaskIndex === -1) return;

    const [movedTask] = newTasks.splice(movedTaskIndex, 1);

    // Find the correct new position based on the destination group and index
    let newPositionIndex = 0;
    if (destIndex === 0) {
      newPositionIndex = newTasks.findIndex(
        (task) => task.id === destTaskIds[0],
      );
      if (newPositionIndex === -1) {
        newPositionIndex = newTasks.length; // Append to the end of the list
      }
    } else {
      const destTaskIdBefore = destTaskIds[destIndex - 1];
      newPositionIndex = newTasks.findIndex(
        (task) => task.id === destTaskIdBefore,
      );
      if (newPositionIndex !== -1) {
        newPositionIndex += 1; // Insert after the element at destIndex - 1
      } else {
        newPositionIndex = newTasks.length; // Append to the end
      }
    }

    movedTask.dateGroup = destGroup;
    movedTask.date =
      destGroup.includes("Apr") || destGroup.includes("May")
        ? destGroup
        : movedTask.date; // Update date if dropped into a date group

    newTasks.splice(newPositionIndex, 0, movedTask);

    setTasks(newTasks);
  };

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Tasks</h2>
      <div className="mb-4 flex flex-col justify-between md:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
        <div className="md:max-w-xs">
          <Dropdown
            icon={<FileBox size={15} />}
            placholder="Export"
            options={[
              {
                label: "Export As PDF",
                icon: <FileText size={16} />,
                onClick: () => console.log("PDF"),
              },
              {
                label: "Export As Excel",
                icon: <Sheet size={16} />,
                onClick: () => console.log("Excel"),
              },
            ]}
          />
        </div>
      </div>
      <div>
        <Suspense>
          <FilterBar
            filters={TasksFilters}
            showFilters
            showSearch
            showBtnAdd
            showViewToggle={false}
            placeholder="Search Tasks..."
            BtnAdd={{ label: "Add Task", onClick: () => setIsOpen(true) }}
            sortOptions={[
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "totalValue-asc", label: "Value (Low-High)" },
              { value: "totalValue-desc", label: "Value (High-Low)" },
            ]}
            defaultSort="name-asc"
            showDateRange
          />
        </Suspense>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(groupedTasks).map(([groupName, groupTasks]) => {
              // Determine the border color based on the group name
              const borderColor =
                specialGroupBorderColors[groupName] || "border-l-gray-500";

              return (
                <div
                  key={groupName}
                  className={`rounded-lg border border-gray-200 bg-gray-50`}
                >
                  <div
                    className={`flex cursor-pointer items-center justify-between border-b bg-gray-50 p-3`}
                    onClick={() => toggleCollapse(groupName)}
                  >
                    <h2 className="font-medium">{groupName}</h2>
                    <button className="text-gray-500 hover:text-gray-700">
                      {collapsedGroups[groupName] ? (
                        <ChevronRight size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {!collapsedGroups[groupName] && (
                    <Droppable droppableId={groupName}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="divide-y"
                        >
                          {groupTasks.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`border-l-4 bg-white ${borderColor}`}
                                >
                                  <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <GripVertical size={16} />
                                      </div>
                                      <button
                                        onClick={() =>
                                          toggleTaskCompletion(task.id)
                                        }
                                        className={`flex h-5 w-5 items-center justify-center rounded border ${task.completed ? "border-green-500 bg-green-500 text-white" : "border-gray-300"}`}
                                      >
                                        {task.completed && <Check size={12} />}
                                      </button>
                                      <span
                                        className={`${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
                                      >
                                        {task.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span
                                        className={`rounded-md px-2 py-1 text-xs ${statusColors[task.status]}`}
                                      >
                                        {task.status}
                                      </span>
                                      {task.date && (
                                        <span className="flex items-center text-sm text-gray-500">
                                          <Calendar
                                            className="mr-1"
                                            size={14}
                                          />
                                          {task.date}
                                        </span>
                                      )}
                                      <Link
                                        href={`/admin/contacts/${task.user.id}`}
                                      >
                                        <Image
                                          className="h-6 w-6 rounded-full object-cover"
                                          src={task.user.avatar}
                                          width={150}
                                          height={150}
                                          alt={task.user.name}
                                        />
                                      </Link>
                                      <OptionsDropdown
                                        actions={[
                                          {
                                            label: "View Details",
                                            icon: <Eye size={16} />,
                                            onClick: () =>
                                              alert("Viewing details..."),
                                          },
                                          {
                                            label: "Edit",
                                            icon: <Edit size={16} />,
                                            onClick: () =>
                                              alert("Editing item..."),
                                          },
                                          {
                                            label: "Delete",
                                            icon: <Trash2 size={16} />,
                                            danger: true,
                                            onClick: () =>
                                              confirm(
                                                "Are you sure you want to delete?",
                                              ),
                                          },
                                        ]}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
      <AddTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default TaskManagement;
