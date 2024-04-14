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
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
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
        title: "Academic",
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
