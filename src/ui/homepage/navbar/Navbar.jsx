import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/homepage/navbar/navbar.module.css";
import Sesion from '../sesion/sesion'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navSection}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href={""}>Biblioteca Virtual</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={""}>Campus Universitario</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={""}>Acerca de Nosotros</Link>
          </li>
        </ul>
      </div>
      <div className={styles.logoContainer}>
        <Image
          src="/audit-05.png"
          alt=""
          className={styles.logo}
          width={120}
          height={140}
        />
      </div>
      <div className={styles.navSection}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href={"/"}>Inicio</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={""}>About</Link>
          </li>
          <li className={styles.navItem}>
            <Link href={""}>Contacto</Link>
          </li>
          <li className={styles.navItem}>
            <Sesion />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
