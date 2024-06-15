import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/homepage/navbar/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li>
          <Link href={""}>Home</Link>
        </li>
        <li>
          <Link href={""}>About</Link>
        </li>
        <li>
          <Link href="">Login</Link>
        </li>
      </ul>
      <Image src="/audit-05.png" alt="" width={110} height={130} unoptimized={true} quality={100} />
      <ul className={styles.list}>
        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="/login">Iniciar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
