import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaMap,
  FaMailBulk,
  FaPhoneSquareAlt,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import styles from "@/ui/homepage/footer/footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image
            src="/audit-05.png"
            alt=""
            className={styles.logo}
            width={70}
            height={80}
            unoptimized
          />
          <p className={styles.universityName}>Universidad Autónoma Tomás Frías</p>
          <p className={styles.universityName}>Auditoría-Contaduría Pública</p>
        </div>
        <div className={styles.contactsSection}>
          <p className={styles.contactTitle}>Contactos</p>
          <div className={styles.contactIcon}>
            <FaMap />
            <p>Av. El Maestro s/n Edificio Central UATF</p>
          </div>
          <div className={styles.contactIcon}>
            <FaMailBulk />
            <p>uatf.auditoria.contaduriapublica@gmail.com</p>
          </div>
          <div className={styles.contactIcon}>
            <FaPhoneSquareAlt /> 2 6223653
          </div>
          <div className={styles.contactIcon}>
            <TbWorld />
            <Link href={"https://www.uatf.edu.bo"} target="_blank">
              www.uatf.edu.bo
            </Link>
          </div>
        </div>
        <div className={styles.socialSection}>
          <p className={styles.contactTitle}>Siguenos</p>
          <div className={styles.socialIcons}>
            <Link
              href="https://facebook.com"
              target="_blank"
              className={styles.socialIcon}
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              className={styles.socialIcon}
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className={styles.socialIcon}
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.whatsapp.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          UATF Auditoría-Contaduría Pública - © Copyright 2024 All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
