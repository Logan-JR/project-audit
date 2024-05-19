import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";

export const menuAdmin = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/cpa",
        icon: <MdDashboard />,
      },
      {
        title: "Usuarios",
        path: "/cpa/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Estadisticas",
        path: "",
        icon: <MdShoppingBag />,
      },
      {
        title: "Backup",
        path: "",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

export const menuAcademic = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/academic",
        icon: <MdDashboard />,
      },
      {
        title: "Kardex",
        path: "/academic/students",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Reports",
        path: "",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

export const menuCourses = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/courses",
        icon: <MdDashboard />,
      },
      {
        title: "Cursos",
        path: "/courses/curso",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Inscripciones",
        path: "/courses/inscription",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
