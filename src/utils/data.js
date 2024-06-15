import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdAnalytics,
  MdOutlineSettings,
  MdHelpCenter,
  MdLibraryBooks,
  MdStorage,
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
        title: "Publicaciones",
        path: "/cpa/post",
        icon: <MdLibraryBooks />,
      },
      {
        title: "Reportes",
        path: "/cpa/logs",
        icon: <MdAnalytics />,
      },
      {
        title: "Backup",
        path: "/cpa/backup",
        icon: <MdStorage />,
      },
    ],
  },
  {
    title: "More",
    list: [
      {
        title: "Settings",
        path: "",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "",
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
