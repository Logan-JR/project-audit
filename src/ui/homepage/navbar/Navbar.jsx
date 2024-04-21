import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/homepage/navbar/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={""}>About</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
      <Image src="/uatf.png" alt="" width={100} height={120} />
      <ul className={styles.list}>
        <li>
          <Link href="/cpa">Admin</Link>
        </li>
        <li>
          <Link href="/academic">Academic</Link>
        </li>
        <li>
          <Link href="/courses">Courses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
