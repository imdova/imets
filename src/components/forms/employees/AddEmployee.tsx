import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import {
  FormGroup,
  ModulePermission,
  Permission,
} from "@/components/DrawerForm/types";
import { Shield, UserPlus } from "lucide-react";

// Define your form values type
export type EmployeeFormValues = {
  profileImage: File[];
  firstName: string;
  lastName: string;
  employeeID: string;
  joiningDate: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  designation: string;
  about: string;
  permissions: Record<string, Permission[]>; // store selected module permissions
};

const PERMISSION_CATEGORIES: ModulePermission[] = [
  {
    id: "holidays",
    label: "Holidays",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "leaves",
    label: "Leaves",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "clients",
    label: "Clients",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "projects",
    label: "Projects",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "tasks",
    label: "Tasks",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "chats",
    label: "Chats",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "assets",
    label: "Assets",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "timing_sheets",
    label: "Timing Sheets",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
];

export default function AddEmployee({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EmployeeFormValues>; // safer (not all fields required on init)
  variant?: "drawer" | "modal";
}) {
  const EmployeeFormGroups: FormGroup<EmployeeFormValues>[] = [
    {
      title: "Basic Information",
      defaultOpen: true, // First group open by default
      icon: UserPlus,
      fields: [
        {
          name: "profileImage",
          label: "Upload Profile Image",
          type: "file",
          accept: "image/*",
          maxSize: 800,
          placeholder: "JPG, GIF or PNG. Max size of 800K",
          grid: { xs: 12 },
        },
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "employeeID",
          label: "Employee ID",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "phone",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "designation",
          label: "Designation",
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "about",
          label: "About",
          type: "text-editor",
          grid: { xs: 12 },
        },
      ],
    },
    {
      title: "Permissions",
      icon: Shield,
      fields: [
        {
          name: "permissions",
          label: "Permissions",
          type: "permissions",
          permissionCategories: PERMISSION_CATEGORIES,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: EmployeeFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EmployeeFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EmployeeFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Add New Employee"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
