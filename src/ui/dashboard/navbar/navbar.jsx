"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="search"
            placeholder="Search..."
            className={styles.input}
            disabled
          />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <Link href={"/"}>
            <MdPublic size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
