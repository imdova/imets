import React, { useState } from "react";
import {
  Paperclip,
  MessageSquare,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  ArrowDownToLine,
  Reply,
  ArrowUpDown,
  PlusCircle,
} from "lucide-react";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";
import Image from "next/image";
import CustomSelect from "@/components/UI/CustomSelect";
import AddNote from "@/components/forms/AddNote";

type FileAttachment = {
  id: string;
  name: string;
  size: string;
  type: "doc" | "xls" | "txt" | "image" | "other";
  previewUrl?: string;
};

type Note = {
  id: string;
  author: Contact;
  date: string;
  content: string;
  files?: FileAttachment[];
  isComment?: boolean;
  replies?: Note[];
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "2",
      author: contacts[2],
      date: "15 Sep 2023, 12:10 pm",
      content:
        "A project review evaluates the success of an initiative and identifies areas for improvement. It can also evaluate a current project to determine whether it's on the right track. Or, it can determine the success of a completed project.",
      files: [
        {
          id: "f1",
          name: "Project Specs.xls",
          size: "365 KB",
          type: "xls",
        },
      ],
    },
    {
      id: "4",
      author: contacts[1],
      date: "18 Sep 2023, 09:52 am",
      content:
        "A project plan typically contains a list of the essential elements of a project, such as stakeholders, scope, timelines, estimated cost and communication methods. The project manager typically lists the information based on the assignment.",
      files: [
        {
          id: "f2",
          name: "Andevpass.txt",
          size: "365 KB",
          type: "txt",
        },
      ],
    },
    {
      id: "5",
      author: contacts[3],
      date: "15 Sep 2024, 11:15 pm",
      content:
        "The best way to get a project done faster is to start sooner. A goal without a timeline is just a dream.The goal you set must be challenging. At the same time, it should be realistic and attainable, not impossible to reach.",
      isComment: true,
      replies: [
        {
          id: "5-1",
          author: contacts[0],
          date: "16 Sep 2024, 09:30 am",
          content:
            "Thanks for your input Aeron. We'll consider this in our planning.",
        },
      ],
    },
    {
      id: "6",
      author: contacts[0],
      date: "20 Sep 2023, 10:26 pm",
      content:
        "Projects play a crucial role in the success of organizations, and their importance cannot be overstated. Whether it's launching a new product, innovation or auction.",
      files: [
        {
          id: "f3",
          name: "Project Image.png",
          size: "1.2 MB",
          type: "image",
          previewUrl: "https://via.placeholder.com/100x100",
        },
      ],
    },
  ]);

  const [replyInputs, setReplyInputs] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState("");
  const [isAddNote, setIsAddNote] = useState<boolean>(false);

  const handleReply = (noteId: string) => {
    setReplyInputs((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
  };

  const submitReply = (noteId: string) => {
    if (!replyText.trim()) return;

    const newReply: Note = {
      id: `${noteId}-${Date.now()}`,
      author: contacts[0],
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: replyText,
    };

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              replies: [...(note.replies || []), newReply],
            }
          : note,
      ),
    );

    setReplyText("");
    setReplyInputs((prev) => ({ ...prev, [noteId]: false }));
  };

  const getFileIcon = (file: FileAttachment) => {
    switch (file.type) {
      case "doc":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-main text-white">
            <FileText size={14} />
          </div>
        );
      case "xls":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white">
            <FileSpreadsheet size={14} />
          </div>
        );
      case "txt":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-500 text-white">
            <FileText size={14} />
          </div>
        );

      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-500 text-white">
            <Paperclip size={14} />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">Notes</h1>

        <div className="flex items-center gap-2">
          <CustomSelect
            icon={ArrowUpDown}
            value={"Newest"}
            onChange={(value) => console.log("Sort By:", value)}
            placeholder="Sort By"
            options={[
              { label: "Newest", value: "Newest" },
              { label: "Oldest", value: "Oldest" },
            ]}
          />
          <button
            onClick={() => setIsAddNote(true)}
            className="flex items-center gap-1 text-sm text-main"
          >
            <PlusCircle size={13} /> Add New
          </button>
        </div>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className="mb-6 rounded border border-gray-200 p-2 shadow-sm"
        >
          {/* Author and Date Header */}
          <div className="mb-2 flex items-center gap-3">
            <Image
              className="h-12 w-12 rounded-lg object-cover"
              src={note.author.avatar}
              width={150}
              height={150}
              alt={note.author.name}
            />
            <div>
              <h3
                className={`font-medium ${note.isComment ? "text-gray-600" : "text-gray-800"}`}
              >
                {note.author.name}
              </h3>
              <span className="text-sm text-gray-500">{note.date}</span>
            </div>
          </div>

          {/* Divider for empty content notes */}
          {!note.content && (
            <div className="my-2 border-t border-gray-200"></div>
          )}

          {/* Note Content */}
          {note.content && (
            <div
              className={`mb-3 ${note.isComment ? "text-gray-600" : "text-gray-700"}`}
            >
              {note.content}
            </div>
          )}

          {/* Files - Styled exactly like screenshot */}
          {note.files && note.files.length > 0 && (
            <div className="mb-3 mt-2">
              {note.files.map((file) => (
                <div
                  key={file.id}
                  className="group flex w-fit items-center gap-1 rounded border border-gray-200 p-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  {file.type === "image" && file.previewUrl ? (
                    <Image
                      width={100}
                      height={100}
                      src={file.previewUrl}
                      alt={file.name}
                      className="h-12 w-12 rounded border border-gray-200 object-cover"
                    />
                  ) : (
                    <span className="mr-2 mt-0.5 flex items-center">
                      {getFileIcon(file)}
                    </span>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-700 group-hover:text-main">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400">{file.size}</p>
                      </div>
                      <button>
                        <ArrowDownToLine size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Section */}
          {note.isComment && (
            <div className="mt-2">
              <button
                onClick={() => handleReply(note.id)}
                className="flex items-center text-sm text-main hover:text-main"
              >
                <MessageSquare size={14} className="mr-1" />
                {note.replies?.length || 0} Replies
                <ChevronDown
                  size={14}
                  className={`ml-1 transition-transform ${replyInputs[note.id] ? "rotate-180" : ""}`}
                />
              </button>

              {/* Replies */}
              {note.replies &&
                (replyInputs[note.id] || note.replies.length > 0) && (
                  <div className="my-2 ml-4 rounded-md border border-gray-200 p-4 shadow-sm">
                    {note.replies.map((reply) => (
                      <div key={reply.id}>
                        <p className="mb-1 text-sm text-gray-600">
                          {reply.content}
                        </p>
                        <div className="text-xs text-gray-500">
                          Commented by{" "}
                          <b className="text-black">{reply.author.name}</b> on{" "}
                          {reply.date}
                        </div>
                      </div>
                    ))}

                    {/* Reply Input */}
                    {replyInputs[note.id] && (
                      <div className="mt-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full rounded border border-gray-300 p-2 text-sm"
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() =>
                              setReplyInputs((prev) => ({
                                ...prev,
                                [note.id]: false,
                              }))
                            }
                            className="mr-2 rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitReply(note.id)}
                            className="flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 text-sm"
                          >
                            <Reply size={13} /> Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      ))}
      <AddNote isOpen={isAddNote} setIsOpen={setIsAddNote} variant="modal" />
    </div>
  );
};

export default Notes;
