import { Deal } from "@/types/data";

// Initialize deals data
export const initialDeals: Deal[] = [
  {
    id: "1",
    name: "Howell, Tremblay and Rath",
    contact: {
      name: "Dartee Robertson",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "darteeo@example.com",
    phone: "+1 12445-47878",
    location: "Newyork, United States",
    amount: "$03,50,000",
    stage: "qualify",
    property: 45,
    expecteDate: "12 Jan 2024",
    tags: ["Collab", "VIP"],
    status: "open",
  },
  {
    id: "2",
    name: "Byron, Roman and Bailey",
    contact: {
      name: "Jessica Louise",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "jessica13@example.com",
    phone: "+1 89351-90346",
    location: "Chester, United States",
    amount: "$02,45,000",
    stage: "contact",
    property: 45,
    expecteDate: "12 Jan 2024",
    tags: ["VIP"],
    status: "open",
  },
  {
    id: "3",
    name: "Jody, Powell and Cecil",
    contact: {
      name: "Rachel Hampton",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "rachel@example.com",
    phone: "+1 17839-93617",
    location: "Baltimore, United States",
    amount: "$01,84,043",
    stage: "presentation",
    property: 45,
    expecteDate: "12 Jan 2024",
    tags: ["Collab", "VIP"],
    status: "open",
  },
  {
    id: "4",
    name: "Freda, Jennifer and Thompson",
    contact: {
      name: "Sidney Franks",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "sidney@example.com",
    phone: "+1 11739-38135",
    location: "London, United States",
    amount: "$04,17,593",
    stage: "proposal",
    property: 80,
    expecteDate: "12 Jan 2024",
    tags: ["VIP"],
    status: "open",
  },
  {
    id: "5",
    name: "Robert, John and Carlos",
    contact: {
      name: "Sharon Roy",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "sheron@example.com",
    phone: "+1 12445-47878",
    location: "Exeter, United States",
    amount: "$02,10,000",
    stage: "proposal",
    property: 15,
    expecteDate: "12 Jan 2024",
    tags: ["VIP"],
    status: "open",
  },
  {
    id: "6",
    name: "Robert, John and Carlos",
    contact: {
      name: "Carol Thomas",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "carottho3@example.com",
    phone: "+1 78982-09163",
    location: "Charlotte, United States",
    amount: "$01,17,000",
    stage: "proposal",
    property: 30,
    expecteDate: "12 Jan 2024",
    tags: ["Collab", "VIP"],
    status: "open",
  },
  {
    id: "7",
    name: "Bonnie, Linda and Mullin",
    contact: {
      name: "Jonelle Curtiss",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "jonelle@example.com",
    phone: "+1 16739-47193",
    location: "Coventry, United States",
    amount: "$09,35,189",
    stage: "proposal",
    property: 45,
    expecteDate: "12 Jan 2024",
    tags: ["VIP"],
    status: "last",
  },
  {
    id: "8",
    name: "Bruce, Faulkner and Leia",
    contact: {
      name: "Brook Carter",
      avatar:
        "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
    },
    email: "brook@example.com",
    phone: "+1 19302-91043",
    location: "Detroit, United States",
    amount: "$08,81,389",
    stage: "proposal",
    property: 90,
    expecteDate: "12 Jan 2024",
    tags: ["Collab"],
    status: "won",
  },
];

export const stageGroups = [
  {
    id: "qualify",
    title: "Quality To Buy",
    count: "45 Leads",
    total: "$15,44,540",
  },
  {
    id: "contact",
    title: "Contact Made",
    count: "30 Leads",
    total: "$19,94,938",
  },
  {
    id: "presentation",
    title: "Presentation",
    count: "25 Leads",
    total: "$10,36,390",
  },
  {
    id: "proposal",
    title: "Proposal Made",
    count: "50 Leads",
    total: "$18,83,013",
  },
];
