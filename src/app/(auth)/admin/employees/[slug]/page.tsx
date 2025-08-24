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
  Eye,
  Bug,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import { employees } from "@/constants/employees";
import LineTabs from "@/components/UI/LineTab";
import { projects } from "@/constants/projects";
import Link from "next/link";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import AddEmployee, {
  EmployeeFormValues,
} from "@/components/forms/employees/AddEmployee";
import EditPersonalInfo from "@/components/forms/employees/EditPersonalInfo";
import EditEmergencyContact from "@/components/forms/employees/EditEmergencyContact";
import EditBank from "@/components/forms/employees/EditBank";
import EditFamily from "@/components/forms/employees/EditFamily";
import EditEducation from "@/components/forms/employees/EditEducation";
import EditExperience from "@/components/forms/employees/EditExperience";
import AddBank from "@/components/forms/employees/AddBank";

interface Asset {
  id: string;
  assetCode: string;
  title: string;
  image: string;
  assigndDate: string;
  assignedBy: Contact;
}

const dummyAssets: Asset[] = [
  {
    id: "AST-001",
    assetCode: "#343556656",
    title: "Dell XPS 15 Laptop",
    image:
      "https://smarthr.co.in/demo/html/template/assets/img/products/product-05.jpg",
    assigndDate: "2025-08-01",
    assignedBy: contacts[0],
  },
  {
    id: "AST-002",
    assetCode: "#343556656",
    title: "iPhone 15 Pro",
    image:
      "https://smarthr.co.in/demo/html/template/assets/img/products/product-05.jpg",
    assigndDate: "2025-08-10",
    assignedBy: contacts[1],
  },
  {
    id: "AST-003",
    assetCode: "#343556656",
    title: "Sony WH-1000XM5 Headphones",
    image:
      "https://smarthr.co.in/demo/html/template/assets/img/products/product-05.jpg",
    assigndDate: "2025-08-15",
    assignedBy: contacts[2],
  },
];

const dummyEmployeeInitialValues: EmployeeFormValues = {
  profileImage: [], // usually empty at start, you can simulate with File[] if needed
  firstName: "Mohamed",
  lastName: "Sayed",
  employeeID: "EMP-001",
  joiningDate: "2025-08-01", // YYYY-MM-DD format
  username: "mohamed.s",
  email: "mohamed@example.com",
  password: "password123",
  confirmPassword: "password123",
  phone: "+201234567890",
  designation: "VIP",
  about: "Full-stack developer with 5+ years of experience.",
  permissions: {
    holidays: ["Read", "Write"],
    leaves: ["Read"],
    clients: ["Read", "Create"],
    projects: ["Read", "Write", "Delete"],
    tasks: ["Read"],
    chats: ["Read", "Write"],
    assets: ["Read", "Import"],
    timing_sheets: ["Read", "Export"],
  },
};

const EmployeeDetail = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("Projects");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEditPersonal, setIsOpenEditPersonal] = useState<boolean>(false);
  const [isOpenEditEmergency, setIsOpenEditEmergency] =
    useState<boolean>(false);
  const [isOpenEditBank, setIsOpenEditBank] = useState<boolean>(false);
  const [isOpenEditFamily, setIsOpenEditFamily] = useState<boolean>(false);
  const [isOpenEditEducation, setIsOpenEditEducation] =
    useState<boolean>(false);
  const [isOpenEditExperience, setIsOpenEditExperience] =
    useState<boolean>(false);
  const [isOpenAddBank, setIsOpenAddBank] = useState<boolean>(false);
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

  const tabs = [{ label: "Projects" }, { label: "Assets" }];

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
    <div>
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
        <Link
          href={"/admin/employees"}
          className="flex w-fit items-center gap-2 text-gray-800"
        >
          <ArrowLeft size={15} /> Employee Details
        </Link>
        <button
          onClick={() => setIsOpenAddBank(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm text-white sm:w-fit"
        >
          <PlusCircle size={14} /> Bank & Statutory
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-9">
        {/* Left Column */}
        <div className="h-fit overflow-hidden rounded-lg border border-gray-200 bg-white xl:col-span-3">
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
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md bg-main px-4 py-2 text-white"
                >
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
              <button onClick={() => setIsOpen(true)}>
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
              <button onClick={() => setIsOpenEditPersonal(true)}>
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
              <button onClick={() => setIsOpenEditEmergency(true)}>
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
        <div className="space-y-6 xl:col-span-6">
          {/* About Employee */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex cursor-pointer items-center justify-between p-4">
              <h3 className="font-semibold text-gray-800">About Employee</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsOpen(true)}>
                  <Edit size={12} />
                </button>
                <button onClick={() => toggleSection("about")}>
                  {" "}
                  {activeSections.about ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>

            {activeSections.about && (
              <div className="border-t border-gray-200 p-5">
                <p className="text-sm text-gray-600">
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
            <div className="flex cursor-pointer items-center justify-between p-4">
              <h3 className="font-semibold text-gray-800">Bank Information</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsOpenEditBank(true)}>
                  <Edit size={12} />
                </button>
                <button onClick={() => toggleSection("bankInfo")}>
                  {activeSections.bankInfo ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>

            {activeSections.bankInfo && (
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 p-4 sm:grid-cols-1 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Bank Name</p>
                  <p className="text-sm font-medium">City Bank</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-sm font-medium">1234567890</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">IFSC Code</p>
                  <p className="text-sm font-medium">CITI0000456</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">PAN Number</p>
                  <p className="text-sm font-medium">ABCDE1234F</p>
                </div>
              </div>
            )}
          </div>
          {/* Family Information */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex cursor-pointer items-center justify-between p-4">
              <h3 className="font-semibold text-gray-800">
                Family Information
              </h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsOpenEditFamily(true)}>
                  <Edit size={12} />
                </button>
                <button onClick={() => toggleSection("familyInfo")}>
                  {activeSections.familyInfo ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>

            {activeSections.familyInfo && (
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 p-4 sm:grid-cols-1 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium">Hendry Peralt</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Relationship</p>
                  <p className="text-sm font-medium">Brother</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Date of birth</p>
                  <p className="text-sm font-medium">25 May 2014</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">+1 265 6956 961</p>
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Education Details */}
            <div className="h-fit rounded-lg border border-gray-200 bg-white">
              <div className="flex cursor-pointer items-center justify-between p-4">
                <h3 className="font-semibold text-gray-800">
                  Education Details
                </h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsOpenEditEducation(true)}>
                    <Edit size={12} />
                  </button>
                  <button onClick={() => toggleSection("education")}>
                    {activeSections.education ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {activeSections.education && (
                <div className="grid grid-cols-1 gap-4 border-t border-gray-200 p-4">
                  <div>
                    <p className="text-xs text-gray-500">Oxford University</p>
                    <div className="flex justify-between text-sm">
                      <p className="font-medium">Computer Science</p>
                      <p className="text-xs text-gray-400">2020 - 2022</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Cambridge University
                    </p>
                    <div className="flex justify-between text-sm">
                      <p className="font-medium">Computer Network & Systems</p>
                      <p className="text-xs text-gray-400">2016- 2019</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Oxford School</p>
                    <div className="flex justify-between text-sm">
                      <p className="font-medium">Grade X</p>
                      <p className="text-xs text-gray-400">2012 - 2016</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Experience Details */}
            <div className="h-fit rounded-lg border border-gray-200 bg-white">
              <div className="flex cursor-pointer items-center justify-between p-4">
                <h3 className="font-semibold text-gray-800">
                  Experience Details
                </h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsOpenEditExperience(true)}>
                    <Edit size={12} />
                  </button>
                  <button onClick={() => toggleSection("experience")}>
                    {activeSections.experience ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {activeSections.experience && (
                <div className="grid grid-cols-1 gap-4 border-t border-gray-200 p-4">
                  <div>
                    <p className="mb-2 text-xs text-gray-500">Google</p>
                    <div className="flex justify-between">
                      <p className="rounded-md bg-main-transparent px-2 py-1 text-xs font-medium text-main">
                        ● UI/UX Developer
                      </p>
                      <p className="text-xs text-gray-400">
                        Jan 2013 - Present
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-gray-500">Salesforce</p>
                    <div className="flex justify-between">
                      <p className="rounded-md bg-main-transparent px-2 py-1 text-xs font-medium text-main">
                        ● Web Developer
                      </p>
                      <p className="text-xs text-gray-400">
                        Dec 2012- Jan 2015
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-gray-500">HubSpot</p>
                    <div className="flex justify-between">
                      <p className="rounded-md bg-main-transparent px-2 py-1 text-xs font-medium text-main">
                        ● Software Developer
                      </p>
                      <p className="text-xs text-gray-400">
                        Dec 2011- Jan 2012
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-2">
            <LineTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Content based on activeTab */}
            <div className="p-4">
              {activeTab === "Projects" && (
                <div className="grid gap-3 md:grid-cols-2">
                  {projects.slice(0, 2).map((project) => {
                    return (
                      <div
                        key={project.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between pb-3">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="flex items-center gap-2"
                          >
                            <Image
                              className="h-8 w-8 rounded-full object-cover"
                              src={project.avatar}
                              width={150}
                              height={150}
                              alt={project.name}
                            />
                            <div>
                              <h4 className="text-xs font-semibold transition-colors hover:text-secondary">
                                {project.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                8 tasks{" "}
                                <span className="text-secondary">•</span> 15
                                Completed
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="mt-3">
                            <p className="mb-1 text-sm font-medium text-gray-500">
                              Deadline
                            </p>
                            <p className="text-xs">31 July 2025</p>
                          </div>
                          <div className="mt-3">
                            <p className="mb-1 text-sm font-medium text-gray-500">
                              Project Lead
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Image
                                className="h-6 w-6 rounded-full object-cover"
                                src={project.teamLeader.avatar}
                                width={150}
                                height={150}
                                alt={project.teamLeader.name}
                              />
                              <p className="text-xs">
                                {project.teamLeader.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {activeTab === "Assets" && (
                <div className="overflow-x-auto">
                  <div className="grid min-w-[500px] gap-2">
                    {dummyAssets.map((asset) => {
                      return (
                        <div
                          className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
                          key={asset.id}
                        >
                          <Link
                            href={`/admin/projects/${asset.id}`}
                            className="flex max-w-[250px] items-center gap-2"
                          >
                            <Image
                              className="h-8 w-8 rounded-full object-cover"
                              src={asset.image}
                              width={150}
                              height={150}
                              alt={asset.title}
                            />
                            <div>
                              <h2 className="text-sm font-semibold">
                                {asset.title}-{asset.assetCode}
                              </h2>
                              <p className="text-xs text-gray-500">
                                <span className="mr-1 text-xs text-secondary">
                                  {asset.id}
                                </span>
                                Assigned on {asset.assigndDate}
                              </p>
                            </div>
                          </Link>
                          <div>
                            <h4 className="mb-2 text-xs">Assigned by</h4>
                            <Link
                              href={`/admin/contacts/${asset.assignedBy.id}`}
                              className="flex items-center gap-2"
                            >
                              <Image
                                className="h-6 w-6 rounded-full object-cover"
                                src={asset.assignedBy.avatar}
                                width={150}
                                height={150}
                                alt={asset.assignedBy.name}
                              />
                              <p className="text-xs text-gray-600">
                                {asset.assignedBy.name}
                              </p>
                            </Link>
                          </div>
                          <OptionsDropdown
                            actions={[
                              {
                                label: "View Info",
                                icon: <Eye size={16} />,
                                onClick: () => alert("View Info item..."),
                              },
                              {
                                label: "Raise Issue",
                                icon: <Bug size={16} />,
                                danger: true,
                                onClick: () => confirm("Raise Issue"),
                              },
                            ]}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddEmployee
        title="Edit Employee"
        initialValues={dummyEmployeeInitialValues}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        variant="modal"
      />
      <EditPersonalInfo
        isOpen={isOpenEditPersonal}
        setIsOpen={setIsOpenEditPersonal}
        variant="modal"
      />
      <EditEmergencyContact
        isOpen={isOpenEditEmergency}
        setIsOpen={setIsOpenEditEmergency}
        variant="modal"
      />
      <EditBank
        title="Bank Details"
        isOpen={isOpenEditBank}
        setIsOpen={setIsOpenEditBank}
        variant="modal"
      />
      <EditFamily
        title="Family Information"
        isOpen={isOpenEditFamily}
        setIsOpen={setIsOpenEditFamily}
        variant="modal"
      />
      <EditEducation
        title="Education Information"
        isOpen={isOpenEditEducation}
        setIsOpen={setIsOpenEditEducation}
        variant="modal"
      />
      <EditExperience
        title="Experience Information"
        isOpen={isOpenEditExperience}
        setIsOpen={setIsOpenEditExperience}
        variant="modal"
      />
      <AddBank
        title="Bank & Statutory"
        isOpen={isOpenAddBank}
        setIsOpen={setIsOpenAddBank}
        variant="modal"
      />
    </div>
  );
};

export default EmployeeDetail;
