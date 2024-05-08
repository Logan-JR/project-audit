"use client";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import styles from "@/ui/dashboard/sidebar/sidebar.module.css";
import { signOut, useSession } from "next-auth/react";

const Sidebar = ({ menuItems }) => {
  const { data: session, status } = useSession();
  let image = "/noavatar.png";
  if (status !== "loading") image = session?.user.img;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={image}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}> {session?.user.username} </span>
          <span className={styles.userTitle}> {session?.user.role} </span>
          <button onClick={signOut} className={styles.logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
