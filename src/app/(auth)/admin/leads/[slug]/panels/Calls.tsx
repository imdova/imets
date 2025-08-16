import AddCall from "@/components/forms/AddCall";
import CustomSelect from "@/components/UI/CustomSelect";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { contacts } from "@/constants/contacts";
import { Contact } from "@/types/data";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Call = {
  id: string;
  caller: Contact;
  date: string;
  content: string;
  status: string;
};

const Calls: React.FC = () => {
  const [isAddCall, setIsAddCall] = useState<boolean>(false);

  const calls: Call[] = [
    {
      id: "1",
      caller: contacts[0],
      date: "23 Jul 2023, 10:00 pm",
      status: "Busy",
      content:
        "A project review evaluates the success of an initiative and identifies areas for improvement. It can also evaluate a current project to determine whether it's on the right track. Or, it can determine the success of a completed project.",
    },
    {
      id: "2",
      caller: contacts[3],
      date: "18 Sep 2025, 09:52 am",
      status: "No Answer",

      content:
        "A project plan typically contains a list of the essential elements of a project, such as stakeholders, scope, timelines, estimated cost and communication methods. The project manager typically lists the information based on the assignment.",
    },
    {
      id: "3",
      caller: contacts[1],
      date: "20 Sep 2025, 10:26 pm",
      status: "Unavailable",

      content:
        "Projects play a crucial role in the success of organizations, and their importance cannot be overstated. Whether it's launching a new product, improving an existing",
    },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">Calls</h1>
        <button
          onClick={() => setIsAddCall(true)}
          className="flex items-center gap-1 text-sm text-main"
        >
          <PlusCircle size={13} /> Add New
        </button>
      </div>

      {calls.map((call) => (
        <div
          key={call.id}
          className="mb-4 rounded-lg border border-gray-200 bg-white p-3"
        >
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            {/* Caller and Date Header */}
            <div className="mb-2 flex items-center gap-2">
              <Image
                className="h-10 w-10 rounded-lg object-cover"
                src={call.caller.avatar}
                width={150}
                height={150}
                alt={call.caller.name}
              />
              <h3 className="text-sm text-gray-500">
                <strong className="mr-2 text-sm text-gray-800">
                  {call.caller.name}
                </strong>
                logged a call on {call.date}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <CustomSelect
                value={call.status || "no_answer"}
                onChange={(value) => console.log("Sort By:", value)}
                placeholder="Status"
                options={[
                  { label: "Busy", value: "Busy" },
                  { label: "No Answer", value: "No Answer" },
                  { label: "Unavailable", value: "Unavailable" },
                  { label: "Wrong number", value: "Wrong number" },
                  { label: "Left Voice Messge", value: "Left Voice Messge" },
                  { label: "Moving Forward", value: "Moving Forward" },
                ]}
              />
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

          {/* Call Content */}
          <div className="mb-3 text-sm text-gray-700">{call.content}</div>
        </div>
      ))}
      <AddCall isOpen={isAddCall} setIsOpen={setIsAddCall} variant="modal" />
    </div>
  );
};

export default Calls;
