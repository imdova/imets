import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";
import Image from "next/image";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import AddDocument from "@/components/forms/AddDocument";

type FileItem = {
  id: string;
  title: string;
  description: string;
  owner: Contact;
  status: {
    type: "draft" | "sent" | "alert";
    label: string;
  };
};

const Files: React.FC = () => {
  const [isAddDoc, setIsAddDoc] = useState<boolean>(false);
  const files: FileItem[] = [
    {
      id: "1",
      title: "Collier-Turner Proposal",
      description:
        "Send customizable quotes, proposals and contracts to close deals faster.",
      owner: contacts[0],
      status: {
        type: "draft",
        label: "Draft",
      },
    },
    {
      id: "2",
      title: "Collier-Turner Proposal",
      description:
        "Send customizable quotes, proposals and contracts to close deals faster.",
      owner: contacts[1],
      status: {
        type: "sent",
        label: "Sent",
      },
    },
    {
      id: "3",
      title: "Collier-Turner Proposal",
      description:
        "Send customizable quotes, proposals and contracts to close deals faster.",
      owner: contacts[2],
      status: {
        type: "alert",
        label: "!",
      },
    },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "draft":
        return (
          <div className="rounded bg-blue-500 px-3 py-2 text-xs font-semibold text-white">
            Draft
          </div>
        );
      case "sent":
        return (
          <div className="rounded bg-green-500 px-3 py-2 text-xs font-semibold text-white">
            Sent
          </div>
        );
      case "proposal":
        return (
          <div className="rounded bg-red-500 px-3 py-2 text-xs font-semibold text-white">
            Proposal
          </div>
        );
      default:
        <div className="rounded bg-yellow-500 px-3 py-2 text-xs font-semibold text-white">
          Pending
        </div>;
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Files</h1>
      <div className="mb-6 flex flex-col justify-between gap-2 rounded-lg border border-gray-200 p-3 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="font-medium text-gray-700">Manage Documents</h2>
          <p className="text-sm text-gray-600">
            Send customizable quotes, proposals and contracts to close deals
            faster.
          </p>
        </div>
        <button
          onClick={() => setIsAddDoc(true)}
          className="rounded bg-secondary px-3 py-2 text-white transition-colors hover:bg-black"
        >
          Create Document
        </button>
      </div>
      {files.map((file) => (
        <div
          key={file.id}
          className="mb-6 rounded-lg border border-gray-200 p-3 shadow-sm"
        >
          <div className="flex justify-between gap-3">
            <div>
              {" "}
              <h3 className="text-sm font-medium text-gray-800">
                {file.title}
              </h3>
              <p className="mb-3 text-sm text-gray-600">{file.description}</p>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <Image
                    className="h-12 w-12 rounded-lg object-cover"
                    src={file.owner.avatar}
                    width={150}
                    height={150}
                    alt={file.owner.name}
                  />
                  <div className="flex gap-2">
                    <h2 className="font-semibold">{file.owner.name}</h2>
                    <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                      Owner
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>{getStatusIcon(file.status.type)}</div>
              <OptionsDropdown
                actions={[
                  {
                    label: "Edit",
                    icon: <Edit size={16} />,
                    onClick: () => alert("Editing item..."),
                  },
                  {
                    label: "Delete",
                    icon: <Trash2 size={16} />,
                    danger: true,
                    onClick: () => confirm("Are you sure you want to delete?"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      ))}
      <AddDocument isOpen={isAddDoc} setIsOpen={setIsAddDoc} variant="modal" />
    </div>
  );
};

export default Files;
