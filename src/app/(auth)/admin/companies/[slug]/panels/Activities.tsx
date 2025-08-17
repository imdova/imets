import CustomSelect from "@/components/UI/CustomSelect";
import {
  ArrowUpDown,
  Calendar,
  MailCheck,
  Notebook,
  Phone,
  Undo2,
} from "lucide-react";
import React from "react";

type Activity = {
  id: string;
  date: string;
  type: "message" | "call" | "note" | "meeting" | "response";
  title: string;
  time: string;
  details?: string;
  author?: string;
  upcoming?: boolean;
  reminder?: string;
  priority?: "High" | "Medium" | "Low";
  assignedTo?: string;
};

const Activities: React.FC = () => {
  const activities: Activity[] = [
    {
      id: "1",
      date: "28 May 2025",
      type: "message",
      title: "You sent 1 Message to the contact.",
      time: "10:25 pm",
    },
    {
      id: "2",
      date: "28 May 2025",
      type: "call",
      title: "Denwar responded to your appointment schedule question by call",
      time: "09:30 pm",
      details: "at 09:30pm",
    },
    {
      id: "3",
      date: "28 May 2025",
      type: "note",
      title: "Notes added by Antony",
      time: "10:00 pm",
      details:
        "Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week.",
      author: "Antony",
    },
    {
      id: "4",
      date: "27 May 2025",
      type: "meeting",
      title: "Meeting With Abraham",
      time: "05:00 pm",
    },
    {
      id: "5",
      date: "27 May 2025",
      type: "response",
      title: "Drain responded to your appointment schedule question.",
      time: "09:25 pm",
    },
    {
      id: "6",
      upcoming: true,
      type: "meeting",
      title: "Product Meeting",
      time: "05:00 pm",
      date: "25 Jul 2023",
      details:
        "A product team meeting is a gathering of the cross-functional product team – ideally including team members from product, engineering, marketing, and customer support.",
      reminder: "1 hr",
      priority: "High",
      assignedTo: "Team",
    },
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
            <MailCheck size={16} />
          </div>
        );
      case "call":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500 text-white">
            <Phone size={16} />
          </div>
        );
      case "note":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-500 text-white">
            <Notebook size={16} />
          </div>
        );
      case "meeting":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500 text-white">
            <Calendar size={16} />
          </div>
        );
      case "response":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500 text-white">
            <Undo2 size={16} />
          </div>
        );
      default:
        return "•";
    }
  };

  const groupActivitiesByDate = () => {
    const grouped: Record<string, Activity[]> = {};

    activities.forEach((activity) => {
      if (activity.upcoming) {
        if (!grouped["Upcoming"]) {
          grouped["Upcoming"] = [];
        }
        grouped["Upcoming"].push(activity);
      } else {
        if (!grouped[activity.date]) {
          grouped[activity.date] = [];
        }
        grouped[activity.date].push(activity);
      }
    });

    return grouped;
  };

  const groupedActivities = groupActivitiesByDate();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">Activities</h1>
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
      </div>

      {Object.entries(groupedActivities).map(([date, activities]) => (
        <div key={date} className="mb-8">
          <div className="mb-4 flex w-fit items-center rounded-md bg-main-transparent px-2 py-1 text-main">
            <span className="mr-2">
              <Calendar size={12} />
            </span>
            <span className="text-xs font-medium">{date}</span>
          </div>

          {activities.map((activity) => (
            <div key={activity.id} className="mb-6 last:mb-0">
              {!activity.upcoming ? (
                <>
                  <div className="rounded-md border border-gray-200 p-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="mr-2 mt-1 text-gray-500">
                        {getActivityIcon(activity.type)}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800">{activity.title}</p>
                        <span className="text-sm text-gray-500">
                          {activity.time}
                        </span>
                        {activity.details && (
                          <p className="mt-1 rounded bg-gray-50 text-sm text-gray-500">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-medium text-gray-800">
                      {activity.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {activity.date}, {activity.time}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-500">
                    {activity.details}
                  </p>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                    <div>
                      <p className="mb-1 text-gray-500">Reminder *</p>
                      <CustomSelect
                        value={activity.reminder || ""}
                        onChange={(value) =>
                          console.log("Reminder selected:", value)
                        }
                        placeholder="Select reminder"
                        options={[
                          { label: "None", value: "None" },
                          { label: "15 minutes", value: "15 min" },
                          { label: "30 minutes", value: "30 min" },
                          { label: "1 hour", value: "1 hr" },
                          { label: "2 hours", value: "2 hrs" },
                          { label: "1 day", value: "1 day" },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-gray-500">Task Priority *</p>
                      <CustomSelect
                        value={activity.priority || ""}
                        onChange={(value) =>
                          console.log("Priority selected:", value)
                        }
                        placeholder="Select priority"
                        options={[
                          { label: "Low", value: "Low" },
                          { label: "Medium", value: "Medium" },
                          { label: "High", value: "High" },
                          { label: "Urgent", value: "Urgent" },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-gray-500">Assigned To *</p>
                      <CustomSelect
                        value={activity.assignedTo || ""}
                        onChange={(value) => console.log("Assigned to:", value)}
                        placeholder="Select team member"
                        options={[
                          { label: "Unassigned", value: "Unassigned" },
                          { label: "John Doe", value: "John Doe" },
                          { label: "Jane Smith", value: "Jane Smith" },
                          { label: "Team", value: "Team" },
                          { label: "Product Team", value: "Product Team" },
                          { label: "Support Team", value: "Support Team" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Activities;
