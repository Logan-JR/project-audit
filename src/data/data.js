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
  MdLogout,
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
        title: "Users",
        path: "/cpa/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "",
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
  {
    title: "Cerrar Sesion",
    list: [
      {
        title: "Logout",
        path: "/",
        icon: <MdLogout />,
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
        title: "Students",
        path: "/academic/students",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "",
        icon: <MdShoppingBag />,
      },
      {
        title: "Reports",
        path: "",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Cerrar Sesión",
    list: [
      {
        title: "Logout",
        path: "/",
        icon: <MdLogout />,
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
        title: "Courses",
        path: "/courses/course",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "",
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
  {
    title: "Cerrar Sesion",
    list: [
      {
        title: "Logout",
        path: "/",
        icon: <MdLogout />,
      },
    ],
  },
];