// app/employees/[slug]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  MessageSquare,
  IdCard,
  Star,
  CalendarCheck2,
  Mars,
  Cake,
  Edit,
  CalendarX2,
  BookmarkCheck,
  HandPlatter,
  BriefcaseBusiness,
  Baby,
} from "lucide-react";
import Image from "next/image";
import { employees } from "@/constants/employees";

const EmployeeDetail = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [activeSections, setActiveSections] = useState({
    basicInfo: true,
    personalInfo: true,
    annualReport: true,
    about: true,
    bankInfo: true,
    familyInfo: true,
    education: true,
    experience: true,
    projects: true,
    emergency: true,
  });

  const toggleSection = (section: string) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  // Find employee by ID (using slug as ID for this example)
  const employee = employees.find((emp) => emp.id === slug);

  if (!employee) {
    return <div className="p-8">Employee not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-9">
        {/* Left Column */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white lg:col-span-3">
          {/* Employee Profile Header */}
          <div className="border-b border-gray-200">
            <div className="relative flex flex-col items-center gap-6 p-4">
              <div className="animate-gradient-x absolute left-0 top-0 h-[90px] w-full rounded-lg bg-gradient-to-tr from-main via-secondary to-yellow-500 opacity-90"></div>{" "}
              <div className="relative flex flex-1 flex-col items-center gap-2 pt-14">
                <Image
                  width={100}
                  height={100}
                  src={employee.avatar}
                  alt={employee.name}
                  className="h-16 w-16 rounded-full border border-white object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {employee.name}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    • {employee.designation}
                  </p>
                  <p className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    • 10+ years of Experience
                  </p>
                </div>

                <div className="mt-4 grid w-full grid-cols-1 gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <IdCard size={14} /> Client ID
                    </p>
                    <p className="text-xs font-medium">CLT-0024</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <Star size={14} /> Team
                    </p>
                    <p className="text-xs font-medium">UI/UX Design</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={14} /> Date Of Join
                    </p>
                    <p className="text-xs font-medium">1st Jan 2023</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <CalendarCheck2 size={14} /> Report Office
                    </p>
                    <p className="text-xs font-medium">Doglas Martini</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between gap-2">
                <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-main px-4 py-2 text-white">
                  <Edit3 size={16} />
                  <span>Edit Info</span>
                </button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-200 px-4 py-2 text-gray-700">
                  <MessageSquare size={16} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
          {/* Basic Information */}
          <div className="border-b border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Basic information</h2>
              <button>
                <Edit size={12} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Phone</p>
                </div>
                <div>
                  <p className="text-xs font-medium">(163) 2459 315</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Email</p>
                </div>
                <div>
                  <p className="text-xs font-medium">perralt12@example.com</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mars size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Gender</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Male</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Cake size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Birthday</p>
                </div>
                <div>
                  <p className="text-xs font-medium">24th July 2000</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Address</p>
                </div>
                <div>
                  <p className="text-xs font-medium">
                    1861 Bayonne Ave, Manchester, NJ, 08759
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Personal Information */}
          <div className="border-b border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Personal Information</h2>
              <button>
                <Edit size={12} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <IdCard size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Passport No</p>
                </div>
                <div>
                  <p className="text-xs font-medium">QRET4566FGRT</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CalendarX2 size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Passport Exp Date</p>
                </div>
                <div>
                  <p className="text-xs font-medium">15 May 2029</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mars size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Nationality</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Egyptian</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookmarkCheck size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Religion</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Musliem</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <HandPlatter size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Marital status</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Yes</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">Employment of spouse</p>
                </div>
                <div>
                  <p className="text-xs font-medium">No</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Baby size={14} className="text-gray-500" />
                  <p className="text-xs text-gray-500">No. of children</p>
                </div>
                <div>
                  <p className="text-xs font-medium">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4">
            <div className="mb-4 flex cursor-pointer items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Emergency Contact Number
              </h3>
              <button>
                <Edit size={12} />
              </button>
            </div>
            {activeSections.emergency && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Primary</p>
                    <p className="text-sm font-medium text-main">
                      Adrian Peralt • Father
                    </p>
                  </div>
                  <p className="text-xs font-medium">+1 127 2685 598</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Secondary</p>
                    <p className="text-sm font-medium text-main">
                      Karen Wills • Mother
                    </p>
                  </div>
                  <p className="text-xs font-medium">+1 989 7774 787</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-6 space-y-6">
          {/* Annual Report */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={() => toggleSection("annualReport")}
            >
              <h3 className="font-semibold text-gray-800">Annual Report</h3>
              {activeSections.annualReport ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {activeSections.annualReport && (
              <div className="border-t border-gray-200 p-4">
                {/* Project Cards */}
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">World Health</h4>
                        <p className="text-sm text-gray-500">
                          8 tasks • 15 Completed
                        </p>
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">
                        Headline Project Lead
                      </p>
                      <p className="text-sm text-gray-500">
                        31 July 2025 • Leona
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">
                          Hospital Administration
                        </h4>
                        <p className="text-sm text-gray-500">
                          8 tasks • 15 Completed
                        </p>
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">
                        Headline Project Lead
                      </p>
                      <p className="text-sm text-gray-500">
                        31 July 2025 • Leona
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About Employee */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={() => toggleSection("about")}
            >
              <h3 className="font-semibold text-gray-800">About Employee</h3>
              {activeSections.about ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {activeSections.about && (
              <div className="border-t border-gray-200 p-4">
                <p className="text-gray-700">
                  Stephan is a dedicated software developer with over 10 years
                  of experience in building scalable web applications. He
                  specializes in front-end technologies and has a keen eye for
                  UI/UX design. In his free time, he enjoys contributing to
                  open-source projects and mentoring junior developers.
                </p>
              </div>
            )}
          </div>

          {/* Bank Information */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={() => toggleSection("bankInfo")}
            >
              <h3 className="font-semibold text-gray-800">Bank Information</h3>
              {activeSections.bankInfo ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {activeSections.bankInfo && (
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 p-4">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-medium">City Bank</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">1234567890</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">IFSC Code</p>
                  <p className="font-medium">CITI0000456</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">PAN Number</p>
                  <p className="font-medium">ABCDE1234F</p>
                </div>
              </div>
            )}
          </div>

          {/* Additional sections would follow the same pattern */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
